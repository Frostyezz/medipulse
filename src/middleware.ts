import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "./common/utils/jwt";
import { User } from "./services/graphql/schemas/user.schema";
import { ROUTES } from "./common/utils/routes";
import { ROLES } from "./services/graphql/types/enums";

export async function middleware(req: NextRequest) {
  const decoded = await verifyJwt<{ _id: User["_id"]; role: User["role"] }>(
    req.cookies.get("MediPulseJWT")?.value ?? ""
  );

  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/medic") && decoded?.role !== ROLES.MEDIC) {
    console.log(decoded);
    url.pathname = ROUTES.NOT_FOUND;
    return NextResponse.rewrite(url);
  }

  if (url.pathname.startsWith("/nurse") && decoded?.role !== ROLES.NURSE) {
    console.log(decoded);
    url.pathname = ROUTES.NOT_FOUND;
    return NextResponse.rewrite(url);
  }

  if (url.pathname.startsWith("/patient") && decoded?.role !== ROLES.PATIENT) {
    console.log(decoded);
    url.pathname = ROUTES.NOT_FOUND;
    return NextResponse.rewrite(url);
  }

  if (url.pathname === ROUTES.LOGIN && decoded?._id) {
    console.log(decoded);
    url.pathname = ROUTES.NOT_FOUND;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
