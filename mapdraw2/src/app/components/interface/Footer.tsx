import Link from "next/link";
import React, { ReactElement } from "react";

import { ChevronsUpDown, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Footer() {
  const { data: session } = useSession();

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
                  <Link href="\login">
                    <span>Login</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
