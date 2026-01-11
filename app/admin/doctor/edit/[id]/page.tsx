import { prisma } from "@/lib/prisma";
import { EditDoctorAction } from "@/app/action/doctor/EditDoctorAction";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function EditDoctor({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const doctorId = Number(id);
    const doctor = await prisma.mst_doctor.findUnique({
        where: { DoctorID: doctorId },
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

    const hospitals = await prisma.mst_hospital.findMany({
        where: {
            UserID: user.id
        }
    });

    if (!doctor) {
        return <div>Doctor not found</div>;
    }

    return (
        <>
            <div className="pagetitle">
                <h1>Edit Doctor</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">Doctor</li>
                        <li className="breadcrumb-item active">Edit Doctor</li>
                    </ol>
                </nav>
            </div>
            {/* End Page Title */}
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Edit Doctor</h5>
                                {/* General Form Elements */}
                                <form action={EditDoctorAction}>
                                    <input type="hidden" name="id" value={doctor.DoctorID} />
                                    <div className="row mb-3">
                                        <label htmlFor="DoctorName" className="col-sm-2 col-form-label">
                                            Doctor Name
                                        </label>
                                        <div className="col-sm-10">
                                            <input
                                                type="text"
                                                name="DoctorName"
                                                className="form-control"
                                                defaultValue={doctor.DoctorName}
                                                required
                                            />
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
                                                defaultValue={doctor.HospitalID}
                                                required
                                            >
                                                <option value="">---Select Hospital---</option>
                                                {hospitals.map((h) => (
                                                    <option key={h.HospitalID} value={h.HospitalID}
                                                        defaultValue={doctor.HospitalID === h.HospitalID ? h.HospitalID : ""}>
                                                        {h.HospitalName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="Description" className="col-sm-2 col-form-label">
                                            Description
                                        </label>
                                        <div className="col-sm-10">
                                            <input
                                                type="text"
                                                name="Description"
                                                className="form-control"
                                                defaultValue={doctor.Description || ""}
                                            />
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