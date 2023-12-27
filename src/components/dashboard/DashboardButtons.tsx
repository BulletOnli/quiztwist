import React from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import CreateClassroomModal from "./create-classroom/CreateClassroomModal";
import JoinClassroomModal from "./join-classroom/JoinClassroomModal";

const DashboardButtons = ({ session }: { session: any }) => {
    return (
        <div className="flex items-center gap-2">
            <Button variant={"outline"} size="icon">
                <Search className="w-5" />
            </Button>
            {session?.user.role === "Teacher" ? (
                <CreateClassroomModal />
            ) : (
                <JoinClassroomModal />
            )}
        </div>
    );
};

export default DashboardButtons;
