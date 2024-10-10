"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "../(auth)/_services";
import { cookies } from "next/headers";

async function refreshToken(currentUser) {
  if (!currentUser?.success) {
    const refreshToken = cookies().get("refreshToken")?.value;

    console.log("@@refreshToken", refreshToken);

    if (refreshToken) {
      await fetch("http://localhost:3000/api/auth/refresh", {
        method: "POST",
        body: JSON.stringify({ refreshToken })
      })
        .then(async (res) => await res.json())
        .catch((err) => {
          console.log("@@error", err);
          console.log("@@redirecting@@");

          redirect("/sign-in");
        });
    }
  }
}

export default async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) {
    await refreshToken(user);
  }

  return (
    <div className="h-full bg-primary text-primary-foreground">{children}</div>
  );
}
