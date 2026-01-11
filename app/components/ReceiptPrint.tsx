// components/ReceiptPrint.tsx
'use client';

import React from 'react';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

interface ReceiptPrintProps {
    receipt: any;
}

export default function ReceiptPrint({ receipt }: ReceiptPrintProps) {
    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `Receipt_${receipt.ReceiptNo}`,
        pageStyle: `
      @media print {
        @page {
          size: A2;
          margin: 10mm;
        }
        body {
          -webkit-print-color-adjust: exact;
        }
        .container-fluid {
            width: 100% !important;
            padding: 0 !important;
        }
        .card, .border {
            border: none !important;
        }
      }
    `,
    });

    // Hospital Information
    const hospitalInfo = {
        name: "SoftcareOPD",
        phone: "+91 56852 00000",
        address: "Convent Garden Market , Gujarat , India",
        email: "info@softcareopd.com"
    };

    return (
        <div className="container-fluid p-4">
            {/* Print Controls */}
            <div className="no-print d-flex justify-content-end mb-3 gap-2">
                <button
                    onClick={() => handlePrint && handlePrint()}
                    className="btn btn-primary"
                >
                    <i className="bi bi-printer me-2"></i> Print / Save as PDF
                </button>
                <button
                    onClick={() => window.close()}
                    className="btn btn-secondary"
                >
                    <i className="bi bi-x-circle me-2"></i> Close
                </button>
            </div>

            {/* Receipt Content */}
            <div ref={componentRef} className="bg-white p-4">
                {/* Hospital Header */}
                <div className="text-center border-bottom pb-3 mb-4">
                    <h1 className="text-primary mb-1">{hospitalInfo.name}</h1>
                    <p className="mb-1">{hospitalInfo.address}</p>
                    <p className="mb-1">Phone: {hospitalInfo.phone}</p>
                    <p className="mb-0">Email: {hospitalInfo.email}</p>
                </div>

                {/* Receipt Title */}
                <div className="text-center mb-4">
                    <h2 className="text-uppercase fw-bold">Payment Receipt</h2>
                    <div className="d-flex justify-content-center">
                        <div className="border-top border-primary" style={{ width: '100px' }}></div>
                    </div>
                </div>

                {/* Receipt Details Table */}
                <div className="mb-4">
                    <table className="table table-bordered mb-0">
                        <tbody>
                            <tr>
                                <td className="fw-bold" style={{ width: '15%' }}>Receipt No:</td>
                                <td style={{ width: '20%' }}>{receipt.ReceiptNo}</td>
                                <td className="fw-bold" style={{ width: '15%' }}>Receipt Date:</td>
                                <td style={{ width: '20%' }}>{new Date(receipt.ReceiptDate).toLocaleDateString()}</td>
                                <td className="fw-bold" style={{ width: '15%' }}>OPD ID:</td>
                                <td style={{ width: '15%' }}>{receipt.OPDID}</td>
                            </tr>

                            <tr>
                                <td className="fw-bold">Amount Paid:</td>
                                <td>₹{Number(receipt.AmountPaid).toFixed(2)}</td>
                                <td className="fw-bold">Payment Mode:</td>
                                <td>{receipt.PaymentMode}</td>
                                <td className="fw-bold">Reference No:</td>
                                <td>{receipt.ReferenceNo || '-'}</td>
                            </tr>

                            <tr>
                                <td className="fw-bold">Reference Date:</td>
                                <td>
                                    {receipt.ReferenceDate
                                        ? new Date(receipt.ReferenceDate).toLocaleDateString()
                                        : '-'}
                                </td>
                                <td className="fw-bold">Description:</td>
                                <td colSpan={3}>{receipt.Description || '-'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Signature Section */}
                <div className="mt-5 pt-4">
                    <div className="row">
                        <div className="col-6">
                            <div className="border-top text-center pt-2">
                                <p className="mb-0 fw-bold">Patient/Guardian Signature</p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="border-top text-center pt-2">
                                <p className="mb-0 fw-bold">Authorized Signatory</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-5 pt-4 text-center border-top">
                    <p className="mb-0 text-muted">
                        Thank you for choosing {hospitalInfo.name}. This is a computer generated receipt.
                    </p>
                </div>
            </div>
        </div>
    );
}