"use client";
import Loading from "@/app/(root)/loading";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

type CheckRoleProviderProps = {
    children: React.ReactNode;
};

const CheckRoleProvider = ({ children }: CheckRoleProviderProps) => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const pathname = usePathname();

    const role = session?.user.role;

    useEffect(() => {
        if (pathname !== "/") {
            // If there is a session but there is no role, push the user to the onboarding page
            if (session && !role) {
                router.push("/onboarding");
                return;
            }

            // Prevents user from accessing the routes that is not eligible for their role
            if (
                role?.toLowerCase() === "student" &&
                !pathname.startsWith("/s")
            ) {
                router.push("/s/dashboard");
                return;
            } else if (
                role?.toLowerCase() === "teacher" &&
                pathname.startsWith("/s")
            ) {
                router.push("/dashboard");
                return;
            }
        }
    }, [session]);

    // Prevent the flashing of contents
    if (pathname !== "/") {
        //todo FIX THE FLASHING OF CONTENTS WHEN THERE IS NO ROLE

        if (role?.toLowerCase() === "student" && !pathname.startsWith("/s")) {
            return <Loading />;
        } else if (
            role?.toLowerCase() === "teacher" &&
            pathname.startsWith("/s")
        ) {
            return <Loading />;
        }
    }

    return children;
};

export default CheckRoleProvider;
