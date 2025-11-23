import { AuthorsService } from "../../src/api/v1/services/authors.service";
import { AuthorsRepository } from "../../src/api/v1/repositories/authors.repository";

jest.mock("../../src/api/v1/repositories/authors.repository");

describe("Authors Service CRUD", () => {
  let authorsService: AuthorsService;
  let authorsRepository: jest.Mocked<AuthorsRepository>;

  beforeEach(() => {
    authorsRepository = new AuthorsRepository() as jest.Mocked<AuthorsRepository>;
    authorsService = new AuthorsService(authorsRepository);
  });

  test("get all authors", async () => {
    authorsRepository.getAllAuthors.mockResolvedValue([{ id: "1", name: "Author" }]);
    const result = await authorsService.getAuthors();
    expect(result.length).toBe(1);
  });

  test("get one author", async () => {
    authorsRepository.getAuthorById.mockResolvedValue({ id: "1", name: "Author" });
    const result = await authorsService.getAuthor("1");
    expect(result.id).toBe("1");
  });

  test("create author", async () => {
    const data = { name: "New Author" };
    authorsRepository.addAuthor.mockResolvedValue({ id: "1", ...data });
    const result = await authorsService.createAuthor(data);
    expect(result.name).toBe("New Author");
  });

  test("update author", async () => {
    const updated = { name: "Updated" };
    authorsRepository.updateAuthor.mockResolvedValue({ id: "1", ...updated });
    const result = await authorsService.updateAuthor("1", updated);
    expect(result.name).toBe("Updated");
  });

  test("delete author", async () => {
    authorsRepository.deleteAuthor.mockResolvedValue(true);
    const result = await authorsService.deleteAuthor("1");
    expect(result).toBe(true);
  });
});
