export const validateBook = (data: any) => {
  const errors: any = {};

  if (!data.title || typeof data.title !== "string") {
    errors.title = "Book title is required";
  }

  if (!data.authorId || typeof data.authorId !== "string") {
    errors.authorId = "Author ID is required";
  }

  if (data.publishedYear && typeof data.publishedYear !== "number") {
    errors.publishedYear = "Published year must be a number";
  }

  if (data.isbn && typeof data.isbn !== "string") {
    errors.isbn = "ISBN must be a string";
  }

  if (data.copies !== undefined && typeof data.copies !== "number") {
    errors.copies = "Copies must be a number";
  }

  return Object.keys(errors).length > 0 ? { errors } : null;
};
