import { useCallback, useState } from "react";
import { RefreshControl } from "react-native";
import { Box, FlatList } from "native-base";
import { Database, Definition } from "../../statics";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button } from "native-base";
import { DEFINITION_EDIT } from "../../AppNavigationConstants";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllStackParams } from "../../AppNavigation.types";
import { ConfigurationCard } from "./components";
import ConfigurationCardSkeleton from "./components/ConfigurationCardSkeleton/ConfigurationCardSkeleton";

const SKELETON_DATA = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
];

const Configuration = () => {
  const navigation = useNavigation<StackNavigationProp<AllStackParams>>();
  const [definitions, setDefinitions] = useState<Definition[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      Database.selectDefinitions().then((d) => {
        setDefinitions(d);
        setLoading(false);
      });
    }, 2000);
  }, []);

  useFocusEffect(refresh);

  if (loading) {
    return (
      <Box flex={1} margin={2}>
        <FlatList
          data={SKELETON_DATA}
          renderItem={() => <ConfigurationCardSkeleton />}
        />
        <Button onPress={() => navigation.navigate(DEFINITION_EDIT, {})}>
          NEW TABLE
        </Button>
      </Box>
    );
  }

  return (
    <Box flex={1} margin={2}>
      <FlatList
        data={definitions}
        renderItem={({ item }) => <ConfigurationCard definition={item} />}
        refreshControl={
          <RefreshControl onRefresh={refresh} refreshing={loading} />
        }
      />
      <Button onPress={() => navigation.navigate(DEFINITION_EDIT, {})}>
        NEW TABLE
      </Button>
    </Box>
  );
};

export default Configuration;
