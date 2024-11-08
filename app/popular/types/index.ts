export type PopularLinksType = {
  _id?: string;
  name: string;
  url: string;
  description?: string;
  tags: string[];
  folderPath: string;
  isFavorities?: boolean;
};
export interface PopularLinksCategoriesType {
  [key: string]: PopularLinksType[]; // Allows dynamic string keys
}
