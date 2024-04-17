import * as XLSX from "xlsx";
import { type NextRequest } from "next/server";
import connectToDB from "@/lib/mongoose";
import Classroom from "@/lib/models/classroom.model";

export async function GET(
  req: NextRequest,
  { params }: { params: { roomId: string } }
) {
  try {
    await connectToDB();

    const classroom = await Classroom.findById(params.roomId)
      .select(["subject", "section", "students"])
      .populate({
        path: "students",
        select: { _id: 0, email: 1, username: 1, firstName: 1, lastName: 1 },
      });

    if (!classroom) throw new Error("Classroom not found!");

    const worksheet = XLSX.utils.json_to_sheet(
      JSON.parse(JSON.stringify(classroom?.students))
    );

    const csv = XLSX.utils.sheet_to_csv(worksheet, {
      forceQuotes: true,
    });

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename=${classroom?.section}_${classroom?.subject}_STUDENTS.csv`,
        "Content-Type": "text/csv",
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, {
        status: 400,
      });
    }
  }
}
