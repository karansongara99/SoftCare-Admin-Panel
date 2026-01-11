"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function EditPatientAction(formData: FormData) {
    const id = Number(formData.get("id"));
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


    if (!HospitalID || isNaN(HospitalID)) {
        throw new Error("Invalid Hospital ID");
    }

    await prisma.mst_patient.update({
        where: {
            PatientID: id,
        },
        data: {
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
            Modified: new Date(),
        },
    });
    revalidatePath("/admin/patient");
    redirect("/admin/patient");
}
export { EditPatientAction };
