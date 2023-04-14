import { RouteProp, useRoute } from "@react-navigation/native";
import { Button, FlatList, Input, ScrollView } from "native-base";
import { Text, View } from "react-native";
import { AllStackParams } from "../../AppNavigation.types";
import { DEFINITION_EDIT } from "../../AppNavigationConstants";
import { useEffect, useState } from "react";
import { Database, Definition, Field } from "../../statics";
import { randomUUID } from "expo-crypto";
import { FieldEdit } from "./components";

const DefinitionEdit = () => {
  const {
    params: { id },
  } = useRoute<RouteProp<AllStackParams, typeof DEFINITION_EDIT>>();

  const [definition, setDefinition] = useState<Definition>({
    name: "",
    id: randomUUID(),
    fields: [],
  });

  const onUpdateField =
    (fieldID: string) => (updateFN: (prev: Field) => Partial<Field>) =>
      setDefinition((prev) => {
        const index = prev.fields.findIndex((f) => f.id === fieldID);
        console.log(prev.fields[index], updateFN(prev.fields[index]));
        console.log({ ...prev.fields[index], ...updateFN(prev.fields[index]) });
        console.log("=======");
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
    <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8 }}>
      <ScrollView>
        <Input
          value={definition.name}
          placeholder='Name'
          onChangeText={(t) => setDefinition((prev) => ({ ...prev, name: t }))}
        />
        <FlatList
          data={definition.fields}
          renderItem={({ item }) => (
            <FieldEdit field={item} onUpdateField={onUpdateField(item.id)} />
          )}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<Button onPress={addField}>Add Field</Button>}
        />
      </ScrollView>
    </View>
  );
};

export default DefinitionEdit;
