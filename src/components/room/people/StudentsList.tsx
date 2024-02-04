import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserType } from "@/lib/models/user.model";

const StudentsList = ({ students }: { students: UserType[] }) => {
  const sortedStudents = students.slice().sort((a: UserType, b: UserType) => {
    const firstnameA = a.firstName?.toLowerCase() ?? "";
    const firstnameB = b.firstName?.toLowerCase() ?? "";

    if (firstnameA < firstnameB) return -1;
    if (firstnameA > firstnameB) return 1;
    return 0;
  });

  return (
    <div className="w-full flex flex-wrap items-center gap-4">
      {sortedStudents.length === 0 && (
        <p className="mx-auto my-4">There are no students yet!</p>
      )}

      {sortedStudents.map((student: UserType) => (
        <div
          key={student.email}
          className="min-w-[4rem] max-w-fit flex-grow flex flex-col items-center gap-1"
        >
          <Avatar className="w-14 h-14">
            <AvatarImage
              src={student.profilePic || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>{student.firstName?.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <p className="text-sm text-center">
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
