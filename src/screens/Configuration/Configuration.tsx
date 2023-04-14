import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Database, Definition } from "../../statics";
import { useFocusEffect } from "@react-navigation/native";

const style = StyleSheet.create({ page: { flex: 1 } });

const Configuration = () => {
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
      />
    </View>
  );
};

export default Configuration;
