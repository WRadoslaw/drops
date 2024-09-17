export const routes = {
  root: () => "/",
  planetInfo: (name = ":name") => `planet/${name}`,
} as const;
