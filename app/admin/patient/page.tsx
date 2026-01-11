import React from 'react'
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteBtn from '@/app/ui/DeleteButton';
import deletePatient from '@/app/action/patient/DeletePatient';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";


export default async function PatientList() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/");
    }

    const user: any = verifyToken(token);

    if (!user) {
        redirect("/");
    }

    const patient = await prisma.mst_patient.findMany({
        where: {
            UserID: user.id
        }
    });
    return (
        <>
            <div className="pagetitle">
                <h1>Patient Tables</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">Patient</li>
                        <li className="breadcrumb-item active">Patient List</li>
                    </ol>
                </nav>
            </div>
            {/* Page Content */}
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title mb-4">Search Patient</h4>
                                <form>
                                    <div className="row align-items-end">
                                        {/* Hospital Name */}
                                        <div className="col-md-4">
                                            <label className="form-label">Patient Name</label>
                                            <input type="text" className="form-control" />
                                        </div>

                                        {/* Registration Charge */}
                                        <div className="col-md-4">
                                            <label className="form-label">Mobile No</label>
                                            <input type="text" className="form-control" />
                                        </div>

                                        {/* Registration Validity Months */}
                                        <div className="col-md-4">
                                            <label className="form-label">Blood Group</label>
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
            {/* Page Content */}
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">

                                {/* Title & Button Row */}
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h4 className="card-title">
                                        Patient List
                                    </h4>

                                    <button className="btn btn-info btn-md">
                                        <Link href="/admin/patient/add"><i className="bi bi-plus-circle me-1"></i>
                                            Add Patient</Link>
                                    </button>
                                </div>

                                {/* Doctor Table */}
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>#</th>
                                                <th>Patient No</th>
                                                <th>Patient Name</th>
                                                <th>Blood Group</th>
                                                <th>Mobile No</th>
                                                <th>Address</th>
                                                <th>Hospital ID</th>
                                                <th>Created</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {patient.map((doc: any, index: number) => (
                                                <tr key={doc.PatientID}>
                                                    <td>{index + 1}</td>
                                                    <td>{doc.PatientNo ?? "-"}</td>
                                                    <td>{doc.PatientName}</td>
                                                    <td>{doc.BloodGroup ?? "-"}</td>
                                                    <td>{doc.MobileNo}</td>
                                                    <td>{doc.Address ?? "-"}</td>
                                                    <td>{doc.mst_hospital?.HospitalName ?? "-"}</td>
                                                    <td>{doc.Created ? new Date(doc.Created).toLocaleDateString() : "-"}</td>
                                                    <td className="d-flex gap-2">
                                                        <Link
                                                            href={`/admin/patient/edit/${doc.PatientID}`}
                                                            className="btn btn-primary btn-sm"
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </Link>                                                        <DeleteBtn id={doc.PatientID} deleteFn={deletePatient} />
                                                        <Link
                                                            href={`/admin/patient/${doc.PatientID}`}
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
                                {/* End Doctor Table */}

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>

    )
}