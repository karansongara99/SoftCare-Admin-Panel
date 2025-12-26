"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

export default async function deleteOpdDiagnosisType(id: number) {
  await prisma.mst_opd_diagnosis_type.delete({ where: { OPDDiagnosisTypeID: id } });
  revalidatePath("/admin/opddiagnosistype");
  redirect("/admin/opddiagnosistype");
}