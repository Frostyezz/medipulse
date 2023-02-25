export enum ROUTES {
  ROOT = '/',
  API = '/api',  API_GRAPHQL = '/api/graphql',  REGISTER = '/register'
}export type TArgs =| [ROUTES.ROOT]| [ROUTES.API]| [ROUTES.API_GRAPHQL]| [ROUTES.REGISTER];