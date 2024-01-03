import { Button } from "../../ui/button";

const UpcomingQuiz = () => {
    return (
        <div className="w-[14rem] min-h-[7rem] p-3 flex flex-col gap-2 border border-borderColor bg-secondary-gray rounded-lg">
            <p className="text-sm font-medium">Upcoming</p>
            <ul className="ml-4 text-xs list-disc">
                <li>Quiz #1 - 10 Items</li>
                <li>Quiz #2 - 10 Items</li>
                <li>Quiz #3 - 10 Items</li>
            </ul>
            <Button size="xs" className="mt-2">
                View All
            </Button>
        </div>
    );
};

export default UpcomingQuiz;
