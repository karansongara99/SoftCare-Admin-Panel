"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function EditHospitalAction(formData: FormData) {
    const id = Number(formData.get("id"));
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

    await prisma.mst_hospital.update({
        where: {
            HospitalID: id,
        },
        data: {
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
            Modified: new Date(),
        },
    });
    revalidatePath("/admin/hospital");
    redirect("/admin/hospital");
}
export { EditHospitalAction };
