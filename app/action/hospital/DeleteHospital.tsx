"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

export default async function deleteHospital(id: number) {
  await prisma.mst_hospital.delete({ where: { HospitalID: id } });
  revalidatePath("/admin/hospital");
  redirect("/admin/hospital");
}