import { LoginButton } from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(135deg, #000000, #000000)] from-cyan-500 to-blue-800">
      <h1 className="text-6xl font-semibold text-white drop-shadow-md">
        Auth
      </h1>
      <div>
        <LoginButton mode="redirect" asChild>
          <Button>Login</Button>
        </LoginButton>
      </div>
    </main>
  );
};

export default Home;
