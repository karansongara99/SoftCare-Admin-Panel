"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function EditOPDAction(formData: FormData) {
    const id = Number(formData.get("id"));
    const OPDNo = formData.get("OPDNo") as string;
    const OPDDateTimeString = formData.get("OPDDateTime") as string;
    const OPDDateTime = new Date(OPDDateTimeString);
    const PatientID = Number(formData.get("PatientID"));
    const IsFollowUpCase = true;
    const TreatedByDoctorID = Number(formData.get("TreatedByDoctorID"));
    const RegistrationFee = Number(formData.get("RegistrationFee"));
    const Description = formData.get("Description") as string;
    const OLDOPDNo = formData.get("OLDOPDNo") as string;

    if (!PatientID || isNaN(PatientID)) {
        throw new Error("Invalid Patient ID");
    }

    if (!TreatedByDoctorID || isNaN(TreatedByDoctorID)) {
        throw new Error("Invalid Treated By Doctor ID");
    }

    await prisma.mst_opd.update({
        where: {
            OPDID: id,
        },
        data: {
            OPDNo,
            OPDDateTime,
            PatientID,
            IsFollowUpCase,
            TreatedByDoctorID,
            RegistrationFee,
            Description,
            OLDOPDNo,
            Modified: new Date(),
        },
    });
    revalidatePath("/admin/opd");
    redirect("/admin/opd");
}
export { EditOPDAction };
