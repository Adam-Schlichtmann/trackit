export const DEFINITIONS_TABLE = `CREATE TABLE IF NOT EXISTS definitions (
  id TEXT NOT NULL PRIMARY KEY,
  titleFields TEXT NOT NULL,
  name TEXT NOT NULL
)`;

export const FIELDS_TABLE = `CREATE TABLE IF NOT EXISTS fields (
  id TEXT NOT NULL PRIMARY KEY,
  defID TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  defaultValue TEXT,
  isRequired INTEGER NOT NULL,
  isUnique INTEGER NOT NULL,
  sequence INTEGER NOT NULL,
  label TEXT NOT NULL,
  FOREIGN KEY(defID) REFERENCES definition(id)
)`;

export const TABLES_CREATE_SCRIPTS = [DEFINITIONS_TABLE, FIELDS_TABLE];
export const TABLES = ["definitions", "fields"];
