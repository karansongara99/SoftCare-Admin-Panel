"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

export default async function deleteOPD(id: number) {
  await prisma.mst_opd.delete({ where: { OPDID: id } });
  revalidatePath("/admin/opd");
  redirect("/admin/opd");
}