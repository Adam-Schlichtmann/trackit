import { Definition, Field } from "../Database.types";

export const DEFINITIONS_UPDATE = (definition: Definition) => {
  console.log(definition);
  return `UPDATE definitions SET name = '${
    definition.name
  }', titleFields = '${definition.titleFields.join("")}' WHERE id = '${
    definition.id
  }'`;
};

export const FIELD_UPDATE = (field: Field) =>
  `UPDATE fields SET name = '${field.name}', type = '${
    field.type
  }', defaultValue = '${field.defaultValue}', isRequired = '${
    field.isRequired ? 1 : 0
  }', isUnique = '${field.isUnique ? 1 : 0}', defID = '${
    field.defID
  }', sequence = ${field.sequence}, label = '${field.label}' WHERE id = '${
    field.id
  }'`;
