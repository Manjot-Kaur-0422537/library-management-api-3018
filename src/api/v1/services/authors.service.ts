import * as AuthorsRepo from '../repositories/authors.repository';

export const getAll = async () => {
  return AuthorsRepo.findAll();
};

export const getById = async (id: string) => {
  return AuthorsRepo.findById(id);
};

export const create = async (data: any) => {
  return AuthorsRepo.create(data);
};

export const update = async (id: string, data: any) => {
  return AuthorsRepo.update(id, data);
};

export const remove = async (id: string) => {
  return AuthorsRepo.remove(id);
};
