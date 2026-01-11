// app/admin/receipt/receiptbill/[id]/page.tsx
import React from 'react'
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from "@/lib/auth";
import ReceiptPrint from '@/app/components/ReceiptPrint';

export default async function ReceiptBill({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/");
    }

    const user: any = verifyToken(token);

    if (!user) {
        redirect("/");
    }

    // Fetch receipt data
    const receipt = await prisma.mst_receipt.findUnique({
        where: {
            ReceiptID: Number(id)
        }
    });

    if (!receipt) {
        redirect("/admin/receipt");
    }

    return <ReceiptPrint receipt={receipt} />;
}