import { getClassrooms } from "@/lib/actions/classroom.actions";
import ClassroomCard from "./ClassroomCard";
import PublicClassroom from "./PublicClassroom";

const ClassroomsGrid = async () => {
  const classrooms = await getClassrooms();

  return (
    <div className="w-full flex flex-wrap items-center gap-6 mt-10">
      <PublicClassroom />
      {classrooms?.map((classroom) => (
        <ClassroomCard key={classroom._id.toString()} classroom={classroom} />
      ))}
    </div>
  );
};

export default ClassroomsGrid;
