import * as SQLite from "expo-sqlite";
import { TABLES, TABLES_CREATE_SCRIPTS } from "./tables.scripts";
import { Definition, Field } from "./Database.types";
import { DEFINITIONS_INSERT, FIELD_INSERT } from "./insert.scripts";
import { DEFINITIONS_UPDATE, FIELD_UPDATE } from "./update.scripts";
import {
  DEFINITIONS_SELECT_ALL,
  DEFINITIONS_SELECT_BY_ID,
  FIELDS_SELECT_ALL,
  FIELDS_SELECT_BY_ID,
} from "./select.scripts";

class Database {
  static db: SQLite.WebSQLDatabase;

  static init = () => {
    Database.db = SQLite.openDatabase(
      "trackit.db",
      undefined,
      undefined,
      undefined,
      () => {
        // Database.reset()
        //   .then(() => {
        Database.createTables()
          .then(() => {})
          .catch(console.log);
        // })
        // .catch(console.log);
      }
    );
  };

  static createTable = (createScript: string) =>
    new Promise<void>((res, rej) => {
      Database.db.transaction((tx) => {
        tx.executeSql(
          createScript,
          [],
          () => {
            res();
          },
          (_, err) => {
            rej(err);
            return true;
          }
        );
      });
    });

  static createTables = () =>
    Promise.all(
      TABLES_CREATE_SCRIPTS.map((createScript) =>
        Database.createTable(createScript)
      )
    );

  static reset = () =>
    Promise.all([...TABLES.map((tableName) => Database.dropTable(tableName))]);

  static dropTable = (tableName: string) =>
    new Promise<void>((resolve, reject) =>
      Database.db.transaction((tx) =>
        tx.executeSql(
          `DROP TABLE IF EXISTS ${tableName}`,
          [],
          () => resolve(),
          (_, err) => {
            reject(err);
            return false;
          }
        )
      )
    );

  static clearTable = (tx: SQLite.SQLTransaction, tableName: string) =>
    new Promise<void>((resolve, reject) => {
      tx.executeSql(
        `DELETE FROM ${tableName}`,
        [],
        () => resolve(),
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });

  static insertField = (field: Field) =>
    new Promise<void>((resolve, reject) =>
      Database.db.transaction((tx) =>
        tx.executeSql(
          FIELD_INSERT(field),
          [
            field.id,
            field.defID,
            field.name,
            field.type,
            field.defaultValue ?? "",
            field.additionalOptions ?? "",
          ],
          () => resolve(),
          (_, err) => {
            reject(err);
            return false;
          }
        )
      )
    );

  static insertDefinition = (definition: Definition) =>
    new Promise<void>((resolve, reject) =>
      Database.db.transaction((tx) =>
        tx.executeSql(
          DEFINITIONS_INSERT(definition),
          [definition.name, definition.id],
          () => resolve(),
          (_, err) => {
            reject(err);
            return false;
          }
        )
      )
    );

  static updateDefinition = (definition: Definition) =>
    new Promise<void>((resolve, reject) =>
      Database.db.transaction((tx) =>
        tx.executeSql(
          DEFINITIONS_UPDATE(definition),
          [],
          () => resolve(),
          (_, err) => {
            reject(err);
            return false;
          }
        )
      )
    );

  static updateField = (field: Field) =>
    new Promise<void>((resolve, reject) =>
      Database.db.transaction((tx) =>
        tx.executeSql(
          FIELD_UPDATE(field),
          [],
          () => resolve(),
          (_, err) => {
            reject(err);
            return false;
          }
        )
      )
    );

  static selectDefinitions = (id?: string): Promise<Definition[]> =>
    new Promise<Definition[]>((resolve, reject) =>
      Database.db.transaction((tx) =>
        tx.executeSql(
          id ? DEFINITIONS_SELECT_BY_ID(id) : DEFINITIONS_SELECT_ALL(),
          [],
          (_, { rows }) => {
            const definitions: Definition[] = [];

            for (let i = 0; i < rows.length; i++) {
              definitions.push(rows.item(i) as Definition);
            }

            resolve(definitions);
          },
          (_, err) => {
            reject(err);
            return false;
          }
        )
      )
    );

  static selectFields = (id?: string): Promise<Field[]> =>
    new Promise<Field[]>((resolve, reject) =>
      Database.db.transaction((tx) =>
        tx.executeSql(
          id ? FIELDS_SELECT_BY_ID(id) : FIELDS_SELECT_ALL(),
          [],
          (_, { rows }) => {
            const fields: Field[] = [];

            for (let i = 0; i < rows.length; i++) {
              fields.push(rows.item(i) as Field);
            }

            resolve(fields);
          },
          (_, err) => {
            reject(err);
            return false;
          }
        )
      )
    );
}

export default Database;
