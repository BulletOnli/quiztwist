"use client";
import { Input } from "@/components/ui/input";
import JoinBtn from "./JoinBtn";
import { joinClassroom } from "@/lib/actions/classroom.actions";
import { toast } from "sonner";

const JoinClassroomForm = () => {
    const joinFormAction = async (formData: FormData) => {
        const response = await joinClassroom(formData);

        if (response?.error) {
            return toast.error(response.error);
        }

        toast.success(response.message);
    };

    return (
        <form action={joinFormAction} className="flex flex-col gap-4">
            <Input
                id="classCode"
                className="text-lg text-center"
                name="classCode"
                required
                maxLength={5}
                minLength={5}
                placeholder="aBcDe"
            />
            <JoinBtn />
        </form>
    );
};

export default JoinClassroomForm;
