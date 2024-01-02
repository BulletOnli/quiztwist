"use client";
import { Input } from "@/components/ui/input";
import JoinBtn from "./JoinBtn";
import { joinClassroom } from "@/lib/actions/classroom.actions";
import { toast } from "sonner";
import { useState } from "react";

const JoinClassroomForm = () => {
    const [inputLength, setInputLength] = useState(0);

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
                onChange={(e) => setInputLength(e.target.value.length)}
            />

            <JoinBtn inputLength={inputLength} />
        </form>
    );
};

export default JoinClassroomForm;
