import React from 'react'
import { prisma } from '@/lib/prisma';

export default async function DiagnosisTypeDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const diagnosisType = await prisma.mst_diagnosis_type.findUnique({
        where: {
            DiagnosisTypeID: Number(id),
        },
    });
    return (
        <>
            <div className="pagetitle">
                <h1>Diagnosis Type Detail<strong> {diagnosisType?.DiagnosisTypeName}</strong></h1>
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
                               <p><b>Diagnosis Type Name:</b> {diagnosisType?.DiagnosisTypeName}</p>
                               <p><b>Short Name:</b> {diagnosisType?.DiagnosisTypeShortName}</p>
                               <p><b>Hospital ID:</b> {diagnosisType?.HospitalID}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>

    )
}
