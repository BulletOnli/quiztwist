import ClassroomsGrid from "@/components/dashboard/ClassroomsGrid";
import DashboardButtons from "@/components/dashboard/DashboardButtons";

const DashboardPage = () => {
    return (
        <div className="w-full max-w-7xl flex flex-col">
            <div className="w-full flex justify-between items-center mt-10">
                <div>
                    <h1 className="font-bold text-2xl">My Classrooms</h1>
                    <p className="text-sm text-secondaryGray">
                        You can manage your classrooms below
                    </p>
                </div>

                <DashboardButtons />
            </div>
            <ClassroomsGrid />
        </div>
    );
};

export default DashboardPage;
