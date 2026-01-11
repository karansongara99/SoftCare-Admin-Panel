import React from 'react'
import { prisma } from '@/lib/prisma';

export default async function PatientDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const patient = await prisma.mst_patient.findUnique({
        where: {
            PatientID: Number(id),
        },
    });
    return (
        <>
            <div className="pagetitle">
                <h1>Patient Detail<strong> {patient?.PatientName}</strong></h1>
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
                               <p><b>Patient Name:</b> {patient?.PatientName}</p>
                               <p><b>Emergency Contact No:</b> {patient?.EmergencyContactNo}</p>
                               <p><b>Gender:</b> {patient?.Gender}</p>
                               <p><b>Occupation:</b> {patient?.Occupation}</p>
                               <p><b>State:</b> {patient?.State}</p>
                               <p><b>City:</b> {patient?.City}</p>
                               <p><b>Mobile No:</b> {patient?.MobileNo}</p>
                               <p><b>Referred By:</b> {patient?.ReferredBy}</p>
                               <p><b>Description:</b> {patient?.Description}</p>
                               <p><b>Address:</b> {patient?.Address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>

    )
}
