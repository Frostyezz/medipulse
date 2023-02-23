import { ROUTES, TArgs } from "./routes";

export type RouteParams<T extends ROUTES> = Extract<TArgs, [T, unknown]>[1];

// export const createPath = (...args: TArgs): string => {
//   const [path, params] = args;

//   if (typeof params === "undefined") return path;

//   return Object.entries(params).reduce(
//     (previousValue: string, [param, value]) =>
//       previousValue.replace(`:${param}`, value),
//     path
//   );
// };
