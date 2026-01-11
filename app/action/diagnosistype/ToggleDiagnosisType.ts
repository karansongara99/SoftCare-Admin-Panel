"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function toggleDiagnosisType(id: number) {
    const current = await prisma.mst_diagnosis_type.findUnique({
        where: { DiagnosisTypeID: id },
        select: { IsActive: true }
    });

    if (!current) return;

    await prisma.mst_diagnosis_type.update({
        where: { DiagnosisTypeID: id },
        data: {
            IsActive: !current.IsActive
        }
    });

    revalidatePath("/admin/diagnosistype");
}
