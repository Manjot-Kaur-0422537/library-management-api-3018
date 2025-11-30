export const validateAuthor = (data: any) => {
  const errors: any = {};

  if (!data.name || typeof data.name !== "string") {
    errors.name = "Author name is required";
  }

  if (data.bio && typeof data.bio !== "string") {
    errors.bio = "Bio must be a string";
  }

  return Object.keys(errors).length > 0 ? { errors } : null;
};
