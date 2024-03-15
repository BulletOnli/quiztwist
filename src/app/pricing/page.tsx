import { Metadata } from "next";
import PricingGrid from "./_components/PricingGrid";

export const metadata: Metadata = {
  title: "Pricing",
};

const SubscriptionPage = () => {
  return (
    <div className="xl:container m-auto px-6 py-20 md:px-12 lg:px-20">
      <div className="m-auto text-center lg:w-9/12">
        <h2 className="text-2xl font-bold text-darkGray dark:text-white md:text-4xl">
          QuizTwist subscription gives you more access to our Dashboard and
          Classrooms.
        </h2>
      </div>

      <PricingGrid />
    </div>
  );
};

export default SubscriptionPage;
