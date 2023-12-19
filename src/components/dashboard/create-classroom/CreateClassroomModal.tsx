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
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <CreateClassroomForm />
            </DialogContent>
        </Dialog>
    );
};

export default CreateClassroomModal;
