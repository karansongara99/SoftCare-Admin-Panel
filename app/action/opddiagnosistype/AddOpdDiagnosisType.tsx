"use server"
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function AddOpdDiagnosisTypeAction(formData: FormData) {
    const OPDID = Number(formData.get("OPDID"));
    const DiagnosisTypeID = Number(formData.get("DiagnosisTypeID"));
    const Description = formData.get("Description") as string;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/");
    }

    const user: any = verifyToken(token);

    if (!OPDID || isNaN(Number(OPDID))) {
        throw new Error("Invalid OPD ID");
    }

    if (!DiagnosisTypeID || isNaN(Number(DiagnosisTypeID))) {
        throw new Error("Invalid Diagnosis Type ID");
    }


    const data = {
        OPDID,
        DiagnosisTypeID,
        Description,
        UserID: user.id,
        Created: new Date(),
        Modified: new Date()
    };

    await prisma.mst_opd_diagnosis_type.create({ data });
    revalidatePath("/admin/opddiagnosistype");
    redirect("/admin/opddiagnosistype")
}
export { AddOpdDiagnosisTypeAction }
