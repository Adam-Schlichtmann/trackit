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
import { ConfirmationModal, Toast } from "../../components";

const EditDefinition = () => {
  const navigation = useNavigation();
  const {
    params: { id },
  } = useRoute<RouteProp<AllStackParams, typeof EDIT_DEFINITION>>();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [definition, setDefinition] = useState<Definition>({
    name: "",
    titleFields: [],
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
          defaultValue: "",
          isRequired: true,
          isUnique: false,
          label: "",
          name: "",
          sequence: 0,
          type: "",
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
      setIsDeleteOpen(false);
      Database.deleteFullDefinition(id)
        .then(() => {
          navigation.goBack();
        })
        .catch((err) => {
          toast.show({
            render: () => (
              <Toast
                title='Error'
                description={err.message}
                variant='left-accent'
                status='error'
              />
            ),
          });
        });
    }
  };

  const save = () => {
    if (id) {
      console.log(`TITLE FIELDS "${definition.titleFields}"`);
      Database.updateFullDefinition(definition)
        .then(() => {
          navigation.goBack();
          toast.show({ title: "Success", description: "Definition updated." });
        })
        .catch((err) => {
          toast.show({
            render: () => (
              <Toast
                title='Error'
                description={err.message}
                variant='left-accent'
                status='error'
              />
            ),
          });
        });
    } else {
      Database.insertFullDefinition(definition)
        .then(() => {
          navigation.goBack();
          toast.show({
            render: () => (
              <Toast
                title='Success'
                description='Definition created'
                variant='left-accent'
                status='success'
              />
            ),
          });
        })
        .catch((err) => {
          toast.show({
            render: () => (
              <Toast
                title='Error'
                description={err.message}
                variant='left-accent'
                status='error'
              />
            ),
          });
        });
    }
  };

  const validateDefinition = () => {
    if (!definition.name) {
      toast.show({
        render: () => (
          <Toast
            title='Error'
            description='Name is required'
            variant='left-accent'
            status='error'
          />
        ),
      });
    } else if (!definition.fields.length) {
      toast.show({
        render: () => (
          <Toast
            title='Error'
            description='Definitions require fields'
            variant='left-accent'
            status='error'
          />
        ),
      });
    } else if (definition.fields.some((f) => !f.name)) {
      toast.show({
        render: () => (
          <Toast
            title='Error'
            description='All Fields require a name'
            variant='left-accent'
            status='error'
          />
        ),
      });
    } else if (definition.fields.some((f) => !f.type)) {
      toast.show({
        render: () => (
          <Toast
            title='Error'
            description='All Fields require a type'
            variant='left-accent'
            status='error'
          />
        ),
      });
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
