"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

export default async function deletePatient(id: number) {
  await prisma.mst_patient.delete({ where: { PatientID: id } });
  revalidatePath("/admin/patient");
  redirect("/admin/patient");
}