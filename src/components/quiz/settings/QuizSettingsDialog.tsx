import { Button } from "@/components/ui/button";
import {
    DialogTrigger,
    DialogTitle,
    DialogHeader,
    DialogContent,
    Dialog,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    SelectValue,
    SelectTrigger,
    SelectItem,
    SelectContent,
    Select,
} from "@/components/ui/select";
import DeleteQuizAlert from "./delete-quiz/DeleteQuizAlert";

const QuizSettingsDialog = ({ quizId }: { quizId: string }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    Settings
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Quiz Settings</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="theme">Theme</Label>
                        <Select disabled>
                            <SelectTrigger className="text-gray-500 dark:text-gray-400">
                                <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">
                                    System Default
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="language">Language</Label>
                        <Select disabled>
                            <SelectTrigger className="text-gray-500 dark:text-gray-400">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="es">Spanish</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </form>

                <DeleteQuizAlert quizId={quizId} />
            </DialogContent>
        </Dialog>
    );
};

export default QuizSettingsDialog;
