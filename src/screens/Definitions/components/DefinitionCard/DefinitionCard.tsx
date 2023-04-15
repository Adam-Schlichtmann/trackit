import { Heading, HStack, ChevronRightIcon } from "native-base";
import { Definition } from "../../../../statics";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllStackParams } from "../../../../AppNavigation.types";
import { EDIT_DEFINITION } from "../../../../AppNavigationConstants";

type Props = {
  definition: Definition;
};

const DefinitionCard = ({ definition }: Props) => {
  const navigation = useNavigation<StackNavigationProp<AllStackParams>>();

  const viewDefinition = () => {
    navigation.navigate(EDIT_DEFINITION, { id: definition.id });
  };

  return (
    <TouchableOpacity onPress={viewDefinition}>
      <HStack
        flex={1}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={4}
        marginY={2}
        rounded='lg'
        _dark={{
          backgroundColor: "gray.700",
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Heading numberOfLines={1}>{definition.name}</Heading>
        <ChevronRightIcon />
      </HStack>
    </TouchableOpacity>
  );
};

export default DefinitionCard;
