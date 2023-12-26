import ClassroomsGrid from "@/components/dashboard/ClassroomsGrid";
import JoinClassroomModal from "@/components/dashboard/student/join-classroom/JoinClassroomModal";
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

                <div className="flex items-center gap-1">
                    <Button variant={"outline"} size="icon">
                        <Search className="w-5" />
                    </Button>
                    <JoinClassroomModal />
                </div>
            </div>
            <ClassroomsGrid />
        </div>
    );
};

export default Dashboard;
