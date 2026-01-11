import React from 'react'
import { prisma } from '@/lib/prisma';
import DeleteBtn from '@/app/ui/DeleteButton';
import deleteDoctor from '@/app/action/doctor/DeleteDoctor';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import Link from 'next/link';

export default async function DoctorList() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/");
  }

  const user: any = verifyToken(token);

  if (!user) {
    redirect("/");
  }

  const doctor = await prisma.mst_doctor.findMany({
    where: {
      HospitalID: user.HospitalID,
      UserID: user.id
    }

  });

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
                <h4 className="card-title mb-4">Search Doctor</h4>
                <form>
                  <div className="row align-items-end">
                    {/* Doctor Name */}
                    <div className="col-md-4">
                      <label className="form-label">Doctor Name</label>
                      <input type="text" className="form-control" />
                    </div>

                    {/* Hospital Name */}
                    <div className="col-md-4">
                      <label className="form-label">Hospital Name</label>
                      <input type="text" className="form-control" />
                    </div>

                    {/* Description */}
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
                    <Link href="/admin/doctor/add">Add Doctor</Link>
                  </button>
                </div>

                {/* Doctor Table */}
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Doctor Name</th>
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
                            <td>{doc.hospital?.HospitalName ?? "-"}</td>
                            <td>{doc.Description ?? "-"}</td>
                            <td>{new Date(doc.Created).toLocaleDateString()}</td>
                            <td>{doc.Modified ? new Date(doc.Modified).toLocaleDateString() : "-"}</td>
                            <td className="d-flex gap-2">
                              <Link
                                href={`/admin/doctor/edit/${doc.DoctorID}`}
                                className="btn btn-primary btn-sm"
                              >
                                <i className="bi bi-pencil"></i>
                              </Link>
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
