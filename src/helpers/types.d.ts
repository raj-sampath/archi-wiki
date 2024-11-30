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

export type ConfulencePageCreateResponse = Partial<{
  parentType: string;
  ownerId: string;
  lastOwnerId: any;
  createdAt: string;
  authorId: string;
  version: {
    number: number;
    message: string;
    minorEdit: boolean;
    authorId: string;
    createdAt: string;
  };
  position: number;
  title: string;
  status: string;
  body: {
    storage: {
      representation: string;
      value: string;
    };
  };
  parentId: string;
  spaceId: string;
  id: string;
  _links: {
    editui: string;
    webui: string;
    edituiv2: string;
    tinyui: string;
    base: string;
  };
  errors: {
    title: string;
    status: number;
    code: string;
  }[];
}>;

export type KeyValueStorage = {
  hash: string;
  date: string;
  pageId: string;
  wiki: string;
  version: number;
};
