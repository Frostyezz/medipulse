export enum ROUTES {
  ROOT = '/',
  API = '/api',  API_HELLO = '/api/hello',  REGISTER = '/register',  REGISTER_MEDIC = '/register/medic'
}export type TArgs =| [ROUTES.ROOT]| [ROUTES.API]| [ROUTES.API_HELLO]| [ROUTES.REGISTER]| [ROUTES.REGISTER_MEDIC];