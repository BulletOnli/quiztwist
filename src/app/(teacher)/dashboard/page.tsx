import ClassroomsGrid from "@/components/dashboard/ClassroomsGrid";
import CreateClassroomModal from "@/components/dashboard/teacher/create-classroom/CreateClassroomModal";
import { Button } from "@/components/ui/button";

import { Search } from "lucide-react";

const Dashboard = async () => {
    return (
        <div className="w-full max-w-7xl flex flex-col">
            <div className="w-full flex justify-between items-center mt-10">
                <div>
                    <h1 className="font-bold text-2xl">My Classrooms</h1>
                    <p className="text-sm text-secondaryGray">
                        You can manage your classrooms below
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant={"outline"} size="icon">
                        <Search className="w-5" />
                    </Button>
                    <CreateClassroomModal />
                </div>
            </div>
            <ClassroomsGrid />
        </div>
    );
};

export default Dashboard;
