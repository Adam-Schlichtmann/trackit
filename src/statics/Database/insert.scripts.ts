import { Definition, Field } from "./Database.types";

export const DEFINITIONS_INSERT = (definition: Definition) =>
  `INSERT INTO definitions (name, id) VALUES (?, ?) `;

export const FIELD_INSERT = (field: Field) =>
  `INSERT INTO fields (id, defID, name, type, defaultValue, additionalOptions) VALUES (?, ?, ?, ?, ?, ?)`;
