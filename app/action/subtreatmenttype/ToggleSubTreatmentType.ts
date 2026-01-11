"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function toggleSubTreatmentType(id: number) {
    const current = await prisma.mst_sub_treatment_type.findUnique({
        where: { SubTreatmentTypeID: id },
        select: { IsActive: true }
    });

    if (!current) return;

    await prisma.mst_sub_treatment_type.update({
        where: { SubTreatmentTypeID: id },
        data: {
            IsActive: !current.IsActive
        }
    });

    revalidatePath("/admin/subtreatmenttype");
}
