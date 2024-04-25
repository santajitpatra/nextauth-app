import { LoginButton } from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { FaLock } from "react-icons/fa";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const Home = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-tl from-cyan-400 to-sky-600">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            font.className,
            "text-6xl font-semibold text-white drop-shadow-md"
          )}
        >
          <span className="flex items-center justify-center gap-x-2">
            <FaLock />
            Auth
          </span>
        </h1>
        <p className="text-white text-lg">
          A simple authentication example using Next.js and Prisma.
        </p>
        <div>
          <LoginButton>
            <Button variant={"secondary"} size={"lg"}>
              Login
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
};

export default Home;
