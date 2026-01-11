import { NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import { prisma } from '@/lib/prisma';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    // Fetch receipt data
    const receipt = await prisma.mst_receipt.findUnique({
        where: { ReceiptID: parseInt(id) },
    });

    if (!receipt) {
        return NextResponse.json({ error: "Receipt not found" }, { status: 404 });
    }

    // Fetch OPD data to get patient and hospital info
    const opd = await prisma.mst_opd.findUnique({
        where: { OPDID: receipt.OPDID },
    });

    let patient = null;
    let hospital = null;

    if (opd) {
        patient = await prisma.mst_patient.findUnique({
            where: { PatientID: opd.PatientID },
        });

        if (patient) {
            hospital = await prisma.mst_hospital.findUnique({
                where: { HospitalID: patient.HospitalID },
            });
        }
    }

    // Create PDF and collect as buffer using Promise
    const pdfBuffer: Buffer = await new Promise((resolve, reject) => {
        const doc = new PDFDocument({ size: 'A4', margin: 50 });
        const chunks: Uint8Array[] = [];

        doc.on('data', (chunk: Uint8Array) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        // ========== PDF CONTENT ==========

        // Hospital Header
        if (hospital) {
            doc.fontSize(18).font('Helvetica-Bold').text(hospital.HospitalName, { align: 'center' });
            if (hospital.Address) {
                doc.fontSize(10).font('Helvetica').text(hospital.Address, { align: 'center' });
            }
            doc.moveDown(0.5);
        }

        // Title
        doc.fontSize(16).font('Helvetica-Bold').text('RECEIPT', { align: 'center' });
        doc.moveDown(0.5);

        // Divider
        doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
        doc.moveDown(0.5);

        // Receipt Details (2 columns)
        const leftX = 50;
        const rightX = 300;
        let currentY = doc.y;

        doc.fontSize(11).font('Helvetica-Bold');
        doc.text('Receipt No:', leftX, currentY);
        doc.font('Helvetica').text(receipt.ReceiptNo || '-', leftX + 80, currentY);

        doc.font('Helvetica-Bold').text('Date:', rightX, currentY);
        doc.font('Helvetica').text(new Date(receipt.ReceiptDate).toLocaleDateString('en-IN'), rightX + 50, currentY);

        currentY += 20;

        doc.font('Helvetica-Bold').text('OPD No:', leftX, currentY);
        doc.font('Helvetica').text(opd?.OPDNo || String(receipt.OPDID), leftX + 80, currentY);

        doc.font('Helvetica-Bold').text('Payment Mode:', rightX, currentY);
        doc.font('Helvetica').text(receipt.PaymentMode, rightX + 95, currentY);

        doc.moveDown(2);

        // Patient Details
        if (patient) {
            doc.fontSize(12).font('Helvetica-Bold').text('Patient Details', leftX);
            doc.moveDown(0.3);
            doc.fontSize(11).font('Helvetica');
            doc.text(`Name: ${patient.PatientName}`);
            doc.text(`Patient No: ${patient.PatientNo}`);
            if (patient.MobileNo) doc.text(`Mobile: ${patient.MobileNo}`);
            if (patient.Address) doc.text(`Address: ${patient.Address}`);
            doc.moveDown(1);
        }

        // Payment Details
        doc.fontSize(12).font('Helvetica-Bold').text('Payment Details', leftX);
        doc.moveDown(0.3);

        // Table header
        const tableTop = doc.y;
        doc.fontSize(10).font('Helvetica-Bold');
        doc.text('Description', leftX, tableTop);
        doc.text('Amount', 450, tableTop, { width: 80, align: 'right' });

        doc.moveTo(leftX, tableTop + 15).lineTo(545, tableTop + 15).stroke();

        // Table row
        doc.fontSize(11).font('Helvetica');
        const rowY = tableTop + 25;
        doc.text(receipt.Description || 'Payment Received', leftX, rowY);
        doc.text(`₹ ${Number(receipt.AmountPaid).toFixed(2)}`, 450, rowY, { width: 80, align: 'right' });

        doc.moveTo(leftX, rowY + 20).lineTo(545, rowY + 20).stroke();

        // Total
        doc.fontSize(12).font('Helvetica-Bold');
        doc.text('Total Amount:', 350, rowY + 30);
        doc.text(`₹ ${Number(receipt.AmountPaid).toFixed(2)}`, 450, rowY + 30, { width: 80, align: 'right' });

        doc.moveDown(3);

        // Reference details if available
        if (receipt.ReferenceNo) {
            doc.fontSize(10).font('Helvetica');
            doc.text(`Reference No: ${receipt.ReferenceNo}`, leftX);
            if (receipt.ReferenceDate) {
                doc.text(`Reference Date: ${new Date(receipt.ReferenceDate).toLocaleDateString('en-IN')}`);
            }
            doc.moveDown(1);
        }

        // Footer
        doc.fontSize(9).font('Helvetica').fillColor('gray');
        doc.text(`Generated on: ${new Date().toLocaleString('en-IN')}`, leftX, 750, { align: 'center' });
        doc.text('This is a computer generated receipt.', { align: 'center' });

        doc.end();
    });

    return new NextResponse(new Uint8Array(pdfBuffer), {
        status: 200,
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `inline; filename=receipt_${receipt.ReceiptNo || receipt.ReceiptID}.pdf`,
        },
    });
}
