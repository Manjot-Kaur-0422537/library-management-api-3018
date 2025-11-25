import { db } from '../config/firebaseConfig';

const COLLECTION = 'borrowers'; 

export interface BorrowRecord {
  id: string;
  bookId: string;
  userId: string;
  createdAt?: string;
  returnedAt?: string;
}

export class BorrowRepository {
  async findAll(): Promise<BorrowRecord[]> {
    const snapshot = await db.collection(COLLECTION).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BorrowRecord));
  }

  async findById(id: string): Promise<BorrowRecord | null> {
    const doc = await db.collection(COLLECTION).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as BorrowRecord;
  }

  async borrowBook(data: { bookId: string; userId: string }): Promise<BorrowRecord> {
    const ref = await db.collection(COLLECTION).add({ ...data, createdAt: new Date().toISOString() });
    return { id: ref.id, ...data, createdAt: new Date().toISOString() };
  }

  async returnBook(id: string): Promise<boolean> {
    const ref = db.collection(COLLECTION).doc(id);
    const doc = await ref.get();
    if (!doc.exists) return false;

    await ref.update({ returnedAt: new Date().toISOString() });
    return true;
  }

  async update(id: string, data: Partial<{ bookId: string; userId: string }>): Promise<BorrowRecord | null> {
    const ref = db.collection(COLLECTION).doc(id);
    const doc = await ref.get();
    if (!doc.exists) return null;

    await ref.update({ ...data, updatedAt: new Date().toISOString() });
    const updated = await ref.get();
    return { id: updated.id, ...updated.data() } as BorrowRecord;
  }

  async remove(id: string): Promise<boolean> {
    const ref = db.collection(COLLECTION).doc(id);
    const doc = await ref.get();
    if (!doc.exists) return false;

    await ref.delete();
    return true;
  }
}
