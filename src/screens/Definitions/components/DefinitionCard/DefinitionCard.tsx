import { Heading, HStack, ChevronRightIcon } from "native-base";
import { Definition } from "../../../../statics";
import { TouchableOpacity } from "react-native";

type Props = {
  definition: Definition;
};

const DefinitionCard = ({ definition }: Props) => {
  const viewDefinition = () => {};

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
