import React from 'react'
import { prisma } from '../../../lib/prisma';
import Link from 'next/link';
import DeleteBtn from '@/app/ui/DeleteButton';
import deleteDiagnosisType from '@/app/action/diagnosistype/DeleteDiagnosisType';
import ToggleActiveButton from "@/app/ui/ToggleActiveButton";
import toggleDiagnosisType from "@/app/action/diagnosistype/ToggleDiagnosisType";


import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

export default async function DiagnosisTypeList() {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/");
    }

    const user: any = verifyToken(token);

    if (!user) {
        redirect("/");
    }

    const diagnosisType = await prisma.mst_diagnosis_type.findMany({
        where: {
            UserID: user.id
        }
    });

    return (
        <>
            <div className="pagetitle">
                <h1>Diagnosis Type Tables</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">Diagnosis Type</li>
                        <li className="breadcrumb-item active">Diagnosis Type List</li>
                    </ol>
                </nav>
            </div>
            {/* Page Content */}
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title mb-4">Search Diagnosis Type</h4>
                                <form>
                                    <div className="row align-items-end">
                                        {/* Diagnosis Type Name */}
                                        <div className="col-md-4">
                                            <label className="form-label">Diagnosis Type Name</label>
                                            <input type="text" className="form-control" />
                                        </div>

                                        {/* Short Name */}
                                        <div className="col-md-4">
                                            <label className="form-label">Short Name</label>
                                            <input type="text" className="form-control" />
                                        </div>

                                        {/* Active */}
                                        <div className="col-md-4">
                                            <label className="form-label">Hospital Name</label>
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
                                        Diagnosis Type List
                                    </h4>

                                    <button className="btn btn-info btn-md">
                                        <Link href="/admin/diagnosistype/add">
                                            <i className="bi bi-plus-circle me-1"></i>
                                            Add Diagnosis Type
                                        </Link>
                                    </button>
                                </div>

                                {/* Diagnosis Type Table */}
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>#</th>
                                                <th>Diagnosis Type Name</th>
                                                <th>Short Name</th>
                                                <th>Active</th>
                                                <th>Hospital ID</th>
                                                <th>Created</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {diagnosisType.map((doc: any, index: number) => (
                                                <tr key={doc.DiagnosisTypeID}>
                                                    <td>{index + 1}</td>
                                                    <td>{doc.DiagnosisTypeName ?? "-"}</td>
                                                    <td>{doc.DiagnosisTypeShortName ?? "-"}</td>
                                                    <td className={`${doc.IsActive ? "text-success fw-bold" : "text-danger fw-bold"}`}>{doc.IsActive ? "Active" : "Inactive"}</td>
                                                    <td>{doc.HospitalID}</td>
                                                    <td>{doc.Created ? new Date(doc.Created).toLocaleDateString() : "-"}</td>
                                                    <td className="d-flex gap-2">
                                                        <Link
                                                            href={`/admin/diagnosistype/edit/${doc.DiagnosisTypeID}`}
                                                            className="btn btn-primary btn-sm"
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </Link>
                                                        <DeleteBtn deleteFn={deleteDiagnosisType} id={doc.DiagnosisTypeID} />
                                                        {/* Soft Delete / Restore */}
                                                        <ToggleActiveButton
                                                            id={doc.DiagnosisTypeID}
                                                            isActive={doc.IsActive}
                                                            toggleFn={toggleDiagnosisType}
                                                        />
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

