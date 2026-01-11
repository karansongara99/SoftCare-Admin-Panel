import { prisma } from "@/lib/prisma";
import { AddOPDAction } from "@/app/action/opd/AddOPDAction";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AddOPD() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/");
    }

    const user: any = verifyToken(token);

    if (!user) {
        redirect("/");
    }

    const patients = await prisma.mst_patient.findMany({});
    const doctors = await prisma.mst_doctor.findMany({});

    return (
        <>
            <div className="pagetitle">
                <h1>Add OPD</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">OPD</li>
                        <li className="breadcrumb-item active">Add OPD</li>
                    </ol>
                </nav>
            </div>
            {/* End Page Title */}
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Add OPD</h5>
                                {/* General Form Elements */}
                                <form action={AddOPDAction}>
                                    <div className="row mb-3">
                                        <label htmlFor="OPDNo" className="col-sm-2 col-form-label">
                                            OPD No
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="OPDNo" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="PatientID" className="col-sm-2 col-form-label">
                                            Patient
                                        </label>
                                        <div className="col-sm-10">
                                            <select name="PatientID" className="form-select" aria-label="Default select example" required>
                                                <option value="">---Select Patient---</option>
                                                {patients.map((p) => (
                                                    <option key={p.PatientID} value={p.PatientID}>
                                                        {p.PatientName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="OPDDateTime" className="col-sm-2 col-form-label">
                                            OPDDateTime
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="date" name="OPDDateTime" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="TreatedByDoctorID" className="col-sm-2 col-form-label">
                                            Doctor
                                        </label>
                                        <div className="col-sm-10">
                                            <select name="TreatedByDoctorID" className="form-select" aria-label="Default select example" required>
                                                <option value="">---Select Doctor---</option>
                                                {doctors.map((d) => (
                                                    <option key={d.DoctorID} value={d.DoctorID}>
                                                        {d.DoctorName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="RegistrationFee" className="col-sm-2 col-form-label">
                                            RegistrationFee
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="number" name="RegistrationFee" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="Description" className="col-sm-2 col-form-label">
                                            Description
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="Description" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="OLDOPDNo" className="col-sm-2 col-form-label">
                                            OLDOPDNo
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="OLDOPDNo" className="form-control" />
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