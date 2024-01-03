import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import NewQuizForm from "./NewQuizForm";

const NewQuizDialog = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className="flex flex-col gap-2">
                    <div className="w-[8rem] h-[6rem] flex justify-center items-center border border-borderColor rounded-lg bg-secondary-gray">
                        <img src="/plus.png" alt="" />
                    </div>
                    <p className="text-sm text-start">Blank Quiz</p>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a Quiz</DialogTitle>
                    <DialogDescription>
                        Lorem ipsum dolor sit amet.
                    </DialogDescription>
                </DialogHeader>
                <NewQuizForm />
            </DialogContent>
        </Dialog>
    );
};

export default NewQuizDialog;
