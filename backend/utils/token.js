import crypto from "crypto";

const DEFAULT_EXPIRES_IN = "7d";

const parseExpiresIn = (value = DEFAULT_EXPIRES_IN) => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value * 1000;
  }

  if (typeof value !== "string" || value.trim() === "") {
    return 7 * 24 * 60 * 60 * 1000;
  }

  const trimmed = value.trim();
  const match = trimmed.match(/^(\d+)\s*([smhd])$/i);

  if (!match) {
    return 7 * 24 * 60 * 60 * 1000;
  }

  const amount = Number(match[1]);
  const unit = match[2].toLowerCase();

  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return amount * multipliers[unit];
};

const base64UrlEncode = (value) => {
  const buffer = Buffer.isBuffer(value) ? value : Buffer.from(String(value));
  return buffer
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const base64UrlDecode = (value) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (normalized.length % 4)) % 4);
  return Buffer.from(normalized + padding, "base64").toString("utf8");
};

const getSecret = () => {
  const secret = process.env.JWT_SECRET || process.env.TOKEN_SECRET;

  if (!secret) {
    throw new Error("Missing JWT_SECRET or TOKEN_SECRET environment variable");
  }

  return secret;
};

export const signToken = (payload, expiresIn = DEFAULT_EXPIRES_IN) => {
  const secret = getSecret();
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = Math.floor((Date.now() + parseExpiresIn(expiresIn)) / 1000);

  const body = {
    ...payload,
    iat: issuedAt,
    exp: expiresAt,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedBody = base64UrlEncode(JSON.stringify(body));
  const unsignedToken = `${encodedHeader}.${encodedBody}`;

  const signature = crypto
    .createHmac("sha256", secret)
    .update(unsignedToken)
    .digest();

  return `${unsignedToken}.${base64UrlEncode(signature)}`;
};

export const verifyToken = (token) => {
  const secret = getSecret();

  if (!token || typeof token !== "string") {
    throw new Error("Token is required");
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token format");
  }

  const [encodedHeader, encodedBody, receivedSignature] = parts;
  const unsignedToken = `${encodedHeader}.${encodedBody}`;

  const expectedSignature = base64UrlEncode(
    crypto.createHmac("sha256", secret).update(unsignedToken).digest()
  );

  const receivedBuffer = Buffer.from(receivedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    receivedBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(receivedBuffer, expectedBuffer)
  ) {
    throw new Error("Invalid token signature");
  }

  const payload = JSON.parse(base64UrlDecode(encodedBody));

  if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
    throw new Error("Token has expired");
  }

  return payload;
};
