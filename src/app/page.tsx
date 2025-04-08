import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="relative container mx-auto max-w-lg px-4 py-16 md:py-32">
      <div className="flex flex-col items-center justify-center space-y-8 p-4">
        <h2 className="text-background text-center text-4xl/tight font-bold">
          Guess Who, <br />
          <span className="underline decoration-2">Without The Guesswork.</span>
        </h2>
        <section className="text-background text-center">
          Whovium is a place to create and play with custom Guess Who boards
          from your favorite TV shows, books, or anything else you can think of.
        </section>
        <section className="flex items-center justify-between">
          <Button
            variant="outline"
            asChild
            className="bg-fill text-text-strong hover:bg-fill/90 border-none"
          >
            <Link href="/boards">Explore</Link>
          </Button>
          <p className="px-4 text-sm text-white">or</p>
          <Button
            variant="outline"
            asChild
            className="bg-fill text-text-strong hover:bg-fill/90 border-none"
          >
            <Link href="/login">Sign Up</Link>
          </Button>
        </section>
        <p className="text-background text-sm">(it&apos;s free!)</p>
      </div>
    </main>
  );
}
