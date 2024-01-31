import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center text-3xl">
      <div className="flex flex-col items-center">
        <h1 className="mb-4">Landing Page</h1>
        <Link href="/dashboard">
          <Button size="lg">Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
