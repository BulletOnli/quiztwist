import { Button } from "@/components/ui/button";
import { Search, Users } from "lucide-react";

const Dashboard = async () => {
    return (
        <div className="w-full max-w-7xl min-h-screen flex flex-col">
            <div className="w-full flex justify-between items-center mt-10">
                <div>
                    <h1 className="font-bold text-2xl">My Classrooms</h1>
                    <p className="text-sm text-secondary-gray">
                        You can manage your classrooms below
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant={"outline"} size="icon">
                        <Search className="w-5" />
                    </Button>
                    <Button>Create Classroom</Button>
                </div>
            </div>

            <div className="w-full flex flex-wrap items-center gap-6 mt-10">
                <div className="flex-grow max-w-[12.5rem] h-[9rem] flex flex-col p-3 bg-[#F8F9FA] rounded-xl border border-[#CED4D4]">
                    <div className="w-full flex justify-between ">
                        <p>BSIT 1A</p>
                        <div className="flex items-center gap-1">
                            <p className="text-sm">3</p>
                            <Users className="w-4" />
                        </div>
                    </div>
                </div>
                <div className="flex-grow max-w-[12.5rem] h-[9rem] flex flex-col p-3 bg-[#F8F9FA] rounded-xl border border-[#CED4D4]">
                    <div className="w-full flex justify-between ">
                        <p>BSIT 1A</p>
                        <div className="flex items-center gap-1">
                            <p className="text-sm">3</p>
                            <Users className="w-4" />
                        </div>
                    </div>
                </div>
                <div className="flex-grow max-w-[12.5rem] h-[9rem] flex flex-col p-3 bg-[#F8F9FA] rounded-xl border border-[#CED4D4]">
                    <div className="w-full flex justify-between ">
                        <p>BSIT 1A</p>
                        <div className="flex items-center gap-1">
                            <p className="text-sm">3</p>
                            <Users className="w-4" />
                        </div>
                    </div>
                </div>
                <div className="flex-grow max-w-[12.5rem] h-[9rem] flex flex-col p-3 bg-[#F8F9FA] rounded-xl border border-[#CED4D4]">
                    <div className="w-full flex justify-between ">
                        <p>BSIT 1A</p>
                        <div className="flex items-center gap-1">
                            <p className="text-sm">3</p>
                            <Users className="w-4" />
                        </div>
                    </div>
                </div>
                <div className="flex-grow max-w-[12.5rem] h-[9rem] flex flex-col p-3 bg-[#F8F9FA] rounded-xl border border-[#CED4D4]">
                    <div className="w-full flex justify-between ">
                        <p>BSIT 1A</p>
                        <div className="flex items-center gap-1">
                            <p className="text-sm">3</p>
                            <Users className="w-4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
