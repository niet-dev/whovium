"use client";

import Link from "next/link";

import { User } from "@prisma/client";

import { cn } from "@/lib/utils";
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
    <header className="bg-background">
      <nav className="container mx-auto flex h-14 w-full justify-between p-4">
        <Link href="/" className="text-brand flex items-center font-bold">
          W?
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/boards" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), "text-text-weak")}
                >
                  Boards
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              {user ? (
                <>
                  <NavigationMenuTrigger className="text-text-weak">
                    {user.username}
                  </NavigationMenuTrigger>
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
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "text-text-weak",
                    )}
                  >
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
