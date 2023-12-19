"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClassroom } from "@/lib/actions/classroom.actions";
import CreateBtn from "./CreateBtn";

const CreateClassroomForm = () => {
    return (
        <form action={createClassroom}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject" className="text-right">
                        Subject
                    </Label>
                    <Input
                        id="subject"
                        className="col-span-3"
                        name="subject"
                        required
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="section" className="text-right">
                        Section
                    </Label>
                    <Input
                        id="section"
                        className="col-span-3"
                        required
                        name="section"
                    />
                </div>
            </div>
            <CreateBtn />
        </form>
    );
};

export default CreateClassroomForm;
