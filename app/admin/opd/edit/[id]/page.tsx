import { prisma } from "@/lib/prisma";
import { EditOPDAction } from "@/app/action/opd/EditOPDAction";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function EditOPD({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const opdId = Number(id);
    const opd = await prisma.mst_opd.findUnique({
        where: { OPDID: opdId },
    });
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/");
    }

    const user: any = verifyToken(token);

    if (!user) {
        redirect("/");
    }

    const patients = await prisma.mst_patient.findMany({
        where: {
            UserID: user.id
        }
    });

    const doctors = await prisma.mst_doctor.findMany({
        where: {
            UserID: user.id
        }
    });



    if (!opd) {
        return <div>OPD not found</div>;
    }

    return (
        <>
            <div className="pagetitle">
                <h1>Edit OPD</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">OPD</li>
                        <li className="breadcrumb-item active">Edit OPD</li>
                    </ol>
                </nav>
            </div>
            {/* End Page Title */}
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Edit OPD</h5>
                                {/* General Form Elements */}
                                <form action={EditOPDAction}>
                                    <input type="hidden" name="id" value={opd.OPDID} />
                                    <div className="row mb-3">
                                        <label htmlFor="OPDNo" className="col-sm-2 col-form-label">
                                            OPD No
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="OPDNo" className="form-control" required defaultValue={opd.OPDNo || ""} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="PatientID" className="col-sm-2 col-form-label">
                                            Patient
                                        </label>
                                        <div className="col-sm-10">
                                            <select name="PatientID" className="form-select" aria-label="Default select example" required defaultValue={opd.PatientID}>
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
                                            <input type="date" name="OPDDateTime" className="form-control" defaultValue={new Date(opd.OPDDateTime).toISOString().slice(0, 16)} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="TreatedByDoctorID" className="col-sm-2 col-form-label">
                                            Doctor
                                        </label>
                                        <div className="col-sm-10">
                                            <select name="TreatedByDoctorID" className="form-select" aria-label="Default select example" required defaultValue={opd.TreatedByDoctorID}>
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
                                            <input type="number" name="RegistrationFee" className="form-control" defaultValue={opd.RegistrationFee?.toString()} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="Description" className="col-sm-2 col-form-label">
                                            Description
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="Description" className="form-control" defaultValue={opd.Description ?? ""} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="OLDOPDNo" className="col-sm-2 col-form-label">
                                            OLDOPDNo
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="OLDOPDNo" className="form-control" defaultValue={opd.OLDOPDNo ?? ""} />
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