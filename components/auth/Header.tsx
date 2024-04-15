import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { FaLock } from "react-icons/fa";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h2 className={cn(font.className, "text-3xl font-semibold ")}>
        <span className="flex gap-x-2">
          <FaLock />
          Auth
        </span>
      </h2>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
