"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function EditDoctorAction(formData: FormData) {
    const id = Number(formData.get("id"));
    const DoctorName = formData.get("DoctorName") as string;
    const HospitalID = Number(formData.get("HospitalID"));

    if (!HospitalID || isNaN(HospitalID)) {
        throw new Error("Invalid Hospital ID");
    }

    const Description = formData.get("Description") as string;

    await prisma.mst_doctor.update({
        where: {
            DoctorID: id,
        },
        data: {
            DoctorName,
            HospitalID,
            Description,
            Modified: new Date(),
        },
    });
    revalidatePath("/admin/doctor");
    redirect("/admin/doctor");
}
export { EditDoctorAction };
