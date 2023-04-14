export type Field = {
  id: string;
  defID: string;
  name: string;
  type: "TEXT" | "INTEGER";
  defaultValue?: string;
  additionalOptions?: string;
};

export type Definition = {
  name: string;
  id: string;
  fields: Field[];
};
