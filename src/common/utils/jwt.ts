import { SignJWT, jwtVerify } from "jose";
import { nanoid } from "nanoid";

export function signJwt(object: Object) {
  const iat = Math.floor(Date.now() / 1000);

  return new SignJWT({ ...object })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setJti(nanoid())
    .setExpirationTime("30d")
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.PRIVATE_KEY));
}

export async function verifyJwt<T>(token: string): Promise<T | null> {
  try {
    const decoded = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.PRIVATE_KEY)
    );
    return decoded?.payload as T | null;
  } catch (error) {
    return null;
  }
}
