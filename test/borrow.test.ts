import { BorrowRepository } from "../src/api/v1/repositories/borrow.repository";

jest.mock("../src/api/v1/repositories/borrow.repository");

describe("Borrow Service", () => {
  let borrowRepoMock: jest.Mocked<BorrowRepository>;

  beforeEach(() => {
    borrowRepoMock = new BorrowRepository() as jest.Mocked<BorrowRepository>;
    jest.clearAllMocks();
  });

  test("borrow a book", async () => {
    const borrowData = { bookId: "1", userId: "100" };
    
    borrowRepoMock.borrowBook.mockResolvedValue({ id: "10", ...borrowData, createdAt: new Date().toISOString() });

    const result = await borrowRepoMock.borrowBook(borrowData);

    expect(result.bookId).toBe("1");
    expect(borrowRepoMock.borrowBook).toHaveBeenCalledWith(borrowData);
  });

  test("return a book", async () => {
    borrowRepoMock.returnBook.mockResolvedValue(true);

    const result = await borrowRepoMock.returnBook("10");

    expect(result).toBe(true);
    expect(borrowRepoMock.returnBook).toHaveBeenCalledWith("10");
  });
});
