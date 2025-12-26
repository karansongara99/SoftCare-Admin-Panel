import React from 'react'

const ReceiptList = () => {
  return (
    <>
      <div className="pagetitle">
        <h1>Receipt Tables</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
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

                  <button className="btn btn-info btn-md">
                    <i className="bi bi-plus-circle me-1"></i>
                    Add Receipt
                  </button>
                </div>

                {/* Doctor Table */}
                <div className="table-responsive">
                 <table className="table table-bordered table-hover align-middle">
  <thead className="table-light">
    <tr>
      <th>#</th>
      <th>Receipt ID</th>
      <th>Receipt No</th>
      <th>Receipt Date</th>
      <th>OPD ID</th>
      <th>Amount Paid</th>
      <th>Payment Mode ID</th>
      <th>Reference No</th>
      <th>Reference Date</th>
      <th>Description</th>
      <th>Cancelled On</th>
      <th>Cancelled By</th>
      <th>Cancellation Remarks</th>
      <th>User ID</th>
      <th>Created</th>
      <th>Modified</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>1</td>
      <td>501</td>
      <td>RCPT-2024-001</td>
      <td>2024-03-10 10:30</td>
      <td>1001</td>
      <td>750.00</td>
      <td>1</td>
      <td>TXN123456</td>
      <td>2024-03-10</td>
      <td>OPD consultation fee</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>1</td>
      <td>2024-03-10 10:30</td>
      <td>2024-03-10 10:30</td>
    </tr>

    <tr>
      <td>2</td>
      <td>502</td>
      <td>RCPT-2024-002</td>
      <td>2024-03-12 12:15</td>
      <td>1002</td>
      <td>1200.00</td>
      <td>2</td>
      <td>UPI998877</td>
      <td>2024-03-12</td>
      <td>Lab & OPD charges</td>
      <td>2024-03-13 09:40</td>
      <td>2</td>
      <td>Duplicate entry</td>
      <td>1</td>
      <td>2024-03-12 12:15</td>
      <td>2024-03-13 09:40</td>
    </tr>
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

export default ReceiptList