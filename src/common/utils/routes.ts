export enum ROUTES {
  ROOT = '/',
  API = '/api',  API_GRAPHQL = '/api/graphql',  LOGIN = '/login',  MEDIC = '/medic',  MEDIC_DASHBOARD = '/medic/dashboard',  MEDIC_INVITE = '/medic/invite',  REGISTER = '/register'
}export type TArgs =| [ROUTES.ROOT]| [ROUTES.API]| [ROUTES.API_GRAPHQL]| [ROUTES.LOGIN]| [ROUTES.MEDIC]| [ROUTES.MEDIC_DASHBOARD]| [ROUTES.MEDIC_INVITE]| [ROUTES.REGISTER];