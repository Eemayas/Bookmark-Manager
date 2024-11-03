export type PersonalWebsiteType = {
  _id?: string;
  name: string;
  url: string;
  description?: string;
  tags: string[];
  categories: string;
  isFavorities?: boolean;
  email_address: string;
};
export type NestedCategory = {
  [key: string]: PersonalWebsiteType[] | NestedCategory;
};

export type DataStructure = {
  [key: string]: NestedCategory;
};
