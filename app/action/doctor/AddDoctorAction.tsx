"use server"
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function AddDoctorAction(formData: FormData) {
    const DoctorName = formData.get("DoctorName") as string;
    const HospitalID = Number(formData.get("HospitalID"));
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/");
    }

    const user: any = verifyToken(token);

    if (!HospitalID || isNaN(HospitalID)) {
        throw new Error("Invalid Hospital ID");
    }

    const Description = formData.get("Description") as string;

    const data = {
        DoctorName,
        HospitalID,
        Description,
        UserID: user.id,
        Created: new Date(),
        Modified: new Date()
    };

    await prisma.mst_doctor.create({ data });
    revalidatePath("/admin/doctor");
    redirect("/admin/doctor")
}
export { AddDoctorAction }
