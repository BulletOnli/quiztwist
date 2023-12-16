import { addStudent } from "@/lib/actions/sample.actions";

const OnBoardingForm = () => {
    return (
        <form action={addStudent}>
            <input type="text" />
        </form>
    );
};

export default OnBoardingForm;
