"use server"
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function AddHospitalAction(formData: FormData) {
    const HospitalName = formData.get("HospitalName") as string;
    const DefaultPaymentModeID = Number(formData.get("DefaultPaymentModeID"));
    const RegistrationCharge = Number(formData.get("RegistrationCharge"));
    const RegistrationValidityMonths = Number(formData.get("RegistrationValidityMonths"));
    const OpeningDate = new Date(formData.get("OpeningDate") as string);
    const OpeningPatientNo = Number(formData.get("OpeningPatientNo"));
    const OpeningOPDNo = Number(formData.get("OpeningOPDNo"));
    const OpeningReceiptNo = Number(formData.get("OpeningReceiptNo"));
    const Description = formData.get("Description") as string;
    const Address = formData.get("Address") as string;
    const IsRateEnableInReceipt = formData.get("IsRateEnableInReceipt") === "on";
    const IsRegistrationFeeEnableInOPD = formData.get("IsRegistrationFeeEnableInOPD") === "on";

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/");
    }

    const user: any = verifyToken(token);

    if (!DefaultPaymentModeID || isNaN(DefaultPaymentModeID)) {
        throw new Error("Invalid DefaultPaymentMode ID");
    }

    const data = {
        HospitalName,
        DefaultPaymentModeID,
        RegistrationCharge,
        RegistrationValidityMonths,
        OpeningDate,
        OpeningPatientNo,
        OpeningOPDNo,
        OpeningReceiptNo,
        Description,
        Address,
        IsRateEnableInReceipt,
        IsRegistrationFeeEnableInOPD,
        UserID: user.id,
        Created: new Date(),
        Modified: new Date()
    };

    await prisma.mst_hospital.create({ data });
    revalidatePath("/admin/hospital");
    redirect("/admin/hospital")
}
export { AddHospitalAction }
