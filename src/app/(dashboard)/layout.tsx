export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full bg-primary text-primary-foreground">{children}</div>
  );
}
