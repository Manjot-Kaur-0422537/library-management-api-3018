import * as BooksService from "../src/api/v1/services/books.service";

jest.mock("../src/api/v1/repositories/books.repository", () => ({
  findById: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn()
}));

jest.mock("../src/api/v1/repositories/authors.repository", () => ({
  findById: jest.fn()
}));

import * as BooksRepo from "../src/api/v1/repositories/books.repository";
import * as AuthorsRepo from "../src/api/v1/repositories/authors.repository";

const mockedBooksRepo = BooksRepo as jest.Mocked<typeof BooksRepo>;
const mockedAuthorsRepo = AuthorsRepo as jest.Mocked<typeof AuthorsRepo>;

describe("Books Service CRUD", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getById should return a book if found", async () => {
    const mockBook = { id: "1", title: "Test Book", authorId: "a1" };
    mockedBooksRepo.findById.mockResolvedValue(mockBook);

    const result = await BooksService.getById("1");

    expect(result).toEqual(mockBook);
    expect(mockedBooksRepo.findById).toHaveBeenCalledWith("1");
  });

  test("create should throw error if author not found", async () => {
    mockedAuthorsRepo.findById.mockResolvedValue(null);

    await expect(
      BooksService.create({ title: "Book 1", authorId: "invalid" })
    ).rejects.toThrow("Author not found");
  });

  test("create should call BooksRepo.create if author exists", async () => {
    const mockAuthor = { id: "a1", name: "Author 1" };
    const mockBook = { id: "1", title: "Book 1", authorId: "a1" };

    mockedAuthorsRepo.findById.mockResolvedValue(mockAuthor);
    mockedBooksRepo.create.mockResolvedValue(mockBook);

    const result = await BooksService.create({
      title: "Book 1",
      authorId: "a1"
    });

    expect(result).toEqual(mockBook);
    expect(mockedBooksRepo.create).toHaveBeenCalledWith({
      title: "Book 1",
      authorId: "a1"
    });
  });
});
