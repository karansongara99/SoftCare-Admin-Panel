import React from 'react'
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from "@/lib/auth";

export default async function ReceiptDetail({ params }: { params: Promise<{ id: string }> }) {
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

    const receipt = await prisma.mst_receipt.findUnique({
        where: {
            ReceiptID: Number(id),
        },
    });

    if (!receipt) {
        return (
            <div className="pagetitle">
                <h1>Receipt Detail</h1>
                <div className="alert alert-danger">Receipt not found.</div>
            </div>
        )
    }


    return (
        <>
            <div className="pagetitle">
                <h1>Receipt Detail<strong>  {receipt.ReceiptNo}</strong></h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link href="/admin/dashboard">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link href="/admin/receipt">Receipt</Link>
                        </li>
                        <li className="breadcrumb-item active">Receipt Details</li>
                    </ol>
                </nav>
            </div>
            {/* Page Content */}
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Receipt Information</h5>
                                <div className="row">
                                    <div className="col-6">
                                        <p><b>Receipt No:</b> {receipt.ReceiptNo}</p>
                                        <p><b>Receipt Date:</b> {new Date(receipt.ReceiptDate).toLocaleDateString()}</p>
                                        <p><b>OPD ID:</b> {receipt.OPDID}</p>
                                        <p><b>Amount Paid:</b> {Number(receipt.AmountPaid).toFixed(2)}</p>
                                    </div>
                                    <div className="col-6">
                                        <p><b>Payment Mode:</b> {receipt.PaymentMode}</p>
                                        <p><b>Reference No:</b> {receipt.ReferenceNo || '-'}</p>
                                        <p><b>Reference Date:</b> {receipt.ReferenceDate ? new Date(receipt.ReferenceDate).toLocaleDateString() : '-'}</p>
                                        <p><b>Description:</b> {receipt.Description || '-'}</p>
                                    </div>
                                    {receipt.CancellationDateTime && (
                                        <>
                                            <hr />
                                            <h5 className="card-title text-danger p-2 m-1">Cancellation Details</h5>
                                            <p><b>Cancellation Date:</b> {new Date(receipt.CancellationDateTime).toLocaleString()}</p>
                                            <p><b>Remarks:</b> {receipt.CancellationRemarks}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
