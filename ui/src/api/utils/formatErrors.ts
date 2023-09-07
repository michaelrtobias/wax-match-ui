export const formatErrors = (errors: Error[]) => {
  if (errors) {
    const errorMessage = errors.reduce((acc: string, error: Error) => {
      acc += `${error.message}\n`;
      return acc;
    }, "");
    throw new Error(errorMessage);
  }
};
