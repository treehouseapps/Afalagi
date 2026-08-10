"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { getDbErrorMessage } from "@/lib/utils";

export async function login(email: string, password: string) {
  const credentials = z
    .object({
      email: z.string().email(),
      password: z.string().min(1),
    })
    .safeParse({ email, password });

  if (!credentials.success) {
    return { ok: false, error: "Enter a valid email and password." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        ok: false,
        error:
          "We couldn't find an account associated with this email address.",
      };
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return {
        ok: false,
        error: "Incorrect password. Please try again.",
      };
    }

    const token = await createToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    });

    return { ok: true, role: user.role };
  } catch (error) {
    return { ok: false, error: getDbErrorMessage(error) };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  return { ok: true };
}
