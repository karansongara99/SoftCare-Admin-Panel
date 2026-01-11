"use server"
import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function EditDiagnosisTypeAction(formData: FormData) {
    const id = Number(formData.get("id"));
    const DiagnosisTypeName = formData.get("DiagnosisTypeName") as string;
    const DiagnosisTypeShortName = formData.get("DiagnosisTypeShortName") as string;
    const IsActive = formData.get("IsActive") === "true";
    const HospitalID = Number(formData.get("HospitalID"));

    if (!HospitalID || isNaN(HospitalID)) {
        throw new Error("Invalid Hospital ID");
    }

    const Description = formData.get("Description") as string;

    await prisma.mst_diagnosis_type.update({
        where: {
            DiagnosisTypeID: id,
        },
        data: {
            DiagnosisTypeName,
            DiagnosisTypeShortName,
            IsActive,
            HospitalID,
            Description,
            Modified: new Date(),
        },
    });
    revalidatePath("/admin/diagnosistype");
    redirect("/admin/diagnosistype");
}
export { EditDiagnosisTypeAction };
