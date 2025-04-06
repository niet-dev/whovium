import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="container mx-auto">
      <div className="flex h-[75dvh] flex-col items-center justify-center space-y-8 p-4">
        <h2 className="col-span-2 w-[35%] text-center text-4xl/relaxed font-bold text-white">
          Guess Who, <br />
          <span className="underline decoration-2">Without The Guesswork.</span>
        </h2>
        <section className="w-[35%] text-center text-white">
          Whovium is a place to create and play with custom Guess Who boards
          from your favorite TV shows, books, or anything else you can think of.
        </section>
        <section className="flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link href="/boards">Explore</Link>
          </Button>
          <p className="px-4 text-sm text-white">or</p>
          <Button variant="outline" asChild>
            <Link href="/login">Sign Up</Link>
          </Button>
        </section>
        <p className="text-sm text-white">(it&apos;s free!)</p>
      </div>
    </main>
  );
}
