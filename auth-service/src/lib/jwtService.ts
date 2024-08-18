import * as jose from "jose";

const { SignJWT, } = jose;

const secret: Uint8Array = new TextEncoder().encode(process.env.JWT_SIGNING_KEY);

export interface CustPayload extends jose.JWTPayload {
  uid: string,
  usr: string,
  scope: string,
}

export function buildPayload(
  userId: string,
  username: string,
  scope: string[]
): CustPayload {
  return {
    "uid": userId,
    "usr": username,
    "scope": scope.join(" ")
  }
}

export async function sign(payload: CustPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({alg: "HS256"})
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
}

export async function verify(jwt: string): Promise<CustPayload> {
  const x: jose.JWTVerifyResult = await jose.jwtVerify(jwt, secret, {});
  return x.payload as CustPayload
}

export function hasPermission(payload: CustPayload, permission: string): boolean {
  return payload.scope.split(" ").includes(permission);
}