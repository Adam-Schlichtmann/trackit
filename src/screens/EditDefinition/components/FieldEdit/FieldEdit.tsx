import { useState, useRef } from "react";
import { Field } from "../../../../statics";
import {
  AddIcon,
  Box,
  DeleteIcon,
  Heading,
  IconButton,
  HStack,
  Input,
} from "native-base";
import { ConfirmationModal } from "../../../../components";

type Props = {
  onUpdateField: (updateFN: (field: Field) => Partial<Field>) => void;
  field: Field;
  onRemoveField: () => void;
  onCopyField: () => void;
};

const FieldEdit = ({
  onUpdateField,
  field,
  onRemoveField,
  onCopyField,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      padding={4}
      marginY={4}
      rounded='lg'
      _dark={{
        backgroundColor: "gray.700",
      }}
      _light={{
        backgroundColor: "gray.50",
      }}
    >
      <HStack
        marginBottom={4}
        flexDirection={"row"}
        flex={1}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Heading numberOfLines={1}>{field.name || "FIELD"}</Heading>
        <Box flexDirection={"row"}>
          <IconButton onPress={onCopyField} icon={<AddIcon />} />
          <IconButton
            onPress={() => setIsOpen(true)}
            icon={<DeleteIcon />}
            colorScheme={"error"}
          />
        </Box>
      </HStack>
      <Input
        maxLength={20}
        value={field.name}
        onChangeText={(t) => onUpdateField(() => ({ name: t }))}
        placeholder='Name'
        marginBottom={4}
      />
      <Input
        value={field.type}
        onChangeText={(t) => onUpdateField(() => ({ type: t }))}
        placeholder='Type'
        marginBottom={4}
        maxLength={20}
      />
      <Input
        value={field.defaultValue}
        onChangeText={(t) => onUpdateField(() => ({ defaultValue: t }))}
        placeholder='Default Value'
        marginBottom={4}
      />
      <Input
        value={field.additionalOptions}
        onChangeText={(t) => onUpdateField(() => ({ additionalOptions: t }))}
        placeholder='Additional Options'
      />
      <ConfirmationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message='Are you sure you want to remove this field.'
        buttons={[
          {
            title: "Cancel",
            onPress: () => setIsOpen(false),
            variant: "unstyled",
          },
          {
            title: "Delete",
            onPress: onRemoveField,
            colorScheme: "danger",
          },
        ]}
      />
    </Box>
  );
};

export default FieldEdit;
