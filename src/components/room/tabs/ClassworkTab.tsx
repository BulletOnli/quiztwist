import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

const ClassworkTab = () => {
    return (
        <div className="w-full flex gap-10 p-6">
            <div className="flex flex-col items-center gap-4">
                <div className="w-[14rem] min-h-[7rem] p-3 flex flex-col gap-2 border border-borderColor bg-secondary rounded-lg">
                    <p className="text-sm font-medium">Upcoming</p>
                    <ul className="ml-4 text-xs list-disc">
                        <li>Exam #1 - 10 Items</li>
                        <li>Exam #1 - 10 Items</li>
                        <li>Exam #1 - 10 Items</li>
                    </ul>
                    <Button size="xs" className="mt-2">
                        View All
                    </Button>
                </div>
                <div className="w-[14rem] min-h-[6rem] p-3 flex flex-col gap-2 border border-borderColor bg-secondary rounded-lg">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Class code</p>
                        <Button size="xs" variant="secondary">
                            <MoreVertical className="w-5" />
                        </Button>
                    </div>
                    <div className="w-full h-full flex justify-center items-center">
                        <p className="font-semibold text-xl text-gray">AbCdE</p>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col">
                <p className="mb-2">Start a new activity</p>

                <div className="flex items-center flex-wrap gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="w-[150px] h-[100px] flex justify-center items-center border border-borderColor rounded-lg bg-secondary">
                            <img src="/plus.png" alt="" />
                        </div>
                        <p className="text-sm">Blank Quiz</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="w-[150px] h-[100px] flex justify-center items-center border border-borderColor rounded-lg bg-secondary"></div>
                        <p className="text-sm">Template 1</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="w-[150px] h-[100px] flex justify-center items-center border border-borderColor rounded-lg bg-secondary"></div>
                        <p className="text-sm">Template 2</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassworkTab;
