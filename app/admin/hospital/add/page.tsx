import { AddHospitalAction } from "../../../action/hospital/AddHospitalAction";

export default async function AddHospital() {
    return (
        <>
            <div className="pagetitle">
                <h1>Add Hospital</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">Hospital</li>
                        <li className="breadcrumb-item active">Add Hospital</li>
                    </ol>
                </nav>
            </div>
            {/* End Page Title */}
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Add Hospital</h5>
                                {/* General Form Elements */}
                                <form action={AddHospitalAction}>
                                    <div className="row mb-3">
                                        <label htmlFor="HospitalName" className="col-sm-2 col-form-label">
                                            Hospital Name
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="HospitalName" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="DefaultPaymentModeID" className="col-sm-2 col-form-label">
                                            DefaultPaymentModeID
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="number" name="DefaultPaymentModeID" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="RegistrationCharge" className="col-sm-2 col-form-label">
                                            RegistrationCharge
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="number" name="RegistrationCharge" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="RegistrationValidityMonths" className="col-sm-2 col-form-label">
                                            RegistrationValidityMonths
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="number" name="RegistrationValidityMonths" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="OpeningDate" className="col-sm-2 col-form-label">
                                            OpeningDate
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="date" name="OpeningDate" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="OpeningPatientNo" className="col-sm-2 col-form-label">
                                            OpeningPatientNo
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="number" name="OpeningPatientNo" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="OpeningOPDN" className="col-sm-2 col-form-label">
                                            OpeningOPDN
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="number" name="OpeningOPDN" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="OpeningReceiptNo" className="col-sm-2 col-form-label">
                                            OpeningReceiptNo
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="number" name="OpeningReceiptNo" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="Description" className="col-sm-2 col-form-label">
                                            Description
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="Description" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="Address" className="col-sm-2 col-form-label">
                                            Address
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="Address" className="form-control" required />
                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-primary">
                                            Submit
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