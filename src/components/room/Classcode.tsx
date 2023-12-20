import { MoreVertical } from "lucide-react";
import { Button } from "../ui/button";

const Classcode = () => {
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
                    AbCdE
                </p>
            </div>
        </div>
    );
};

export default Classcode;
