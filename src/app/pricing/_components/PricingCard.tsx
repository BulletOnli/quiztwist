"use client";
import { Check } from "lucide-react";
import React from "react";
import { Button } from "../../../components/ui/button";
import { stripeCheckout } from "@/services/stripe";
import { useSession } from "next-auth/react";

type PricingCardType = {
  cardTitle: string;
  cardPrice: number;
  perks: string[];
};

const PricingCard = ({ cardPrice, cardTitle, perks }: PricingCardType) => {
  const { data: session } = useSession();

  const handleSubmit = async () => {
    await stripeCheckout({
      plan: cardTitle,
      price: cardPrice,
      userId: session?.user.id!,
    });
  };

  return (
    <div className="group relative md:col-span-1 lg:w-[32%]">
      <form action={handleSubmit}>
        <div
          aria-hidden="true"
          className="absolute top-0 h-full w-full rounded-3xl border border-gray/20 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl shadow-gray-600/10 dark:shadow-none transition duration-500 group-hover:scale-105 lg:group-hover:scale-110"
        ></div>
        <div className="relative space-y-8 p-8">
          <h3 className="text-center text-3xl font-semibold text-darkGray/90 dark:text-white">
            {cardTitle}
          </h3>
          <div className="overflow-hidden">
            <div className="relative flex justify-around">
              <div className="flex">
                <span className="-ml-6 mt-2 text-3xl font-bold text-primary">
                  $
                </span>
                <span className="leading-0 text-8xl font-bold text-darkGray dark:text-white">
                  {cardPrice}
                </span>
              </div>
            </div>
            {cardTitle.toLowerCase() === "premium" && (
              <span className="block text-2xl font-medium text-center text-gray-400 line-through mt-3">
                $4.99
              </span>
            )}
            <span className="block text-center text-xs uppercase text-primary">
              BILLED MONTHLY
            </span>
          </div>

          <ul
            role="list"
            className="m-auto w-max space-y-4 pb-6 text-gray-600 dark:text-gray-300"
          >
            {perks?.map((perk) => (
              <li
                key={perk + Math.random()}
                className="flex items-center space-x-2"
              >
                <Check className="text-darkGray w-5 h-5 " />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
          <Button
            type="submit"
            className="w-full  rounded-full font-semibold text-white dark:text-darkGray"
          >
            {session?.user.subscription === "pro"
              ? "Current plan"
              : "Start a plan"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PricingCard;
