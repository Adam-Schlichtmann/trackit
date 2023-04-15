import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  Button,
  Divider,
  FlatList,
  Input,
  Box,
  useToast,
  KeyboardAvoidingView,
} from "native-base";
import { AllStackParams } from "../../AppNavigation.types";
import { EDIT_DEFINITION } from "../../AppNavigationConstants";
import { useEffect, useState } from "react";
import { Database, Definition, Field } from "../../statics";
import { randomUUID } from "expo-crypto";
import { FieldEdit } from "./components";
import { Platform } from "react-native";

const EditDefinition = () => {
  const navigation = useNavigation();
  const {
    params: { id },
  } = useRoute<RouteProp<AllStackParams, typeof EDIT_DEFINITION>>();

  const [definition, setDefinition] = useState<Definition>({
    name: "",
    id: randomUUID(),
    fields: [],
  });
  const toast = useToast();

  const onUpdateField =
    (fieldID: string) => (updateFN: (prev: Field) => Partial<Field>) =>
      setDefinition((prev) => {
        const index = prev.fields.findIndex((f) => f.id === fieldID);
        return {
          ...prev,
          fields: [
            ...prev.fields.slice(0, index),
            { ...prev.fields[index], ...updateFN(prev.fields[index]) },
            ...prev.fields.slice(index + 1),
          ],
        };
      });

  const addField = () =>
    setDefinition((prev) => ({
      ...prev,
      fields: [
        ...prev.fields,
        {
          id: randomUUID(),
          defID: prev.id,
          name: "",
          type: "",
          defaultValue: "",
          additionalOptions: "",
        },
      ],
    }));

  const onRemoveField = (fieldID: string) => () =>
    setDefinition((prev) => {
      const index = prev.fields.findIndex((f) => f.id === fieldID);
      return {
        ...prev,
        fields: [
          ...prev.fields.slice(0, index),
          ...prev.fields.slice(index + 1),
        ],
      };
    });

  const onCopyField = (fieldID: string) => () =>
    setDefinition((prev) => {
      const index = prev.fields.findIndex((f) => f.id === fieldID);
      return {
        ...prev,
        fields: [
          ...prev.fields.slice(0, index + 1),
          {
            ...prev.fields[index],
            id: randomUUID(),
          },
          ...prev.fields.slice(index + 1),
        ],
      };
    });

  const save = () => {
    Database.insertDefinition(definition)
      .then(() => {
        const proms = definition.fields.map((f) => Database.insertField(f));
        Promise.all(proms)
          .then(() => navigation.goBack())
          .catch(console.log);
      })
      .catch(console.log);
  };

  const validateDefinition = () => {
    if (!definition.name) {
      toast.show({
        description: "Name is required",
        colorScheme: "error",
        avoidKeyboard: true,
      });
    } else if (!definition.fields.length) {
      toast.show({ description: "Definitions require fields" });
    } else if (definition.fields.some((f) => !f.name)) {
      toast.show({ description: "All Fields require a name" });
    } else if (definition.fields.some((f) => !f.type)) {
      toast.show({ description: "All Fields require a type" });
    } else {
      save();
    }
  };

  useEffect(() => {
    if (id) {
      Database.selectDefinitions(id).then((def) => {
        if (def.length === 1) {
          setDefinition(def[0]);
        }
      });
    }
  }, []);

  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Box margin={2} flex={1}>
        <Input
          maxLength={20}
          value={definition.name}
          placeholder='Name'
          onChangeText={(t) => setDefinition((prev) => ({ ...prev, name: t }))}
        />
        <FlatList
          data={definition.fields}
          renderItem={({ item }) => (
            <FieldEdit
              field={item}
              onUpdateField={onUpdateField(item.id)}
              onRemoveField={onRemoveField(item.id)}
              onCopyField={onCopyField(item.id)}
            />
          )}
          ItemSeparatorComponent={Divider}
          keyExtractor={(item) => item.id}
        />
        <Button marginBottom={2} onPress={addField}>
          Add Field
        </Button>
        <Button colorScheme={"success"} onPress={validateDefinition}>
          SAVE
        </Button>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default EditDefinition;
