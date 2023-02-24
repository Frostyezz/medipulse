export enum ROUTES {
  ROOT = '/',
  API = '/api',  REGISTER = '/register',  REGISTER_MEDIC = '/register/medic'
}export type TArgs =| [ROUTES.ROOT]| [ROUTES.API]| [ROUTES.REGISTER]| [ROUTES.REGISTER_MEDIC];