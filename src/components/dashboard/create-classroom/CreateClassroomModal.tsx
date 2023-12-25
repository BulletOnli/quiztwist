import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import CreateClassroomForm from "./CreateClassroomForm";

const CreateClassroomModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>New Classroom</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Classroom</DialogTitle>
                    <DialogDescription>
                        Enter the subject and section name
                    </DialogDescription>
                </DialogHeader>
                <CreateClassroomForm />
            </DialogContent>
        </Dialog>
    );
};

export default CreateClassroomModal;
