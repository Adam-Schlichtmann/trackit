import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Database, Definition } from "../../statics";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button } from "native-base";
import { DEFINITION_EDIT } from "../../AppNavigationConstants";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllStackParams } from "../../AppNavigation.types";

const style = StyleSheet.create({ page: { flex: 1 } });

const Configuration = () => {
  const navigation = useNavigation<StackNavigationProp<AllStackParams>>();
  const [definitions, setDefinitions] = useState<Definition[]>([]);

  useFocusEffect(
    useCallback(() => {
      Database.selectDefinitions().then((d) => {
        setDefinitions(d);
      });
    }, [])
  );

  return (
    <View style={style.page}>
      <FlatList
        data={definitions}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
        ListFooterComponent={
          <Button onPress={() => navigation.navigate(DEFINITION_EDIT, {})}>
            NEW TABLE
          </Button>
        }
      />
    </View>
  );
};

export default Configuration;
