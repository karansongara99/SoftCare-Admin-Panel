import { prisma } from "@/lib/prisma";
import { EditHospitalAction } from "@/app/action/hospital/EditHospitalAction";

export default async function EditHospital({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const hospitalId = Number(id);
    const hospital = await prisma.mst_hospital.findUnique({
        where: { HospitalID: hospitalId },
    });

    if (!hospital) {
        return <div>Hospital not found</div>;
    }

    return (
        <>
            <div className="pagetitle">
                <h1>Edit Hospital</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">Hospital</li>
                        <li className="breadcrumb-item active">Edit Hospital</li>
                    </ol>
                </nav>
            </div>
            {/* End Page Title */}
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Edit Hospital</h5>
                                {/* General Form Elements */}
                                <form action={EditHospitalAction}>
                                    <input type="hidden" name="id" defaultValue={hospitalId} />
                                    <div className="row mb-3">
                                        <label htmlFor="HospitalName" className="col-sm-2 col-form-label">
                                            Hospital Name
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="HospitalName" className="form-control" required defaultValue={hospital.HospitalName} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="DefaultPaymentModeID" className="col-sm-2 col-form-label">
                                            DefaultPaymentModeID
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="number" name="DefaultPaymentModeID" className="form-control" required defaultValue={hospital.DefaultPaymentModeID ?? undefined} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="RegistrationCharge" className="col-sm-2 col-form-label">
                                            RegistrationCharge
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="number" name="RegistrationCharge" className="form-control" required defaultValue={hospital.RegistrationCharge?.toString() ?? undefined} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="RegistrationValidityMonths" className="col-sm-2 col-form-label">
                                            RegistrationValidityMonths
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="number" name="RegistrationValidityMonths" className="form-control" required defaultValue={hospital.RegistrationValidityMonths?.toString() ?? undefined} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="OpeningDate" className="col-sm-2 col-form-label">
                                            OpeningDate
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="date" name="OpeningDate" className="form-control" required defaultValue={hospital.OpeningDate?.toISOString().split('T')[0]} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="OpeningPatientNo" className="col-sm-2 col-form-label">
                                            OpeningPatientNo
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="number" name="OpeningPatientNo" className="form-control" required defaultValue={hospital.OpeningPatientNo?.toString() ?? undefined} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="OpeningOPDNo" className="col-sm-2 col-form-label">
                                            OpeningOPDNo
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="number" name="OpeningOPDNo" className="form-control" required defaultValue={hospital.OpeningOPDNo?.toString() ?? undefined} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="OpeningReceiptNo" className="col-sm-2 col-form-label">
                                            OpeningReceiptNo
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="number" name="OpeningReceiptNo" className="form-control" required defaultValue={hospital.OpeningReceiptNo?.toString() ?? undefined} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="Description" className="col-sm-2 col-form-label">
                                            Description
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="Description" className="form-control" required defaultValue={hospital.Description ?? ''} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="Address" className="col-sm-2 col-form-label">
                                            Address
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="Address" className="form-control" required defaultValue={hospital.Address ?? ''} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <legend className="col-form-label col-sm-2 pt-0">Settings</legend>
                                        <div className="col-sm-10">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" name="IsRateEnableInReceipt" id="IsRateEnableInReceipt" defaultChecked={hospital.IsRateEnableInReceipt ?? false} />
                                                <label className="form-check-label" htmlFor="IsRateEnableInReceipt">
                                                    Enable Rate In Receipt
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" name="IsRegistrationFeeEnableInOPD" id="IsRegistrationFeeEnableInOPD" defaultChecked={hospital.IsRegistrationFeeEnableInOPD ?? false} />
                                                <label className="form-check-label" htmlFor="IsRegistrationFeeEnableInOPD">
                                                    Enable Registration Fee In OPD
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-primary">
                                            Update
                                        </button>&nbsp;
                                        <button type="reset" className="btn btn-secondary">
                                            Reset
                                        </button>
                                    </div>
                                </form>
                                {/* End General Form Elements */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}