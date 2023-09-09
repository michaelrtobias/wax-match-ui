export type RequestTokenBody = {
  oauth_token: string;
  oauth_token_secret: string;
  oauth_callback_confirmed: string;
};
export type AccessTokenBody = {
  oauth_token: string;
  oauth_token_secret: string;
  oauth_callback_confirmed: string;
};

export type ApiGAtewayResponseHeaders = {
  ["Access-Control-Allow-Origin"]: string;
  ["Access-Control-Allow-Credentials"]: boolean;
  ["Access-Control-Allow-Headers"]: string;
  ["Access-Control-Allow-Methods"]: string;
};

export interface ApiGatewayRespnse {
  statusCode: number;
  headers: ApiGAtewayResponseHeaders;
  body: string;
}

export interface DiscogsIdentity {
  id: number;
  username: string;
  resource_url: string;
  consumer_name: string;
}

export interface HookReturn {
  data: DiscogsIdentity;
}

export interface DiscogsGetCollectionReleases {
  pagination: pagination;
  releases: releases[];
}

export type pagination = {
  page: number;
  pages: number;
  per_page: number;
  items: number;
  urls: object;
};
export type releases = {
  id: number;
  instance_id: number;
  date_added: string;
  rating: number;
  basic_information: basic_information;
  folder_id: number;
};

export type basic_information = {
  id: number;
  master_id: number;
  master_url: string;
  resource_url: string;
  thumb: string;
  cover_image: string;
  title: string;
  year: number;
  formats: formats[];
  artists: artists[];
  labels: labels[];
  genres: string[];
  styles: string[];
};

export type formats = {
  name: string;
  qty: string;
  description: string[];
};

export type artists = {
  name: string;
  anv: string;
  join: string;
  role: string;
  tracks: string;
  id: number;
  resource_url: string;
};

export type labels = {
  name: string;
  catno: string;
  entity_type: string;
  entity_type_name: string;
  id: number;
  resource_url: string;
};
