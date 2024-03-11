"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateClassroomAction } from "@/lib/actions/classroom.actions";
import { toast } from "sonner";
import { ClassroomType } from "@/lib/models/classroom.model";
import SubmitBtn from "@/components/shared/SubmitBtn";

type UpdateClassroomFormProps = {
  roomId: string;
  classroomData: string;
};
const UpdateClassroomForm = ({
  roomId,
  classroomData,
}: UpdateClassroomFormProps) => {
  const data = JSON.parse(classroomData) as ClassroomType;

  const handleUpdateClassroomAction = async (formData: FormData) => {
    const response = await updateClassroomAction(formData, roomId);

    if (response?.error) {
      return toast.error(response.error);
    }

    toast.success(response.message);
  };

  return (
    <form action={handleUpdateClassroomAction} className="flex flex-col gap-2">
      <div>
        <Label>Subject:</Label>
        <Input
          name="subject"
          placeholder="Enter a Subject"
          defaultValue={data?.subject}
        />
      </div>
      <div>
        <Label>Description:</Label>
        <Input
          name="description"
          placeholder="Enter a Description"
          defaultValue={data?.description}
        />
      </div>
      <div>
        <Label>Section:</Label>
        <Input
          name="section"
          placeholder="Enter a Section"
          defaultValue={data?.section}
        />
      </div>
      <SubmitBtn defaultName="Save Changes" onLoadingName="Saving..." />
    </form>
  );
};

export default UpdateClassroomForm;
