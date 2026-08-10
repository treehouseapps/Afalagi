export function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function getDbErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Unable to access the database right now. Please try again later.";
}
