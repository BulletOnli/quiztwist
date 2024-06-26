"use client";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import teacherIcon from "/public/teacherIcon.png";
import studentIcon from "/public/studentIcon.png";
import { onboardingAction } from "@/lib/actions/user.actions";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import SubmitBtn from "@/components/shared/SubmitBtn";
import { joinClassroomAction } from "@/lib/actions/classroom.actions";

const Onboardingform = () => {
  const { data } = useSession();

  const formAction = async (formData: FormData) => {
    const result = await onboardingAction(formData);
    const isStudent = formData.get("role") === "Student";

    // Add the student to the public classroom
    if (isStudent) {
      const newFormData = new FormData();
      newFormData.append("classCode", "403d7");
      await joinClassroomAction(newFormData);
    }

    if (result?.error) {
      return toast.error(result.error);
    }

    toast.success("Profile updated");
  };

  return (
    <form
      action={formAction}
      className="w-[27rem] p-6 flex flex-col items-center border border-borderColor rounded-lg"
    >
      <h2 className="text-lg font-semibold">Setup your account</h2>
      <p className="text-sm mb-6">Please complete your account</p>

      <p className="font-medium">Choose your role</p>
      <RadioGroup
        name="role"
        defaultValue="Student"
        className="flex items-center gap-4 mt-2 mb-6"
      >
        <div className="flex flex-col items-center gap-2">
          <Label
            htmlFor="TeacherRadio"
            className="w-[5rem] flex flex-col items-center justify-center gap-1 p-2 border border-borderColor rounded cursor-pointer"
          >
            <Image src={teacherIcon} alt="Teacher icon" />
            <p className="text-xs">Teacher</p>
          </Label>
          <RadioGroupItem value="Teacher" id="TeacherRadio" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Label
            htmlFor="StudentRadio"
            className="w-[5rem] flex flex-col items-center justify-center gap-1 p-2 border border-borderColor rounded cursor-pointer"
          >
            <Image src={studentIcon} alt="Student icon" />
            <p className="text-xs">Student</p>
          </Label>
          <RadioGroupItem value="Student" id="StudentRadio" />
        </div>
      </RadioGroup>

      <div className="w-full flex flex-col gap-2 mb-3">
        <Label htmlFor="firstName">First name</Label>
        <Input
          id="firstName"
          name="firstName"
          placeholder="Enter your first name"
          minLength={3}
          required
        />
      </div>
      <div className="w-full flex flex-col gap-2 mb-3">
        <Label htmlFor="lastName">Last name</Label>
        <Input
          id="lastName"
          name="lastName"
          placeholder="Enter your last name"
          minLength={3}
          required
        />
      </div>
      <div className="w-full flex flex-col gap-2 mb-3">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          defaultValue={data?.user.name}
          disabled
        />
      </div>
      <div className="w-full flex flex-col gap-2 mb-6">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          defaultValue={data?.user.email}
          disabled
        />
      </div>

      <SubmitBtn
        className="w-full"
        defaultName="Save Changes"
        onLoadingName="Saving..."
      />
    </form>
  );
};

export default Onboardingform;
