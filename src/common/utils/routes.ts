export enum ROUTES {
  ROOT = '/',
  API = '/api',  API_GRAPHQL = '/api/graphql',  LOGIN = '/login',  MEDIC = '/medic',  MEDIC_DASHBOARD = '/medic/dashboard',  MEDIC_INVITE = '/medic/invite',  MEDIC_PATIENTS = '/medic/patients',  REGISTER = '/register'
}export type TArgs =| [ROUTES.ROOT]| [ROUTES.API]| [ROUTES.API_GRAPHQL]| [ROUTES.LOGIN]| [ROUTES.MEDIC]| [ROUTES.MEDIC_DASHBOARD]| [ROUTES.MEDIC_INVITE]| [ROUTES.MEDIC_PATIENTS]| [ROUTES.REGISTER];