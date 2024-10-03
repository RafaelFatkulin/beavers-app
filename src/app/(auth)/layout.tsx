import { Toaster } from "@/components/ui/toaster";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex items-center justify-center">
      {children}
      <Toaster />
    </div>
  );
}
