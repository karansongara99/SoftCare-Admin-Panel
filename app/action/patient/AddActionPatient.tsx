"use server"
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function AddPatientAction(formData: FormData) {
    const PatientName = formData.get("PatientName") as string;
    const PatientNo = Number(formData.get("PatientNo"));
    const RegistrationDateTime = formData.get("RegistrationDateTime") as string;
    const Age = Number(formData.get("Age"));
    const BloodGroup = formData.get("BloodGroup") as string;
    const Gender = formData.get("Gender") as string;
    const Occupation = formData.get("Occupation") as string;
    const HospitalID = Number(formData.get("HospitalID"));
    const State = formData.get("State") as string;
    const City = formData.get("City") as string;
    const PinCode = formData.get("PinCode") as string;
    const MobileNo = formData.get("MobileNo") as string;
    const ReferredBy = formData.get("ReferredBy") as string;
    const EmergencyContactNo = formData.get("EmergencyContactNo") as string;
    const Address = formData.get("Address") as string;
    const Description = formData.get("Description") as string;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/");
    }

    const user: any = verifyToken(token);

    if (!HospitalID || isNaN(HospitalID)) {
        throw new Error("Invalid Hospital ID");
    }

    const data = {
        PatientName,
        PatientNo,
        RegistrationDateTime: new Date(RegistrationDateTime),
        Age,
        BloodGroup,
        Gender,
        Occupation,
        HospitalID,
        State,
        City,
        PinCode,
        MobileNo,
        ReferredBy,
        EmergencyContactNo,
        Address,
        Description,
        UserID: user.id,
        Created: new Date(),
        Modified: new Date()
    };

    await prisma.mst_patient.create({ data });
    revalidatePath("/admin/patient");
    redirect("/admin/patient")
}
export { AddPatientAction }
