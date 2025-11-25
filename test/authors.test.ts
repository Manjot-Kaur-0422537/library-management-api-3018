import * as AuthorsRepo from "../src/api/v1/repositories/authors.repository";
import * as AuthorsService from "../src/api/v1/services/authors.service";

jest.mock("../src/api/v1/repositories/authors.repository");

const mockedAuthorsRepo = jest.mocked(AuthorsRepo);

describe("Authors Service CRUD", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAll should return a list of authors", async () => {
    const mockAuthors = [
      { id: "1", name: "Author One" },
      { id: "2", name: "Author Two" }
    ];

    mockedAuthorsRepo.findAll.mockResolvedValue(mockAuthors);

    const result = await AuthorsService.getAll();

    expect(result).toEqual(mockAuthors);
    expect(mockedAuthorsRepo.findAll).toHaveBeenCalled();
  });

  test("getById should return author if found", async () => {
    const mockAuthor = { id: "1", name: "Author One" };

    mockedAuthorsRepo.findById.mockResolvedValue(mockAuthor);

    const result = await AuthorsService.getById("1");

    expect(result).toEqual(mockAuthor);
    expect(mockedAuthorsRepo.findById).toHaveBeenCalledWith("1");
  });

  test("getById should return null if author not found", async () => {
    mockedAuthorsRepo.findById.mockResolvedValue(null);

    const result = await AuthorsService.getById("999");

    expect(result).toBeNull();
  });

  test("create should return newly created author", async () => {
    const newAuthor = { name: "New Author" };
    const mockCreated = { id: "123", name: "New Author" };

    mockedAuthorsRepo.create.mockResolvedValue(mockCreated);

    const result = await AuthorsService.create(newAuthor);

    expect(result).toEqual(mockCreated);
    expect(mockedAuthorsRepo.create).toHaveBeenCalledWith(newAuthor);
  });

  test("update should return updated author", async () => {
    const updated = { id: "1", name: "Updated Author" };

    mockedAuthorsRepo.update.mockResolvedValue(updated);

    const result = await AuthorsService.update("1", { name: "Updated Author" });

    expect(result).toEqual(updated);
    expect(mockedAuthorsRepo.update).toHaveBeenCalledWith("1", { name: "Updated Author" });
  });

  test("delete should return true if deleted", async () => {
    mockedAuthorsRepo.remove.mockResolvedValue(true);

    const result = await AuthorsService.remove("1");

    expect(result).toBe(true);
    expect(mockedAuthorsRepo.remove).toHaveBeenCalledWith("1");
  });

  test("delete should return false if not found", async () => {
    mockedAuthorsRepo.remove.mockResolvedValue(false);

    const result = await AuthorsService.remove("999");

    expect(result).toBe(false);
  });
});
