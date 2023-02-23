export enum ROUTES {
  ROOT = '/',
  API = '/api',  API_HELLO = '/api/hello'
}export type Targs =| [ROUTES.ROOT]| [ROUTES.API]| [ROUTES.API_HELLO];