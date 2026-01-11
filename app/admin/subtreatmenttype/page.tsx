import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteBtn from '@/app/ui/DeleteButton';
import deleteSubTreatmentType from '@/app/action/subtreatmenttype/DeleteSubTreatmentType';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

import ToggleActiveButton from '@/app/ui/ToggleActiveButton';
import toggleSubTreatmentType from '@/app/action/subtreatmenttype/ToggleSubTreatmentType';

export default async function SubTreatmentTypeList() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/");
  }

  const user: any = verifyToken(token);

  if (!user) {
    redirect("/");
  }

  const subTreatmentTypeList = await prisma.mst_sub_treatment_type.findMany({
    where: {
      UserID: user.id
    }
  });



  return (
    <>
      <div className="pagetitle">
        <h1>Sub Treatment Type Tables</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/admin">Home</Link>
            </li>
            <li className="breadcrumb-item">Sub Treatment Type</li>
            <li className="breadcrumb-item active">Sub Treatment Type List</li>
          </ol>
        </nav>
      </div>
      {/* Page Content */}
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-4">Search Sub Treatment Type</h4>
                <form>
                  <div className="row align-items-end">
                    {/* Hospital Name */}
                    <div className="col-md-4">
                      <label className="form-label">Sub Treatment Type Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    {/* Registration Validity Months */}
                    <div className="col-md-4">
                      <label className="form-label">Rate</label>
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
                  <h4 className="card-title">Sub Treatment Type List</h4>

                  <Link
                    href="/admin/subtreatmenttype/add"
                    className="btn btn-info btn-md"
                  >
                    <i className="bi bi-plus-circle me-1"></i>
                    Add Sub Treatment Type
                  </Link>
                </div>

                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Sub Treatment Type Name</th>
                        <th>Treatment Type ID</th>
                        <th>Rate</th>
                        <th>Is Active</th>
                        <th>Created</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {subTreatmentTypeList.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center">
                            No records found
                          </td>
                        </tr>
                      ) : (
                        subTreatmentTypeList.map((doc: any, index: number) => (
                          <tr key={doc.SubTreatmentTypeID}>
                            <td>{index + 1}</td>
                            <td>{doc.SubTreatmentTypeName ?? '-'}</td>
                            <td>{doc.TreatmentTypeID ?? '-'}</td>
                            <td>{doc.Rate ?? '-'}</td>
                            <td>
                              {doc.IsActive ? (
                                <span className="badge bg-success">Active</span>
                              ) : (
                                <span className="badge bg-danger">Inactive</span>
                              )}
                            </td>
                            <td>
                              {doc.Created
                                ? new Date(doc.Created).toLocaleDateString()
                                : '-'}
                            </td>
                            <td className="d-flex gap-2">
                              <Link
                                href={`/admin/subtreatmenttype/edit/${doc.SubTreatmentTypeID}`}
                                className="btn btn-primary btn-sm"
                              >
                                <i className="bi bi-pencil"></i>
                              </Link>

                              <DeleteBtn id={doc.SubTreatmentTypeID} deleteFn={deleteSubTreatmentType} />

                              <Link
                                href={`/admin/subtreatmenttype/${doc.SubTreatmentTypeID}`}
                                className="btn btn-success btn-sm"
                              >
                                <i className="bi bi-eye"></i>
                              </Link>
                              {/* Soft Delete / Restore */}
                              <ToggleActiveButton
                                id={doc.SubTreatmentTypeID}
                                isActive={doc.IsActive}
                                toggleFn={toggleSubTreatmentType}
                              />
                            </td>
                          </tr>
                        ))
                      )}
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
