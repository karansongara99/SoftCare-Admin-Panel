import React from 'react'
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteBtn from '@/app/ui/DeleteButton';
import deleteTreatmentType from '@/app/action/treatmenttype/DeleteTreatmentType';

export default async function TreatmentTypeList() {
  const treatmentType = await prisma.mst_treatment_type.findMany();
  return (
    <>
      <div className="pagetitle">
        <h1>Treatment Type Tables</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">Treatment Type</li>
            <li className="breadcrumb-item active">Treatment Type List</li>
          </ol>
        </nav>
      </div>
      {/* Page Content */}
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">

                {/* Title & Button Row */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="card-title">
                    Treatment Type List
                  </h4>

                  <button className="btn btn-info btn-md">
                    <i className="bi bi-plus-circle me-1"></i>
                    Add Treatment Type
                  </button>
                </div>

                {/* Doctor Table */}
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Treatment Type Name</th>
                        <th>Short Name</th>
                        <th>Hospital ID</th>
                        <th>Created</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {treatmentType.map((doc: any, index: number) => (
                        <tr key={doc.TreatmentTypeID}>
                          <td>{index + 1}</td>

                          <td>{doc.TreatmentTypeName ?? "-"}</td>

                          <td>{doc.TreatmentTypeShortName ?? "-"}</td>

                          <td>{doc.HospitalID ?? "-"}</td>


                          <td>
                            {doc.Created
                              ? new Date(doc.Created).toLocaleDateString()
                              : "-"}
                          </td>

                          <td className="d-flex gap-2">
                            <button className="btn btn-primary btn-sm">
                              <i className="bi bi-pencil"></i>
                            </button>

                           <DeleteBtn id={doc.TreatmentTypeID} deleteFn={deleteTreatmentType} />

                            <Link
                              href={`/admin/treatmenttype/${doc.TreatmentTypeID}`}
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
      </section >

    </>

  )
}

