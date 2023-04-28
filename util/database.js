import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('places.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL,
        )`,
        [],
        () => {
          resolve();
        },
        // The first argument is the transaction that failed, but we don't need it so we added the blank
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};
