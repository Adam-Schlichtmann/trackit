export type Field = {
  id: string;
  defID: string;
  name: string;
  type: string;
  defaultValue: string;
  isRequired: boolean;
  isUnique: boolean;
  sequence: number;
  label: string;
};

export type Definition = {
  name: string;
  id: string;
  /**
   * Should match a field name
   * EG: [name, location] would create `Name - Location`
   */
  titleFields: string[];
  fields: Field[];
};
