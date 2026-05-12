import { useState } from "react";
import { Button } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import LoginModal from "@/app/components/Modals/ModalLogin";

export default function Login() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const [loginOpen, setLoginOpen] = useState(false);

  if (searchParams.get("login") === "1" || searchParams.has("error")) {
    setLoginOpen(true);
  }

  return (
    <div data-sidebar="footer" className="flex flex-col gap-2 p-2">
      <ul data-sidebar="menu" className="flex w-full min-w-0 flex-col gap-1">
        <li data-sidebar="menu-item" className=" relative">
          <div className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none">
            <span className="relative flex shrink-0 overflow-hidden h-8 w-8 rounded-lg">
              <User />
            </span>
            <div className="grid flex-1 text-left text-sm">
              {(session && (
                <>
                  <span className="truncate font-semibold">
                    {session.user!.name}
                  </span>
                  <span className="truncate text-xs">
                    {session.user!.email}
                  </span>
                  <span>
                    <button onClick={() => signOut()}>Sign out</button>
                  </span>
                </>
              )) || (
                <>
                  <div
                    className="font-bold"
                    onClick={() => {
                      setLoginOpen(true);
                    }}
                  >
                    Sign in
                  </div>
                  <LoginModal
                    open={loginOpen}
                    handleClose={() => {
                      setLoginOpen(false);
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
