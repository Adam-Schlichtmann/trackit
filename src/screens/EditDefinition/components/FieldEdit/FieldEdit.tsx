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
  Checkbox,
  Select,
  CheckIcon,
  Center,
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
      <Select
        placeholder='Field Type'
        marginBottom={4}
        selectedValue={field.type}
        onValueChange={(s) => onUpdateField(() => ({ type: s }))}
        _selectedItem={{
          endIcon: (
            <Center>
              <CheckIcon size={4} />
            </Center>
          ),
        }}
      >
        <Select.Item label='Text' value='Text' />
        <Select.Item label='Boolean' value='Boolean' />
        <Select.Item label='Integer' value='Integer' />
        <Select.Item label='Real' value='Real' />
        <Select.Item label='Datetime' value='Datetime' />
        <Select.Item label='Date' value='Date' />
        <Select.Item label='Time' value='Time' />
      </Select>
      <Input
        value={field.defaultValue}
        onChangeText={(t) => onUpdateField(() => ({ defaultValue: t }))}
        placeholder='Default Value'
        marginBottom={4}
      />
      <Input
        value={field.label}
        onChangeText={(t) => onUpdateField(() => ({ label: t }))}
        placeholder='Label'
        marginBottom={4}
      />
      <Input
        value={`${field.sequence}`}
        onChangeText={(t) =>
          onUpdateField(() => ({ sequence: t ? Number.parseInt(t) : 0 }))
        }
        keyboardType='number-pad'
        placeholder='Sequence'
        marginBottom={4}
      />
      <HStack flex={1} justifyContent={"space-evenly"}>
        <Checkbox
          value=''
          isChecked={field.isRequired}
          onChange={(t) => onUpdateField(() => ({ isRequired: t }))}
        >
          Required
        </Checkbox>
        <Checkbox
          value=''
          isChecked={field.isUnique}
          onChange={(t) => onUpdateField(() => ({ isUnique: t }))}
        >
          Unique
        </Checkbox>
      </HStack>
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
