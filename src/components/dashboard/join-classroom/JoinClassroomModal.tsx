import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import JoinClassroomForm from "./JoinClassroomForm";

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
                <JoinClassroomForm />
            </DialogContent>
        </Dialog>
    );
};

export default JoinClassroomModal;
