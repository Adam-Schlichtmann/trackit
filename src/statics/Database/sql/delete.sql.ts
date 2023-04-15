export const DEFINITIONS_DELETE_BY_ID = () =>
  "DELETE FROM definitions WHERE id = ?";

export const FIELD_DELETE_BY_ID = () => "DELETE FROM fields WHERE id = ?";
export const FIELD_DELETE_BY_DEF_ID = () =>
  "DELETE FROM fields WHERE defID = ?";
