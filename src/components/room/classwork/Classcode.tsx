"use client";
import { Copy } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const Classcode = ({ roomId }: { roomId: string }) => {
    // The last 5 digits in the r id
    const classCode = roomId.slice(-5);

    const copyCode = () => {
        navigator.clipboard
            .writeText(classCode)
            .then(() => toast.info("Class code copied"))
            .catch((err) => toast.error("Failed to copy:", err));
    };

    return (
        <div className="w-[14rem] min-h-[7rem] p-3 flex flex-col gap-2 border border-borderColor bg-secondary-gray rounded-lg">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Class code</p>

                <Copy className="w-4 cursor-pointer" onClick={copyCode} />
            </div>
            <div className="w-full h-full flex justify-center items-center">
                <p className="font-semibold text-xl text-secondary-grayText">
                    {classCode}
                </p>
            </div>
        </div>
    );
};

export default Classcode;
