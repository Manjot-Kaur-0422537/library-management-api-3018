import { BooksService } from "../../src/api/v1/services/books.service";
import { BooksRepository } from "../../src/api/v1/repositories/books.repository";

jest.mock("../../src/api/v1/repositories/books.repository");

describe("Books Service CRUD", () => {
  let booksService: BooksService;
  let booksRepository: jest.Mocked<BooksRepository>;

  beforeEach(() => {
    booksRepository = new BooksRepository() as jest.Mocked<BooksRepository>;
    booksService = new BooksService(booksRepository);
  });

  test("should return all books", async () => {
    booksRepository.getAllBooks.mockResolvedValue([{ id: "1", title: "Test Book" }]);

    const result = await booksService.getBooks();
    expect(result.length).toBe(1);
  });

  test("should return single book", async () => {
    booksRepository.getBookById.mockResolvedValue({ id: "1", title: "Book" });

    const result = await booksService.getBook("1");
    expect(result.id).toBe("1");
  });

  test("should add a new book", async () => {
    const newBook = { title: "New Book" };
    booksRepository.addBook.mockResolvedValue({ id: "1", ...newBook });

    const result = await booksService.createBook(newBook);
    expect(result.title).toBe("New Book");
  });

  test("should update a book", async () => {
    const updated = { title: "Updated" };
    booksRepository.updateBook.mockResolvedValue({ id: "1", ...updated });

    const result = await booksService.updateBook("1", updated);
    expect(result.title).toBe("Updated");
  });

  test("should delete a book", async () => {
    booksRepository.deleteBook.mockResolvedValue(true);

    const result = await booksService.deleteBook("1");
    expect(result).toBe(true);
  });
});
