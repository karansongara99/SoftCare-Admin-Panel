"use server"
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function AddTreatmentTypeAction(formData: FormData) {
    const TreatmentTypeName = formData.get("TreatmentTypeName") as string;
    const TreatmentTypeShortName = formData.get("TreatmentTypeShortName") as string;
    const Description = formData.get("Description") as string;
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


    const data = {
        TreatmentTypeName,
        TreatmentTypeShortName,
        HospitalID,
        Description,
        UserID: user.id,
        Created: new Date(),
        Modified: new Date()
    };

    await prisma.mst_treatment_type.create({ data });
    revalidatePath("/admin/treatmenttype");
    redirect("/admin/treatmenttype")
}
export { AddTreatmentTypeAction }
