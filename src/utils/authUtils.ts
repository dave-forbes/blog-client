import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  username: string;
  exp: number;
  author: Boolean;
}

export function decodeToken(token: string): DecodedToken | null {
  try {
    return jwtDecode(token) as DecodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

export function isTokenValid(token: string): boolean {
  const decodedToken = decodeToken(token);
  if (!decodedToken) {
    return false;
  }
  const expirationTimeMs = decodedToken.exp * 1000;
  const currentTime = Date.now();
  return currentTime < expirationTimeMs;
}
