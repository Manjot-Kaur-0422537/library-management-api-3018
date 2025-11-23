import * as BooksRepo from '../repositories/books.repository';
import * as AuthorsRepo from '../repositories/authors.repository';

export const getAll = async () => {
  return BooksRepo.findAll();
};

export const getById = async (id: string) => {
  return BooksRepo.findById(id);
};

export const create = async (data: any) => {
  // Optionally verify author existence
  if (data.authorId) {
    const author = await AuthorsRepo.findById(data.authorId);
    if (!author) throw Object.assign(new Error('Author not found'), { status: 400 });
  }
  return BooksRepo.create(data);
};

export const update = async (id: string, data: any) => {
  // Optionally verify author
  if (data.authorId) {
    const author = await AuthorsRepo.findById(data.authorId);
    if (!author) throw Object.assign(new Error('Author not found'), { status: 400 });
  }
  return BooksRepo.update(id, data);
};

export const remove = async (id: string) => {
  return BooksRepo.remove(id);
};
