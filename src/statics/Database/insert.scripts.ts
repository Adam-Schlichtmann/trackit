import { Definition, Field } from "./Database.types";

export const DEFINITIONS_INSERT = (definition: Definition) =>
  `INSERT INTO definitions (name, id) VALUES (${definition.name}, ${definition.id}) `;

export const FIELD_INSERT = (field: Field) =>
  `INSERT INTO fields (id, defID, name, type, defaultValue, additionalOptions) VALUES (${
    field.id
  }, ${field.defID}, ${field.name}, ${field.type}, ${
    field.defaultValue ?? ""
  }, ${field.additionalOptions ?? ""})`;
