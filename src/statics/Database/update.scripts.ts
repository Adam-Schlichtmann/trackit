import { Definition, Field } from "./Database.types";

export const DEFINITIONS_UPDATE = (definition: Definition) =>
  `UPDATE definitions SET name = ${definition.name} WHERE id = ${definition.id}`;

export const FIELD_UPDATE = (field: Field) =>
  `UPDATE field SET name = ${field.name}, type = ${field.type}, defaultValue = ${field.defaultValue}, additionalOptions = ${field.additionalOptions}, defID = ${field.defID}, WHERE id = ${field.id}`;
