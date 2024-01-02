import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import CreateBtn from "./CreateBtn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClassroom } from "@/lib/actions/classroom.actions";

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
                                placeholder="CC 101"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="description"
                                className="col-span-3"
                                name="description"
                                placeholder="Computer Programming 1"
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
                                placeholder="BSIT 1A"
                                required
                                name="section"
                            />
                        </div>
                    </div>
                    <CreateBtn />
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateClassroomModal;