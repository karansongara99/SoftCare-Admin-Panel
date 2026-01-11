import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteBtn from '@/app/ui/DeleteButton';
import deleteOPD from '@/app/action/opd/DeleteOPD';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

export default async function OPDList() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/");
    }

    const user: any = verifyToken(token);

    if (!user) {
        redirect("/");
    }

    const opdList = await prisma.mst_opd.findMany({
        where: {
            UserID: user.id
        }
    });
    return (
        <>
            <div className="pagetitle">
                <h1>OPD Tables</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link href="/admin">Home</Link>
                        </li>
                        <li className="breadcrumb-item">OPD</li>
                        <li className="breadcrumb-item active">OPD List</li>
                    </ol>
                </nav>
            </div>
            {/* Page Content */}
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title mb-4">Search OPD</h4>
                                <form>
                                    <div className="row align-items-end">
                                        {/* Hospital Name */}
                                        <div className="col-md-4">
                                            <label className="form-label">OPD No</label>
                                            <input type="text" className="form-control" />
                                        </div>

                                        {/* Registration Charge */}
                                        <div className="col-md-4">
                                            <label className="form-label">Patient Name</label>
                                            <input type="text" className="form-control" />
                                        </div>

                                        {/* Registration Validity Months */}
                                        <div className="col-md-4">
                                            <label className="form-label">Registration Fee</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    {/* Button */}
                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-primary">
                                            Search
                                        </button>
                                        <button type="reset" className="btn btn-secondary ms-2">
                                            Reset
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h4 className="card-title">OPD List</h4>

                                    <Link href="/admin/opd/add" className="btn btn-info btn-md">
                                        <i className="bi bi-plus-circle me-1"></i>
                                        Add OPD
                                    </Link>
                                </div>

                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>#</th>
                                                <th>OPD No</th>
                                                <th>OPD Date & Time</th>
                                                <th>Patient ID</th>
                                                <th>Treated By (Doctor ID)</th>
                                                <th>Registration Fee</th>
                                                <th>Old OPD No</th>
                                                <th>Created</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {opdList.map((doc: any, index: number) => (
                                                <tr key={doc.OPDID}>
                                                    <td>{index + 1}</td>
                                                    <td>{doc.OPDNo ?? '-'}</td>
                                                    <td>
                                                        {doc.OPDDateTime
                                                            ? new Date(doc.OPDDateTime).toLocaleString()
                                                            : '-'}
                                                    </td>
                                                    <td>{doc.PatientID ?? '-'}</td>
                                                    <td>{doc.TreatedByDoctorID ?? '-'}</td>
                                                    <td>
                                                        {doc.RegistrationFee
                                                            ? doc.RegistrationFee.toString()
                                                            : '-'}
                                                    </td>
                                                    <td>{doc.OLDOPDNo ?? '-'}</td>

                                                    <td>
                                                        {doc.Created
                                                            ? new Date(doc.Created).toLocaleDateString()
                                                            : '-'}
                                                    </td>
                                                    <td className="d-flex gap-2">
                                                        <Link
                                                            href={`/admin/opd/edit/${doc.OPDID}`}
                                                            className="btn btn-primary btn-sm"
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </Link>

                                                        <DeleteBtn deleteFn={deleteOPD} id={doc.OPDID} />

                                                        <Link
                                                            href={`/admin/opd/${doc.OPDID}`}
                                                            className="btn btn-success btn-sm"
                                                        >
                                                            <i className="bi bi-eye"></i>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
