import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { SignInForm } from "./_components/sign-in-form";

export default function SignIn() {
  return (
    <Card className="min-w-[360px]">
      <CardHeader className="space-y-0.5">
        <CardTitle className="text-2xl font-bold">Логин</CardTitle>
        <CardDescription>Введите свои данные для входа</CardDescription>
      </CardHeader>

      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
}
