"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

export default async function deleteSubTreatmentType(id: number) {
  await prisma.mst_sub_treatment_type.delete({ where: { SubTreatmentTypeID: id } });
  revalidatePath("/admin/subtreatmenttype");
  redirect("/admin/subtreatmenttype");
}