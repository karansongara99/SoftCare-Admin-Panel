import { prisma } from "@/lib/prisma";
import { AddOpdDiagnosisTypeAction } from "@/app/action/opddiagnosistype/AddOpdDiagnosisType";
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

    const opd = await prisma.mst_opd.findMany({});
    const diagonsistype = await prisma.mst_diagnosis_type.findMany({});

    return (
        <>
            <div className="pagetitle">
                <h1>Add OPD Diagnosis Type</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">OPD</li>
                        <li className="breadcrumb-item active">Add OPD Diagnosis Type</li>
                    </ol>
                </nav>
            </div>
            {/* End Page Title */}
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Add OPD Diagnosis Type</h5>
                                {/* General Form Elements */}
                                <form action={AddOpdDiagnosisTypeAction}>
                                    <div className="row mb-3">
                                        <label htmlFor="OPDNo" className="col-sm-2 col-form-label">
                                            OPD No
                                        </label>
                                        <select name="OPDID" className="form-select" aria-label="Default select example" required>
                                            <option value="">---Select OPD---</option>
                                            {opd.map((opd) => (
                                                <option key={opd.OPDID} value={opd.OPDID}>
                                                    {opd.OPDNo}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="DiagnosisTypeID" className="col-sm-2 col-form-label">
                                            Diagnosis Type
                                        </label>
                                        <div className="col-sm-10">
                                            <select name="DiagnosisTypeID" className="form-select" aria-label="Default select example" required>
                                                <option value="">---Select Diagnosis Type---</option>
                                                {diagonsistype.map((p) => (
                                                    <option key={p.DiagnosisTypeID} value={p.DiagnosisTypeID}>
                                                        {p.DiagnosisTypeName}
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