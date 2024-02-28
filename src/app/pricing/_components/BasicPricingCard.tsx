"use client";
import { Check } from "lucide-react";
import React from "react";
import { Button } from "../../../components/ui/button";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

const BasicPricingCard = () => {
  const { data: session } = useSession();

  const isSubscribed = session?.user.subscription.toLowerCase() === "basic";
  return (
    <div className="group relative md:col-span-1 lg:w-[32%]">
      <div
        aria-hidden="true"
        className="absolute top-0 h-full w-full rounded-3xl border border-gray/20 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl shadow-gray-600/10 dark:shadow-none transition duration-500 group-hover:scale-105 lg:group-hover:scale-110"
      ></div>
      <div className="relative space-y-8 p-8">
        <h3 className="text-center text-3xl font-semibold text-darkGray/90 dark:text-white">
          Basic
        </h3>
        <div className="overflow-hidden">
          <div className="relative flex justify-around">
            <div className="flex">
              <span className="-ml-6 mt-2 text-3xl font-bold text-primary">
                $
              </span>
              <span className="leading-0 text-8xl font-bold text-darkGray dark:text-white">
                0
              </span>
            </div>
          </div>

          <span className="block text-center text-xs uppercase text-primary">
            BILLED MONTHLY
          </span>
        </div>

        <ul
          role="list"
          className="m-auto w-max space-y-4 pb-6 text-gray-600 dark:text-gray-300"
        >
          <li className="flex items-center space-x-2">
            <Check className="text-darkGray w-5 h-5 " />
            <span>Up to 5 classrooms</span>
          </li>
          <li className="flex items-center space-x-2">
            <Check className="text-darkGray w-5 h-5 " />
            <span>Not available yet</span>
          </li>
          <li className="flex items-center space-x-2">
            <Check className="text-darkGray w-5 h-5 " />
            <span>Not available yet</span>
          </li>
        </ul>
        <Button
          disabled={isSubscribed}
          className={cn(
            session?.user.subscription.toLowerCase() !== "basic" && "invisible",
            "w-full  rounded-full font-semibold text-white dark:text-darkGray"
          )}
        >
          {isSubscribed ? "Current plan" : "Start a plan"}
        </Button>
      </div>
    </div>
  );
};

export default BasicPricingCard;
