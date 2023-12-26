import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import JoinBtn from "./JoinBtn";
import { Input } from "@/components/ui/input";
import { joinClassroom } from "@/lib/actions/classroom.actions";

const JoinClassroomModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Join Classroom</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Join a Classroom</DialogTitle>
                    <DialogDescription>
                        Enter the classroom code
                    </DialogDescription>
                </DialogHeader>
                <form action={joinClassroom} className="flex flex-col gap-4">
                    <Input
                        id="classCode"
                        className="text-lg text-center"
                        name="classCode"
                        required
                        maxLength={5}
                        minLength={5}
                    />
                    <JoinBtn />
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default JoinClassroomModal;
