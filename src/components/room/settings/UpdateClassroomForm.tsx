import React from "react";
import UpdateClassroomBtn from "./UpdateClassroomBtn";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const UpdateClassroomForm = () => {
    return (
        <form className="flex flex-col gap-2">
            <div>
                <Label>Subject:</Label>
                <Input placeholder="Enter a Subject" />
            </div>
            <div>
                <Label>Description:</Label>
                <Input placeholder="Enter a Description" />
            </div>
            <div>
                <Label>Section:</Label>
                <Input placeholder="Enter a Section" />
            </div>
            <UpdateClassroomBtn />
        </form>
    );
};

export default UpdateClassroomForm;
