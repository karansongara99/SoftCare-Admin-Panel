import React from 'react'
import { prisma } from '@/lib/prisma';

export default async function OPDDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const opd = await prisma.mst_opd.findUnique({
        where: {
            OPDID: Number(id),
        },
    });
    return (
        <>
        
            <div className="pagetitle">
                <h1>OPD Detail<strong> {opd?.OPDNo}</strong></h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">OPD</li>
                        <li className="breadcrumb-item active">OPD Details</li>
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
                               <p><b>OPD No:</b> {opd?.OPDNo}</p>
                               <p><b>Patient ID:</b> {opd?.PatientID}</p>
                               <p><b>Treated By (Doctor ID):</b> {opd?.TreatedByDoctorID}</p>
                               <p><b>Old OPD No:</b> {opd?.OLDOPDNo}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>

    )
}
