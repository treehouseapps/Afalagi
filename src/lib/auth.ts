import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

type AuthUser = {
  id: number;
  role: string;
};

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  const decoded = await verifyToken(token);

  return decoded.payload as AuthUser;
}
