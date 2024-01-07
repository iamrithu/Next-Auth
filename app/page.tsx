import { Poppins, Mulish } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login-button";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
export default function Home() {
  return (
    <main className="flex flex-col h-full justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100 to-sky-400">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-white text-6xl font-bold drop-shadow-md",
            font.className
          )}>
          🔐 Auth
        </h1>
        <p className="text-white text-2xl drop-shadow-sm">
          A simple authendication service
        </p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
