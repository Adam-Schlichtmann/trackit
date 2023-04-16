export const DEFINITIONS_INSERT = () =>
  `INSERT INTO definitions (name, titleFields, id) VALUES (?, ?, ?) `;

export const FIELD_INSERT = () =>
  `INSERT INTO fields (id, defID, name, type, defaultValue, isRequired, isUnique, sequence, label) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
