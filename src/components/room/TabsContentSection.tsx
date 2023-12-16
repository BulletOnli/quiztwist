"use client";

import { useSearchParams } from "next/navigation";
import ClassworkTab from "./tabs/ClassworkTab";
import PeopleTab from "./tabs/PeopleTab";
import SettingsTab from "./tabs/SettingsTab";

const TabsContentSection = () => {
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab");

    if (tab === "people") {
        return <PeopleTab />;
    } else if (tab === "settings") {
        return <SettingsTab />;
    } else {
        return <ClassworkTab />;
    }
};

export default TabsContentSection;
