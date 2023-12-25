import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserType } from "@/lib/models/user.model";

// Type must be UserType[]
const StudentsList = ({ students }: { students: any }) => {
    return (
        <div className="w-full flex flex-wrap items-center gap-4">
            {students.length === 0 && (
                <p className="mx-auto my-4">There are no students yet!</p>
            )}
            {students.map((student: UserType) => (
                <div
                    key={student.email}
                    className="flex flex-col items-center gap-1"
                >
                    <Avatar className="w-14 h-14">
                        <AvatarImage
                            src={
                                student.profilePic ||
                                "https://github.com/shadcn.png"
                            }
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="text-sm">
                        {student.firstName}
                        <br />
                        {student.lastName}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default StudentsList;
