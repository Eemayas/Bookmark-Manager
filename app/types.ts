/** @format */

// types.ts (Create a types file for shared types, or define this in the main file)
export type Website = {
  id: number;
  name: string;
  url: string;
  description: string;
  tags: string[];
  categories: string;
};
export type NestedCategory = {
  [key: string]: Website[] | NestedCategory;
};

export type DataStructure = {
  [key: string]: NestedCategory;
};
