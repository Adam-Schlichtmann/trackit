import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  Button,
  Divider,
  FlatList,
  Input,
  Box,
  useToast,
  KeyboardAvoidingView,
  HStack,
} from "native-base";
import { AllStackParams } from "../../AppNavigation.types";
import { EDIT_DEFINITION } from "../../AppNavigationConstants";
import { useEffect, useState } from "react";
import { Database, Definition, Field } from "../../statics";
import { randomUUID } from "expo-crypto";
import { FieldEdit } from "./components";
import { Platform } from "react-native";
import { ConfirmationModal } from "../../components";

const EditDefinition = () => {
  const navigation = useNavigation();
  const {
    params: { id },
  } = useRoute<RouteProp<AllStackParams, typeof EDIT_DEFINITION>>();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
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
      Database.deleteField(prev.fields[index].id).catch(console.log);
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

  const deleteDefinition = () => {
    if (id) {
      Database.deleteFullDefinition(id).then(() => {
        navigation.goBack();
      });
    }
  };

  const save = () => {
    if (id) {
      Database.updateDefinition(definition)
        .then(() => {
          const proms = definition.fields.map((f) => Database.updateField(f));
          Promise.all(proms)
            .then(() => navigation.goBack())
            .catch(console.log);
        })
        .catch(console.log);
    } else {
      Database.insertDefinition(definition)
        .then(() => {
          const proms = definition.fields.map((f) => Database.insertField(f));
          Promise.all(proms)
            .then(() => navigation.goBack())
            .catch(console.log);
        })
        .catch(console.log);
    }
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
      Database.getFullDefinition(id).then((def) => {
        setDefinition(def);
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
        <HStack>
          <Button
            flex={1}
            mr={id ? 2 : 0}
            colorScheme={"success"}
            onPress={validateDefinition}
          >
            SAVE
          </Button>
          {id && (
            <Button
              flex={1}
              ml={2}
              colorScheme={"danger"}
              onPress={() => setIsDeleteOpen(true)}
            >
              DELETE
            </Button>
          )}
        </HStack>
      </Box>
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        message='Are you sure you want to delete this definition. This action is NOT reversible.'
        buttons={[
          {
            title: "Cancel",
            onPress: () => setIsDeleteOpen(false),
            variant: "unstyled",
          },
          {
            title: "Delete",
            onPress: deleteDefinition,
            colorScheme: "danger",
          },
        ]}
      />
    </KeyboardAvoidingView>
  );
};

export default EditDefinition;
