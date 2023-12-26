"use client";
import { MoreVertical } from "lucide-react";
import { Button } from "../../ui/button";
import { usePathname } from "next/navigation";

const Classcode = () => {
    // The last 5 digits in the room id
    const roomId = usePathname().split("/")[2];
    const classCode = extractClassCode(roomId);

    return (
        <div className="w-[14rem] min-h-[7rem] p-3 flex flex-col gap-2 border border-borderColor bg-secondary-gray rounded-lg">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Class code</p>
                <Button size="xs" variant="secondary" className="p-0">
                    <MoreVertical className="w-5" />
                </Button>
            </div>
            <div className="w-full h-full flex justify-center items-center">
                <p className="font-semibold text-xl text-secondary-grayText">
                    {classCode}
                </p>
            </div>
        </div>
    );
};

export const extractClassCode = (id: string) => {
    return id.slice(-5);
};

export default Classcode;
