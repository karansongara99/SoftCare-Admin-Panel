"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

export default async function deleteDoctor(id: number) {
  await prisma.mst_doctor.delete({ where: { DoctorID: id } });
  revalidatePath("/admin/doctor");
  redirect("/admin/doctor");
}