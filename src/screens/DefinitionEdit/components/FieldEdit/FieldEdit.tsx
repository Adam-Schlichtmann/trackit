import { View } from "react-native";
import { Field } from "../../../../statics";
import { Card, Input } from "native-base";

type Props = {
  onUpdateField: (updateFN: (field: Field) => Partial<Field>) => void;
  field: Field;
};

const FieldEdit = ({ onUpdateField, field }: Props) => {
  return (
    <Card>
      <Input
        value={field.name}
        onChangeText={(t) => onUpdateField(() => ({ name: t }))}
        placeholder='Name'
      />
      <Input
        value={field.type}
        onChangeText={(t) => onUpdateField(() => ({ type: t }))}
        placeholder='Type'
      />
      <Input
        value={field.defaultValue}
        onChangeText={(t) => onUpdateField(() => ({ defaultValue: t }))}
        placeholder='Default'
      />
      <Input
        value={field.additionalOptions}
        onChangeText={(t) => onUpdateField(() => ({ additionalOptions: t }))}
        placeholder='Additional Options'
      />
    </Card>
  );
};

export default FieldEdit;
