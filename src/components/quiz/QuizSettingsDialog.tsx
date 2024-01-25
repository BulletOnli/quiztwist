import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const QuizSettingsDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full" variant="outline">
                    Settings
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>General Settings</DialogTitle>
                    <DialogDescription>
                        Lorem ipsum dolor sit amet.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default QuizSettingsDialog;
