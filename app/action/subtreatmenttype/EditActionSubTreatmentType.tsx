"use server"
import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


async function EditSubTreatmentTypeAction(formData: FormData) {
    const id = Number(formData.get("id"));
    const SubTreatmentTypeName = formData.get("SubTreatmentTypeName") as string;
    const TreatmentTypeID = Number(formData.get("TreatmentTypeID"));
    const Rate = Number(formData.get("Rate"));
    const Description = formData.get("Description") as string;
    const IsActive = formData.get("IsActive") === "true";
    const AccountID = Number(formData.get("AccountID"));

    if (!TreatmentTypeID || isNaN(TreatmentTypeID)) {
        throw new Error("Invalid Treatment Type ID");
    }

    await prisma.mst_sub_treatment_type.update({
        where: {
            SubTreatmentTypeID: id,
        },
        data: {
            SubTreatmentTypeName,
            TreatmentTypeID,
            Rate,
            IsActive,
            Description,
            AccountID,
            Modified: new Date(),
        },
    });
    revalidatePath("/admin/subtreatmenttype");
    redirect("/admin/subtreatmenttype");
}
export { EditSubTreatmentTypeAction };
