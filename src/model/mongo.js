import { MongoMemoryServer } from "mongodb-memory-server/index.js";
import { MongoClient } from "mongodb";

let database = null;

export const startDatabase = async () => {
  const mongo = new MongoMemoryServer({ debug: true });
  await mongo.start();
  const mongoDBURL = await mongo.getUri();
  const connection = await MongoClient.connect(mongoDBURL, {
    UseNewUrlParser: true,
  });

  database = connection.db();
};

export const getDatabase = async () => {
  if (!database) await startDatabase();

  return database;
};
