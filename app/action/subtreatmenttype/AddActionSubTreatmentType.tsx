"use server"
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function AddSubTreatmentTypeAction(formData: FormData) {
    const SubTreatmentTypeName = formData.get("SubTreatmentTypeName") as string;
    const TreatmentTypeID = Number(formData.get("TreatmentTypeID"));
    const Rate = Number(formData.get("Rate"));
    const Description = formData.get("Description") as string;
    const AccountID = Number(formData.get("AccountID"));
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/");
    }

    const user: any = verifyToken(token);

    if (!TreatmentTypeID || isNaN(TreatmentTypeID)) {
        throw new Error("Invalid Treatment Type ID");
    }

    const data = {
        SubTreatmentTypeName,
        TreatmentTypeID,
        Rate,
        Description,
        IsActive: true,
        UserID: user.id,
        AccountID,
        Created: new Date(),
        Modified: new Date()
    };

    await prisma.mst_sub_treatment_type.create({ data });
    revalidatePath("/admin/subtreatmenttype");
    redirect("/admin/subtreatmenttype")
}
export { AddSubTreatmentTypeAction }
