import React from 'react'
import { prisma } from '@/lib/prisma';
import DeleteBtn from '@/app/ui/DeleteButton';
import deleteDoctor from '@/app/action/doctor/DeleteDoctor';

export default async function DoctorList() {
  const doctor = await prisma.mst_doctor.findMany();
  return (
    <>
      <div className="pagetitle">
        <h1>Doctor Tables</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">Doctor</li>
            <li className="breadcrumb-item active">Doctor List</li>
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
                    Doctor List
                  </h4>

                  <button className="btn btn-info btn-md">
                    <i className="bi bi-plus-circle me-1"></i>
                    Add Doctor
                  </button>
                </div>

                {/* Doctor Table */}
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Doctor Name</th>
                        <th>Staff ID</th>
                        <th>Student ID</th>
                        <th>Hospital ID</th>
                        <th>Description</th>
                        <th>Created</th>
                        <th>Modified</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doctor.map((doc: any) => {
                        return (
                          <tr key={doc.DoctorID}>
                            <td>{doc.DoctorID}</td>
                            <td>{doc.DoctorName}</td>
                            <td>{doc.StaffID ?? "-"}</td>
                            <td>{doc.StudentID ?? "-"}</td>
                            <td>{doc.HospitalID}</td>
                            <td>{doc.Description ?? "-"}</td>
                            <td>{new Date(doc.Created).toLocaleDateString()}</td>
                            <td>{doc.Modified ? new Date(doc.Modified).toLocaleDateString() : "-"}</td>
                            <td className='d-flex gap-2'>
                              <button className="btn btn-primary btn-sm">
                                <i className="bi bi-pencil"></i>
                              </button>
                              <DeleteBtn id={doc.DoctorID} deleteFn={deleteDoctor} />
                            </td>
                          </tr>
                        );
                      })}
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
