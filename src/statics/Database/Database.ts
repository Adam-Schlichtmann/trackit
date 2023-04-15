import * as SQLite from "expo-sqlite";

import { Definition, Field } from "./Database.types";
import {
  DEFINITIONS_UPDATE,
  FIELD_UPDATE,
  DEFINITIONS_INSERT,
  FIELD_INSERT,
  TABLES,
  TABLES_CREATE_SCRIPTS,
  DEFINITIONS_SELECT_ALL,
  DEFINITIONS_SELECT_BY_ID,
  FIELDS_SELECT_ALL,
  FIELDS_SELECT_BY_DEF_ID,
  FIELDS_SELECT_BY_ID,
  DEFINITIONS_DELETE_BY_ID,
  FIELD_DELETE_BY_DEF_ID,
} from "./sql";

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

  static deleteFullDefinition = (id: string): Promise<void> =>
    new Promise<void>((resolve, reject) =>
      Database.db.transaction((tx) =>
        tx.executeSql(
          DEFINITIONS_DELETE_BY_ID(),
          [id],
          (innerTx) => {
            innerTx.executeSql(
              FIELD_DELETE_BY_DEF_ID(),
              [id],
              () => {
                resolve();
              },
              (_, err) => {
                reject(err);
                return false;
              }
            );
          },
          (_, err) => {
            reject(err);
            return false;
          }
        )
      )
    );

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

  static getFullDefinition = (id: string): Promise<Definition> =>
    new Promise<Definition>((resolve, reject) =>
      Database.db.transaction((tx) =>
        tx.executeSql(
          DEFINITIONS_SELECT_BY_ID(id),
          [],
          (innerTx, { rows }) => {
            if (rows.length === 1) {
              innerTx.executeSql(
                FIELDS_SELECT_BY_DEF_ID(id),
                [],
                (_, { rows: fieldRows }) => {
                  const fields: Field[] = [];

                  for (let i = 0; i < fieldRows.length; i++) {
                    fields.push(fieldRows.item(i) as Field);
                  }

                  resolve({ ...(rows.item(0) as Definition), fields });
                },
                (_, err) => {
                  reject(err);
                  return false;
                }
              );
            }
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
