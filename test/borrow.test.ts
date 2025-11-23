import { BorrowService } from "../../src/api/v1/services/borrow.service";
import { BorrowRepository } from "../../src/api/v1/repositories/borrow.repository";

jest.mock("../../src/api/v1/repositories/borrow.repository");

describe("Borrow Service", () => {
  let borrowService: BorrowService;
  let borrowRepository: jest.Mocked<BorrowRepository>;

  beforeEach(() => {
    borrowRepository = new BorrowRepository() as jest.Mocked<BorrowRepository>;
    borrowService = new BorrowService(borrowRepository);
  });

  test("borrow a book", async () => {
    const borrowData = { bookId: "1", userId: "100" };
    borrowRepository.borrowBook.mockResolvedValue({ id: "10", ...borrowData });

    const result = await borrowService.borrow(borrowData);
    expect(result.bookId).toBe("1");
  });

  test("return a book", async () => {
    borrowRepository.returnBook.mockResolvedValue(true);
    const result = await borrowService.return("10");
    expect(result).toBe(true);
  });
});
