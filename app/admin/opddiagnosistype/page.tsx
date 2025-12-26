import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteBtn from '@/app/ui/DeleteButton';
import deleteOpdDiagnosisType from '@/app/action/opddiagnosistype/DeleteOpdDiagnosisType';

export default async function OPDDiagnosisTypeList() {
  const opdDiagnosisTypeList =
    await prisma.mst_opd_diagnosis_type.findMany();

  return (
    <>
      <div className="pagetitle">
        <h1>OPD Diagnosis Type Tables</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/admin">Home</Link>
            </li>
            <li className="breadcrumb-item">OPD Diagnosis Type</li>
            <li className="breadcrumb-item active">
              OPD Diagnosis Type List
            </li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="card-title">
                    OPD Diagnosis Type List
                  </h4>

                  <Link
                    href="/admin/opd-diagnosis-type/add"
                    className="btn btn-info btn-md"
                  >
                    <i className="bi bi-plus-circle me-1"></i>
                    Add OPD Diagnosis Type
                  </Link>
                </div>

                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>OPD Diagnosis Type ID</th>
                        <th>OPD ID</th>
                        <th>Diagnosis Type ID</th>
                        <th>Description</th>
                        <th>Created</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {opdDiagnosisTypeList.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="text-center">
                            No records found
                          </td>
                        </tr>
                      ) : (
                        opdDiagnosisTypeList.map((doc: any, index: number) => (
                          <tr key={doc.OPDDiagnosisTypeID}>
                            <td>{index + 1}</td>
                            <td>{doc.OPDDiagnosisTypeID}</td>
                            <td>{doc.OPDID ?? '-'}</td>
                            <td>{doc.DiagnosisTypeID ?? '-'}</td>
                            <td>{doc.Description ?? '-'}</td>
                            <td>
                              {doc.Created
                                ? new Date(doc.Created).toLocaleDateString()
                                : '-'}
                            </td>
                            <td className="d-flex gap-2">
                              <Link
                                href={`/admin/opd-diagnosis-type/edit/${doc.OPDDiagnosisTypeID}`}
                                className="btn btn-primary btn-sm"
                              >
                                <i className="bi bi-pencil"></i>
                              </Link>

                              <DeleteBtn id={doc.OPDDiagnosisTypeID} deleteFn={deleteOpdDiagnosisType} />
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
