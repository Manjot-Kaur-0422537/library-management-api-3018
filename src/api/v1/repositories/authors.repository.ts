import { db } from '../config/firebaseConfig';

const COLLECTION = 'authors';

export const findAll = async () => {
  const snapshot = await db.collection(COLLECTION).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const findById = async (id: string) => {
  const doc = await db.collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
};

export const create = async (data: any) => {
  const ref = await db.collection(COLLECTION).add({ ...data, createdAt: new Date().toISOString() });
  const doc = await ref.get();
  return { id: doc.id, ...doc.data() };
};

export const update = async (id: string, data: any) => {
  const ref = db.collection(COLLECTION).doc(id);
  const doc = await ref.get();
  if (!doc.exists) return null;
  await ref.update({ ...data, updatedAt: new Date().toISOString() });
  const updated = await ref.get();
  return { id: updated.id, ...updated.data() };
};

export const remove = async (id: string) => {
  const ref = db.collection(COLLECTION).doc(id);
  const doc = await ref.get();
  if (!doc.exists) return false;
  await ref.delete();
  return true;
};
