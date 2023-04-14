export type Field = {
  id: string;
  defID: string;
  name: string;
  type: string;
  defaultValue?: string;
  additionalOptions?: string;
};

export type Definition = {
  name: string;
  id: string;
  fields: Field[];
};
