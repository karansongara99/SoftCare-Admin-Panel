import React from 'react'
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from "@/lib/auth";

export default async function ReceiptList() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/");
  }

  const user: any = verifyToken(token);

  if (!user) {
    redirect("/");
  }

  const receipts = await prisma.mst_receipt.findMany({});
  return (
    <>
      <div className="pagetitle">
        <h1>Receipt List</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/admin/dashboard">Home</Link>
            </li>
            <li className="breadcrumb-item">Receipt</li>
            <li className="breadcrumb-item active">Receipt List</li>
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
                    Receipt List
                  </h4>

                  {/* Placeholder for Add Receipt if implemented later */}
                  {/* <button className="btn btn-info btn-md">
                    <i className="bi bi-plus-circle me-1"></i>
                    Add Receipt
                  </button> */}
                </div>

                {/* Receipt Table */}
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Receipt No</th>
                        <th>Receipt Date</th>
                        <th>OPD ID</th>
                        <th>Amount Paid</th>
                        <th>Payment Mode</th>
                        <th>Reference No</th>
                        <th>Created</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {receipts.map((receipt, index) => (
                        <tr key={receipt.ReceiptID}>
                          <td>{index + 1}</td>
                          <td>{receipt.ReceiptNo}</td>
                          {/* Fix: Convert Date objects to locale date strings */}
                          <td>{new Date(receipt.ReceiptDate).toLocaleDateString()}</td>
                          <td>{receipt.OPDID}</td>
                          <td>{Number(receipt.AmountPaid).toFixed(2)}</td>
                          <td>{receipt.PaymentMode}</td>
                          <td>{receipt.ReferenceNo || '-'}</td>
                          <td>{new Date(receipt.Created).toLocaleDateString()}</td>
                          <td>

                            <Link href={`/admin/receipt/${receipt.ReceiptID}`}>
                              <button className="btn btn-primary btn-sm me-1" title="View Details">
                                <i className="bi bi-eye"></i>
                              </button>
                            </Link>

                            <Link href={`/admin/receipt/receiptbill/${receipt.ReceiptID}`} target="_blank">
                              <button className="btn btn-success btn-sm me-1" title="Print / PDF">
                                <i className="bi bi-file-pdf"></i>
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                      {receipts.length === 0 && (
                        <tr>
                          <td colSpan={9} className="text-center">No receipts found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                </div>
                {/* End Receipt Table */}

              </div>
            </div>
          </div>
        </div>
      </section>

    </>

  )
}

