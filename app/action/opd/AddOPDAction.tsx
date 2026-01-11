"use server"
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function AddOPDAction(formData: FormData) {
    const OPDNo = formData.get("OPDNo") as string;
    const OPDDateTimeString = formData.get("OPDDateTime") as string;
    const OPDDateTime = new Date(OPDDateTimeString);
    const PatientID = Number(formData.get("PatientID"));
    const IsFollowUpCase = true;
    const TreatedByDoctorID = Number(formData.get("TreatedByDoctorID"));
    const RegistrationFee = Number(formData.get("RegistrationFee"));
    const Description = formData.get("Description") as string;
    const OLDOPDNo = formData.get("OLDOPDNo") as string;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/");
    }

    const user: any = verifyToken(token);

    if (!PatientID || isNaN(PatientID)) {
        throw new Error("Invalid Patient ID");
    }

    if (!TreatedByDoctorID || isNaN(TreatedByDoctorID)) {
        throw new Error("Invalid Treated By Doctor ID");
    }

    const data = {
        OPDNo,
        OPDDateTime,
        PatientID,
        IsFollowUpCase,
        TreatedByDoctorID,
        RegistrationFee,
        Description,
        OLDOPDNo,
        UserID: user.id,
        Created: new Date(),
        Modified: new Date()
    };

    await prisma.mst_opd.create({ data });
    revalidatePath("/admin/opd");
    redirect("/admin/opd")
}
export { AddOPDAction }
