export const DEFINITIONS_SELECT_ALL = () => `SELECT * FROM definitions`;
export const DEFINITIONS_SELECT_BY_ID = (id: string) =>
  `SELECT * FROM definitions WHERE id = '${id}'`;

export const FIELDS_SELECT_ALL = () => `SELECT * FROM fields`;
export const FIELDS_SELECT_BY_ID = (id: string) =>
  `SELECT * FROM fields WHERE id = '${id}'`;
export const FIELDS_SELECT_BY_DEF_ID = (defID: string) =>
  `SELECT * FROM fields WHERE defID = '${defID}'`;
