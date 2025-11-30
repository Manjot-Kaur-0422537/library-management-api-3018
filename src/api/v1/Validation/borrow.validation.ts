export const validateBorrow = (data: any) => {
  const errors: any = {};

  if (!data.bookId || typeof data.bookId !== "string") {
    errors.bookId = "Book ID is required";
  }

  if (!data.userName || typeof data.userName !== "string") {
    errors.userName = "User name is required";
  }

  if (data.returnDate && typeof data.returnDate !== "string") {
    errors.returnDate = "Return date must be a string (ISO format)";
  }

  return Object.keys(errors).length > 0 ? { errors } : null;
};
