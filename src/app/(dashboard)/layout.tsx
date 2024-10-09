import { redirect } from "next/navigation";
import { getCurrentUser } from "../(auth)/_services";
import { cookies } from "next/headers";

async function refreshToken(currentUser) {
  if (!currentUser?.success) {
    const refreshToken = cookies().get("refreshToken")?.value;

    console.log("@@refreshToken", refreshToken);

    if (refreshToken) {
      try {
        const response = await fetch("http://localhost:3000/api/auth/refresh", {
          method: "POST",
          body: JSON.stringify({ refreshToken })
        });

        const responseJson = await response.json();

        cookies().set("accessToken", response.data.data.accessToken, {
          secure: false,
          httpOnly: true,
          path: "/"
        });
        cookies().set("refreshToken", response.data.data.refreshToken, {
          secure: false,
          httpOnly: true,
          path: "/"
        });

        console.log("@@res", responseJson);
      } catch (error) {
        console.log("@@error", error);
        redirect("/sign-in");
      }
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
