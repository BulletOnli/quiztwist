import PricingCard from "@/app/pricing/_components/PricingCard";

const PricingData = [
  {
    plan: "Basic",
    price: 0,
    perks: ["Up to 5 classrooms", "Not available yet", "Not available yet"],
  },
  {
    plan: "Premium",
    price: 1.99,
    perks: ["Unlimited classsrooms", "Not available yet", "Not available yet"],
  },
  {
    plan: "Pro",
    price: 1,
    perks: ["Up to 10 classrooms", "Not available yet", "Not available yet"],
  },
];

const PricingGrid = () => {
  return (
    <div className="mt-12 grid items-center gap-6 md:grid-cols-2 lg:flex lg:space-x-8">
      {PricingData.map((data) => (
        <PricingCard
          cardTitle={data.plan}
          cardPrice={data.price}
          perks={data.perks}
          key={data.plan}
        />
      ))}
    </div>
  );
};

export default PricingGrid;
