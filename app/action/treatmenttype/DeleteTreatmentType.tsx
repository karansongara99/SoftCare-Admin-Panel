"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

export default async function deleteTreatmentType(id: number) {
  await prisma.mst_treatment_type.delete({ where: { TreatmentTypeID: id } });
  revalidatePath("/admin/treatmenttype");
  redirect("/admin/treatmenttype");
}