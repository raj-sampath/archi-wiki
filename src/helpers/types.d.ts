export type CreatePageRequest = {
  parentId: string;
  spaceId: string;
  title: string;
  page: Page;
};

export type Page = {
  h1?: string;
  h2?: string;
  h3?: string;
  h4?: string;
  h5?: string;
  h6?: string;
  p?: string;
  ul?: string[];
  ol?: string[];
  table?: {
    header: string[];
    rows: string[][];
  };
  code?: {
    language: string;
    code: string;
  };
}[];
