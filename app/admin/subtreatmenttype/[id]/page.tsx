import React from 'react'
import { prisma } from '@/lib/prisma';

export default async function SubTreatmentTypeDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const subTreatmentType = await prisma.mst_sub_treatment_type.findUnique({
        where: {
            SubTreatmentTypeID: Number(id),
        },
    });
    return (
        <>
            <div className="pagetitle">
                <h1>Sub Treatment Type Detail<strong> {subTreatmentType?.SubTreatmentTypeName}</strong></h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">Sub Treatment Type</li>
                        <li className="breadcrumb-item active">Sub Treatment Type Details</li>
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
                               <p><b>Sub Treatment Type Name:</b> {subTreatmentType?.SubTreatmentTypeName}</p>
                               <p><b>Treatment Type ID:</b> {subTreatmentType?.TreatmentTypeID}</p>
                               <p><b>Is Active:</b> {subTreatmentType?.IsActive}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>

    )
}
