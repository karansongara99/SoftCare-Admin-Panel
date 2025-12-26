import React from 'react'
import { prisma } from '@/lib/prisma';

export default async function TreatmentTypeDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const treatmentType = await prisma.mst_treatment_type.findUnique({
        where: {
            TreatmentTypeID: Number(id),
        },
    });
    return (
        <>
            <div className="pagetitle">
                <h1>Treatment Type Detail<strong> {treatmentType?.TreatmentTypeName}</strong></h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">Patient</li>
                        <li className="breadcrumb-item active">Patient Details</li>
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
                               <p><b>Treatment Type Name:</b> {treatmentType?.TreatmentTypeName}</p>
                               <p><b>Short Name:</b> {treatmentType?.TreatmentTypeShortName}</p>
                               <p><b>Hospital ID:</b> {treatmentType?.HospitalID}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>

    )
}
