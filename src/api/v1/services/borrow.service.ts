import * as BorrowRepo from '../repositories/borrow.repository';
import * as BooksRepo from '../repositories/books.repository';

export const borrow = async (data: any) => {
  // Check if book exists and has copies
  const book = await BooksRepo.findById(data.bookId);
  if (!book) throw Object.assign(new Error('Book not found'), { status: 400 });
  if ((book.copies || 0) < 1) throw Object.assign(new Error('No copies available'), { status: 400 });

  // decrement copies atomically (simple implementation)
  await BooksRepo.update(data.bookId, { copies: (book.copies || 1) - 1 });

  const record = await BorrowRepo.create({
    bookId: data.bookId,
    userId: data.userId,
    borrowDate: data.borrowDate || new Date().toISOString(),
    dueDate: data.dueDate || null,
    returned: false,
  });
  return record;
};

export const returnBorrow = async (id: string) => {
  const rec = await BorrowRepo.findById(id);
  if (!rec) return null;
  if (rec.returned) return rec; // already returned

  // increment book copies
  const book = await BooksRepo.findById(rec.bookId);
  await BooksRepo.update(rec.bookId, { copies: (book.copies || 0) + 1 });

  const updated = await BorrowRepo.update(id, { returned: true, returnDate: new Date().toISOString() });
  return updated;
};
