export const truncate = (input: string, max: number = 20) =>
  input.length > max ? input.substr(0, max - 1) + "…" : input;
