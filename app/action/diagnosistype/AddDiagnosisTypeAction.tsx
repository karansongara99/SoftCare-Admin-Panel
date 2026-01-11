"use server"
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function AddDiagnosisTypeAction(formData: FormData) {
    const DiagnosisTypeName = formData.get("DiagnosisTypeName") as string;
    const DiagnosisTypeShortName = formData.get("DiagnosisTypeShortName") as string;
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
        DiagnosisTypeName,
        DiagnosisTypeShortName,
        IsActive: true,
        HospitalID,
        Description,
        UserID: user.id,
        Created: new Date(),
        Modified: new Date()
    };

    await prisma.mst_diagnosis_type.create({ data });
    revalidatePath("/admin/diagnosistype");
    redirect("/admin/diagnosistype")
}
export { AddDiagnosisTypeAction }
