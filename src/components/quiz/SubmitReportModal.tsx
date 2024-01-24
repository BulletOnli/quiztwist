"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import NewQuestionFormBtn from "../question/NewQuestionFormBtn";

const SubmitReportModal = () => {
    const [open, setOpen] = useState(false);

    const newReportAction = async (formData: FormData) => {
        console.log(formData);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full" variant="outline">
                    Submit a Report
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Submit a Report</DialogTitle>
                </DialogHeader>
                <form action={newReportAction} className="flex flex-col gap-4">
                    <div className="flex justify-center gap-2">
                        <p className="font-medium text-sm">From:</p>
                        <Input
                            autoComplete="off"
                            id="question"
                            name="question"
                            placeholder="Enter a Question"
                            required
                        />
                    </div>

                    <NewQuestionFormBtn />
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SubmitReportModal;
