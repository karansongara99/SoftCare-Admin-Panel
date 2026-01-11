"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function EditOpdDiagnosisTypeAction(formData: FormData) {
    const id = Number(formData.get("id"));
    const OPDID = Number(formData.get("OPDID"));
    const DiagnosisTypeID = Number(formData.get("DiagnosisTypeID"));
    const Description = formData.get("Description") as string;

    if (!OPDID || isNaN(OPDID)) {
        throw new Error("Invalid OPD ID");
    }

    if (!DiagnosisTypeID || isNaN(DiagnosisTypeID)) {
        throw new Error("Invalid Diagnosis Type ID");
    }

    await prisma.mst_opd_diagnosis_type.update({
        where: {
            OPDDiagnosisTypeID: id,
        },
        data: {
            OPDID,
            DiagnosisTypeID,
            Description,
            Modified: new Date(),
        },
    });
    revalidatePath("/admin/opddiagnosistype");
    redirect("/admin/opddiagnosistype");
}
export { EditOpdDiagnosisTypeAction };
