import { HStack, Skeleton, ChevronRightIcon } from "native-base";

const DefinitionCardSkeleton = () => (
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
    <Skeleton.Text lines={1} w={`${40 + Math.random() * 30}%`} />
    <ChevronRightIcon />
  </HStack>
);

export default DefinitionCardSkeleton;
