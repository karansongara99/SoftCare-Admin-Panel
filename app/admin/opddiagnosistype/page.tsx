import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteBtn from '@/app/ui/DeleteButton';
import deleteOpdDiagnosisType from '@/app/action/opddiagnosistype/DeleteOpdDiagnosisType';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

export default async function OPDDiagnosisTypeList() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/");
  }

  const user: any = verifyToken(token);

  if (!user) {
    redirect("/");
  }

  const opdDiagnosisTypeList = await prisma.mst_opd_diagnosis_type.findMany({
    where: {
      UserID: user.id
    }
  });


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
      {/* Page Content */}
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-4">Search OPD Diagnosis Type</h4>
                <form>
                  <div className="row align-items-end">
                    {/* Hospital Name */}
                    <div className="col-md-4">
                      <label className="form-label">OPD No</label>
                      <input type="text" className="form-control" />
                    </div>

                    {/* Registration Charge */}
                    <div className="col-md-4">
                      <label className="form-label">Description</label>
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
                  <h4 className="card-title">
                    OPD Diagnosis Type List
                  </h4>

                  <Link
                    href="/admin/opddiagnosistype/add"
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
                                href={`/admin/opddiagnosistype/edit/${doc.OPDDiagnosisTypeID}`}
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
