export enum ROUTES {
  ROOT = '/',
  API = '/api',  API_GRAPHQL = '/api/graphql',  MEDIC = '/medic',  MEDIC_DASHBOARD = '/medic/dashboard',  REGISTER = '/register'
}export type TArgs =| [ROUTES.ROOT]| [ROUTES.API]| [ROUTES.API_GRAPHQL]| [ROUTES.MEDIC]| [ROUTES.MEDIC_DASHBOARD]| [ROUTES.REGISTER];