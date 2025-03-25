"use client";

import Link from "next/link";

import { User } from "@prisma/client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import SignOutButton from "@/components/sign-out-button";

type NavBarProps = {
  user: User | null;
};

export default function NavBar({ user }: NavBarProps) {
  return (
    <header>
      <nav className="container mx-auto flex h-16 justify-between p-4">
        <Link href="/" className="flex items-center font-bold text-red-400">
          W?
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/boards" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Boards
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              {user ? (
                <>
                  <NavigationMenuTrigger>{user.username}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[200px]">
                      <li>
                        <SignOutButton />
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <Link href="/login" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Sign in
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </header>
  );
}
