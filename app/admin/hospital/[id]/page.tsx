import React from 'react'
import { prisma } from '@/lib/prisma';

export default async function HospitalDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const hospital = await prisma.mst_hospital.findUnique({
        where: {
            HospitalID: Number(id),
        },
    });
    return (

        <>
            <div className="pagetitle">
                <h1>Hospital Details  <strong>{hospital?.HospitalName}</strong></h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">Hospital</li>
                        <li className="breadcrumb-item active">Hospital Details</li>
                    </ol>
                </nav>
            </div>
            {/* Page Content */}
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <br />
                                <p><b>DefaultPaymentModeID:</b> {hospital?.DefaultPaymentModeID}</p>
                                <p><b>OpeningOPDNo:</b> {hospital?.OpeningOPDNo}</p>
                                <p><b>OpeningReceiptNo:</b> {hospital?.OpeningReceiptNo}</p>
                                <p><b>Description:</b> {hospital?.Description}</p>
                                <p><b>Address:</b> {hospital?.Address}</p>
                                <p><b>IsRateEnableInReceipt:</b> {hospital?.IsRateEnableInReceipt ? "Yes" : "No"}</p>
                                <p><b>IsRegistrationFeeEnableInOPD:</b> {hospital?.IsRegistrationFeeEnableInOPD ? "Yes" : "No"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>

    )
}
