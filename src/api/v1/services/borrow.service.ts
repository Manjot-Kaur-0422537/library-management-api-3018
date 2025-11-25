import { BorrowRepository, BorrowRecord } from "../repositories/borrow.repository";

export class BorrowService {
  private repo: BorrowRepository;

  constructor(repo: BorrowRepository) {
    this.repo = repo;
  }

  async borrowBook(data: { bookId: string; userId: string }): Promise<BorrowRecord> {
    return this.repo.borrowBook(data);
  }

  async returnBook(id: string): Promise<boolean> {
    return this.repo.returnBook(id);
  }

  async getAll(): Promise<BorrowRecord[]> {
    return this.repo.findAll();
  }

  async getById(id: string): Promise<BorrowRecord | null> {
    return this.repo.findById(id);
  }

  async update(id: string, data: Partial<{ bookId: string; userId: string }>): Promise<BorrowRecord | null> {
    return this.repo.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    return this.repo.remove(id);
  }
}
