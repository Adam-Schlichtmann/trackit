import { Center, HStack, Skeleton, ChevronRightIcon } from "native-base";

const ConfigurationCardSkeleton = () => {
  return (
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
      <Skeleton.Text lines={1} w='50%' />
      <ChevronRightIcon />
    </HStack>
  );
};

export default ConfigurationCardSkeleton;
