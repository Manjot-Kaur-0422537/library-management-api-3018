import { db } from '../config/firebaseConfig';

const booksCollection = db.collection("books");

export const findAll = async () => {
  const snapshot = await booksCollection.get();
  return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
};

export const findById = async (id: string) => {
  const doc = await booksCollection.doc(id).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
};

export const create = async (data: any) => {
  const docRef = await booksCollection.add(data);
  const newDoc = await docRef.get();
  return { id: newDoc.id, ...newDoc.data() };
};

export const update = async (id: string, data: any) => {
  await booksCollection.doc(id).update(data);
  const updatedDoc = await booksCollection.doc(id).get();
  return { id: updatedDoc.id, ...updatedDoc.data() };
};

export const remove = async (id: string) => {
  const doc = await booksCollection.doc(id).get();
  if (!doc.exists) return null;

  await booksCollection.doc(id).delete();
  return { id: doc.id, ...doc.data() };
};
