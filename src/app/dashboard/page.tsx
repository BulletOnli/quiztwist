import ClassroomsGrid from "@/components/dashboard/ClassroomsGrid";
import DashboardButtons from "@/components/dashboard/DashboardButtons";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";
import authOptions from "@/utils/authOptions";

export const metadata: Metadata = {
    title: "Dashboard | QuizTwist",
    description: "Generated by create next app",
};

const DashboardPage = async () => {
    const session = await getServerSession(authOptions);

    return (
        <main className="w-full max-w-7xl flex flex-col">
            <div className="w-full flex justify-between items-center mt-10">
                <div>
                    <h1 className="font-bold text-2xl">My Classrooms</h1>
                    <p className="text-sm text-secondaryGray">
                        You can manage your classrooms below
                    </p>
                </div>

                <DashboardButtons user={session!.user} />
            </div>
            <ClassroomsGrid />
        </main>
    );
};

export default DashboardPage;
