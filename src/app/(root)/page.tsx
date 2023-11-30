import { getServerSession } from "next-auth";
import React from "react";

const LandingPage = async () => {
    // const session = await getServerSession();

    // console.log(session);

    return (
        <div className="w-full h-screen flex justify-center items-center text-3xl">
            LandingPage
        </div>
    );
};

export default LandingPage;
