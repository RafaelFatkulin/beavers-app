"use server";

import { Toaster } from "@/components/ui/toaster";
import { getCurrentUser } from "./_services";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="h-full flex items-center justify-center">
      {children}
      <Toaster />
    </div>
  );
}
