import { Button } from "@/components/ui/button";

const SubscriptionPage = () => {
    return (
        <div className="w-full min-h-[80vh] flex justify-center items-center">
            <div className="flex flex-col items-center justify-center space-y-6 md:space-y-10 lg:space-y-12">
                <h1 className="text-3xl font-bold">Choose Your Plan</h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-[600px] text-center">
                    Select the plan that best fits your needs. Change or cancel
                    your plan at any time.
                </p>
                <div className="grid gap-6 md:gap-8 lg:gap-10 w-full max-w-4xl grid-cols-1 md:grid-cols-3">
                    <div className="flex flex-col items-center justify-center p-6 space-y-4 bg-white shadow rounded-lg dark:bg-gray-800">
                        <h2 className="text-xl font-bold">Basic</h2>
                        <span className="text-4xl font-bold">$9.99</span>
                        <span className="text-gray-500 dark:text-gray-400">
                            per month
                        </span>
                        <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                            <li>Access to all features</li>
                            <li>Unlimited users</li>
                            <li>5GB of storage</li>
                        </ul>
                        <Button className="w-full">Sign Up</Button>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 space-y-4 bg-white shadow rounded-lg dark:bg-gray-800">
                        <h2 className="text-xl font-bold">Pro</h2>
                        <span className="text-4xl font-bold">$19.99</span>
                        <span className="text-gray-500 dark:text-gray-400">
                            per month
                        </span>
                        <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                            <li>Access to all features</li>
                            <li>Unlimited users</li>
                            <li>50GB of storage</li>
                        </ul>
                        <Button className="w-full">Sign Up</Button>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 space-y-4 bg-white shadow rounded-lg dark:bg-gray-800">
                        <h2 className="text-xl font-bold">Enterprise</h2>
                        <span className="text-4xl font-bold">$49.99</span>
                        <span className="text-gray-500 dark:text-gray-400">
                            per month
                        </span>
                        <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                            <li>Access to all features</li>
                            <li>Unlimited users</li>
                            <li>Unlimited storage</li>
                        </ul>
                        <Button className="w-full">Sign Up</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPage;
