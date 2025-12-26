import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteBtn from '@/app/ui/DeleteButton';
import deleteSubTreatmentType from '@/app/action/subtreatmenttype/DeleteSubTreatmentType';

export default async function SubTreatmentTypeList() {
  const subTreatmentTypeList = await prisma.mst_sub_treatment_type.findMany();

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
