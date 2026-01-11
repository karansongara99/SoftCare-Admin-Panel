import { prisma } from "@/lib/prisma";
import { AddDiagnosisTypeAction } from "@/app/action/diagnosistype/AddDiagnosisTypeAction";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AddDiagnosisType() {
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

    return (
        <>
            <div className="pagetitle">
                <h1>Add Diagnosis Type</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">Diagnosis Type</li>
                        <li className="breadcrumb-item active">Add Diagnosis Type</li>
                    </ol>
                </nav>
            </div>
            {/* End Page Title */}
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Add Diagnosis Type</h5>
                                {/* General Form Elements */}
                                <form action={AddDiagnosisTypeAction}>
                                    <div className="row mb-3">
                                        <label htmlFor="DiagnosisTypeName" className="col-sm-2 col-form-label">
                                            Diagnosis Type Name
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="DiagnosisTypeName" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="HospitalID" className="col-sm-2 col-form-label">
                                            Hospital
                                        </label>
                                        <div className="col-sm-10">
                                            <select name="HospitalID" className="form-select" aria-label="Default select example" required>
                                                <option value="">---Select Hospital---</option>
                                                {hospitals.map((h) => (
                                                    <option key={h.HospitalID} value={h.HospitalID}>
                                                        {h.HospitalName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="DiagnosisTypeShortName" className="col-sm-2 col-form-label">
                                            Diagnosis Type Short Name
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="DiagnosisTypeShortName" className="form-control" required />
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