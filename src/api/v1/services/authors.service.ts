import * as AuthorsRepo from "../repositories/authors.repository";

export const getAll = () => AuthorsRepo.findAll();

export const getById = (id: string) => AuthorsRepo.findById(id);

export const create = (data: any) => AuthorsRepo.create(data);

export const update = (id: string, data: any) =>
  AuthorsRepo.update(id, data);

export const remove = (id: string) => AuthorsRepo.remove(id);
