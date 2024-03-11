import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center text-3xl">
      <div className="flex flex-col items-center">
        <h1 className="mb-4">Landing Page</h1>
        <div className="w-full flex flex-col gap-2">
          <Link href="/dashboard">
            <Button size="lg">Go to Dashboard</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" size="lg">
              Go to Pricing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
