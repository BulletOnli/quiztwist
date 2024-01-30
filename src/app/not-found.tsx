import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center ">
      <h1 className="text-9xl font-bold">404</h1>
      <h2 className="mt-4 text-3xl">Page not found.</h2>
      <p className="mt-2 text-lg">
        Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on
        the home page.
      </p>
      <Link href="/">
        <Button className="mt-8 rounded px-6 py-4">Back to Homepage</Button>
      </Link>
    </div>
  );
}
