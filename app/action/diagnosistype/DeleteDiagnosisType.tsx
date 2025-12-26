"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

export default async function deleteDiagnosisType(id: number) {
  await prisma.mst_diagnosis_type.delete({ where: { DiagnosisTypeID: id } });
  revalidatePath("/admin/diagnosistype");
  redirect("/admin/diagnosistype");
}