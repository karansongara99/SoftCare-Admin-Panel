import React from 'react'
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteBtn from '@/app/ui/DeleteButton';
import deleteHospital from '@/app/action/hospital/DeleteHospital';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

const HospitalList = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) redirect("/");

    const user: any = verifyToken(token);

    if (!user) {
        redirect("/");
    }

    const hospital = await prisma.mst_hospital.findMany({
        where: {
            UserID: user.id
        }
    });

    return (
        <>
            <div className="pagetitle">
                <h1>Hospital Tables</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">Hospital</li>
                        <li className="breadcrumb-item active">Hospital List</li>
                    </ol>
                </nav>
            </div>
            {/* Page Content */}
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title mb-4">Search Hospital</h4>
                                <form>
                                    <div className="row align-items-end">
                                        {/* Hospital Name */}
                                        <div className="col-md-4">
                                            <label className="form-label">Hospital Name</label>
                                            <input type="text" className="form-control" />
                                        </div>

                                        {/* Registration Charge */}
                                        <div className="col-md-4">
                                            <label className="form-label">Registration Charge</label>
                                            <input type="text" className="form-control" />
                                        </div>

                                        {/* Registration Validity Months */}
                                        <div className="col-md-4">
                                            <label className="form-label">Opening Date</label>
                                            <input type="date" className="form-control" />
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
                                        Hospital List
                                    </h4>

                                    <button className="btn btn-info btn-md">
                                        <Link href="/admin/hospital/add">
                                            <i className="bi bi-plus-circle me-1"></i>
                                            Add Hospital
                                        </Link>
                                    </button>
                                </div>

                                {/* Doctor Table */}
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>#</th>
                                                <th>Hospital Name</th>
                                                <th>Registration Charge</th>
                                                <th>Validity (Months)</th>
                                                <th>Opening Date</th>
                                                <th>Opening Patient No</th>
                                                <th>Created</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {hospital.map((doc: any, index: number) => (
                                                <tr key={doc.HospitalID}>
                                                    <td>{index + 1}</td>
                                                    <td>{doc.HospitalName ?? "-"}</td>
                                                    <td>{doc.RegistrationCharge?.toFixed(2) ?? "-"}</td>
                                                    <td>{doc.RegistrationValidityMonths ?? "-"}</td>
                                                    <td>{doc.OpeningDate ? new Date(doc.OpeningDate).toLocaleDateString() : "-"}</td>
                                                    <td>{doc.OpeningPatientNo ?? "-"}</td>
                                                    <td>{doc.Created ? new Date(doc.Created).toLocaleDateString() : "-"}</td>
                                                    <td className="d-flex gap-2">
                                                        <Link
                                                            href={`/admin/hospital/edit/${doc.HospitalID}`}
                                                            className="btn btn-primary btn-sm"
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </Link>
                                                        <DeleteBtn deleteFn={deleteHospital} id={doc.HospitalID} />
                                                        <Link
                                                            href={`/admin/hospital/${doc.HospitalID}`}
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

export default HospitalList