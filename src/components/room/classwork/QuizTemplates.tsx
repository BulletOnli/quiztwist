const QuizTemplates = () => {
    return (
        <div className="flex items-center flex-wrap gap-4">
            <div className="flex flex-col gap-2">
                <div className="w-[8rem] h-[6rem] flex justify-center items-center border border-borderColor rounded-lg bg-secondary-gray">
                    <img src="/plus.png" alt="" />
                </div>
                <p className="text-sm">Blank test</p>
            </div>
            <div className="flex flex-col gap-2">
                <div className="w-[8rem] h-[6rem] flex justify-center items-center border border-borderColor rounded-lg bg-secondary-gray"></div>
                <p className="text-sm">Template 1</p>
            </div>
            <div className="flex flex-col gap-2">
                <div className="w-[8rem] h-[6rem] flex justify-center items-center border border-borderColor rounded-lg bg-secondary-gray"></div>
                <p className="text-sm">Template 2</p>
            </div>
            <div className="flex flex-col gap-2">
                <div className="w-[8rem] h-[6rem] flex justify-center items-center border border-borderColor rounded-lg bg-secondary-gray"></div>
                <p className="text-sm">Template 3</p>
            </div>
            <div className="flex flex-col gap-2">
                <div className="w-[8rem] h-[6rem] flex justify-center items-center border border-borderColor rounded-lg bg-secondary-gray"></div>
                <p className="text-sm">Template 4</p>
            </div>
        </div>
    );
};

export default QuizTemplates;