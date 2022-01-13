import { ObjectId } from "mongodb";
import { getDatabase } from "./mongo.js";

const collectionName = "ads";

export const insertAd = async (ad) => {
  const database = await getDatabase();
  const { insertedId } = await database
    .collection(collectionName)
    .insertOne(ad);

  return insertAd;
};

export const getAds = async () => {
  const database = await getDatabase();

  return await database.collection(collectionName).find({}).toArray();
};

export const deleteAd = async (id) => {
  const database = await getDatabase();
  await database.collection(collectionName).deleteOne({
    _id: new ObjectId(id),
  });
};

export const updateAd = async (id, ad) => {
  const database = await getDatabase();
  delete ad._id;
  await database.collection(collectionName).update(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...ad,
      },
    }
  );
};
