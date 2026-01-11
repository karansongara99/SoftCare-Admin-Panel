"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function EditTreatmentTypeAction(formData: FormData) {
    const id = Number(formData.get("id"));
    const TreatmentTypeName = formData.get("TreatmentTypeName") as string;
    const TreatmentTypeShortName = formData.get("TreatmentTypeShortName") as string;
    const HospitalID = Number(formData.get("HospitalID"));
    const Description = formData.get("Description") as string;

    if (!HospitalID || isNaN(HospitalID)) {
        throw new Error("Invalid Hospital ID");
    }

    await prisma.mst_treatment_type.update({
        where: {
            TreatmentTypeID: id,
        },
        data: {
            Description,
            HospitalID,
            TreatmentTypeShortName,
            TreatmentTypeName,
            Modified: new Date(),
        },
    });
    revalidatePath("/admin/treatmenttype");
    redirect("/admin/treatmenttype");
}
export { EditTreatmentTypeAction };
