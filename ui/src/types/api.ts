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
