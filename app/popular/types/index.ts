export type PopularLinksType = {
  id?: number;
  name: string;
  url: string;
  description?: string;
  tags: string[];
  categories: string;
};
export interface PopularLinksCategoriesType {
  [key: string]: PopularLinksType[]; // Allows dynamic string keys
}
