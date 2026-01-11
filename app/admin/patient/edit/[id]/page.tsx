import { prisma } from "@/lib/prisma";
import { EditPatientAction } from "@/app/action/patient/EditActionPatient";

export default async function EditPatient({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const patientId = Number(id);
    const patient = await prisma.mst_patient.findUnique({
        where: { PatientID: patientId },
    });


    if (!patient) {
        return <div>patient not found</div>;
    }
    const hospitals = await prisma.mst_hospital.findMany();

    return (
        <>
            <div className="pagetitle">
                <h1>Edit Patient</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">Patient</li>
                        <li className="breadcrumb-item active">Edit Patient</li>
                    </ol>
                </nav>
            </div>
            {/* End Page Title */}
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Edit Patient</h5>
                                {/* General Form Elements */}
                                <form action={EditPatientAction}>
                                    <input type="hidden" name="id" value={patient.PatientID} />
                                    <div className="row mb-3">
                                        <label htmlFor="PatientName" className="col-sm-2 col-form-label">
                                            Patient Name
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="PatientName" className="form-control" required defaultValue={patient.PatientName} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="PatientNo" className="col-sm-2 col-form-label">
                                            PatientNo
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="number" name="PatientNo" className="form-control" required defaultValue={patient.PatientNo} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="RegistrationDateTime" className="col-sm-2 col-form-label">
                                            RegistrationDateTime
                                        </label>
                                        <div className="col-sm-10">
                                            <input
                                                type="date"
                                                name="RegistrationDateTime"
                                                className="form-control"
                                                required
                                                defaultValue={
                                                    patient?.RegistrationDateTime
                                                        ? new Date(patient.RegistrationDateTime).toISOString().split("T")[0]
                                                        : ""
                                                }
                                            />

                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="Age" className="col-sm-2 col-form-label">
                                            Age
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="number" name="Age" className="form-control" required defaultValue={patient.Age ?? ""} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="BloodGroup" className="col-sm-2 col-form-label">
                                            BloodGroup
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="BloodGroup" className="form-control" required defaultValue={patient.BloodGroup ?? ""} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="Gender" className="col-sm-2 col-form-label">
                                            Gender
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="Gender" className="form-control" required defaultValue={patient.Gender} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="Occupation" className="col-sm-2 col-form-label">
                                            Occupation
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="Occupation" className="form-control" required defaultValue={patient.Occupation ?? ""} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="HospitalID" className="col-sm-2 col-form-label">
                                            Hospital
                                        </label>
                                        <div className="col-sm-10">
                                            <select
                                                name="HospitalID"
                                                className="form-select"
                                                aria-label="Default select example"
                                                defaultValue={patient.HospitalID}
                                                required
                                            >
                                                <option value="">---Select Hospital---</option>
                                                {hospitals.map((h) => (
                                                    <option key={h.HospitalID} value={h.HospitalID}
                                                        defaultValue={patient.HospitalID === h.HospitalID ? h.HospitalID : ""}>
                                                        {h.HospitalName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="State" className="col-sm-2 col-form-label">
                                            State
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="State" className="form-control" required defaultValue={patient.State ?? ""} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="City" className="col-sm-2 col-form-label">
                                            City
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="City" className="form-control" required defaultValue={patient.City ?? ""} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="PinCode" className="col-sm-2 col-form-label">
                                            PinCode
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="PinCode" className="form-control" required defaultValue={patient.PinCode ?? ""} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="MobileNo" className="col-sm-2 col-form-label">
                                            MobileNo
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="MobileNo" className="form-control" required defaultValue={patient.MobileNo} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="ReferredBy" className="col-sm-2 col-form-label">
                                            ReferredBy
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="ReferredBy" className="form-control" required defaultValue={patient.ReferredBy ?? ""} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="EmergencyContactNo" className="col-sm-2 col-form-label">
                                            EmergencyContactNo
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="EmergencyContactNo" className="form-control" required defaultValue={patient.EmergencyContactNo ?? ""} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="Address" className="col-sm-2 col-form-label">
                                            Address
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="Address" className="form-control" required defaultValue={patient.Address ?? ""} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="Description" className="col-sm-2 col-form-label">
                                            Description
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="Description" className="form-control" required defaultValue={patient.Description ?? ""} />
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