"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const OnboardingformButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button className="w-full" type="submit" disabled={pending}>
            {pending ? "Saving..." : "Save Changes"}
        </Button>
    );
};

export default OnboardingformButton;
