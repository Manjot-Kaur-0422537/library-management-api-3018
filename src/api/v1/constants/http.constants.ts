export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
} as const;

export const HTTP_MESSAGES = {
  NOT_FOUND: "Resource not found",
  INVALID_DATA: "Invalid request data",
  SERVER_ERROR: "Something went wrong on the server",
  DELETED: "Deleted successfully",
} as const;
