import { prisma } from "@/lib/prisma";
import { EditOpdDiagnosisTypeAction } from "@/app/action/opddiagnosistype/EditOpdDiagnosisType";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function EditOPDDiagnosisType({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const opdDiagnosisTypeId = Number(id);

    // Fetch the correct record from mst_opd_diagnosis_type
    const opdDiagnosisType = await prisma.mst_opd_diagnosis_type.findUnique({
        where: { OPDDiagnosisTypeID: opdDiagnosisTypeId },
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

    // Renamed to avoid shadowing
    const opds = await prisma.mst_opd.findMany({});
    const diagonsistypes = await prisma.mst_diagnosis_type.findMany({});


    if (!opdDiagnosisType) {
        return <div>OPD Diagnosis Type not found</div>;
    }

    return (
        <>
            <div className="pagetitle">
                <h1>Edit OPD Diagnosis Type</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">OPD</li>
                        <li className="breadcrumb-item active">Edit OPD Diagnosis Type</li>
                    </ol>
                </nav>
            </div>
            {/* End Page Title */}
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Edit OPD Diagnosis Type</h5>
                                {/* General Form Elements */}
                                <form action={EditOpdDiagnosisTypeAction}>
                                    <input type="hidden" name="id" value={opdDiagnosisType.OPDDiagnosisTypeID} />
                                    <div className="row mb-3">
                                        <label htmlFor="OPDNo" className="col-sm-2 col-form-label">
                                            OPD No
                                        </label>
                                        <select name="OPDID" className="form-select" aria-label="Default select example" required defaultValue={opdDiagnosisType.OPDID}>
                                            <option value="">---Select OPD---</option>
                                            {opds.map((opd) => (
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
                                            <select name="DiagnosisTypeID" className="form-select" aria-label="Default select example" required defaultValue={opdDiagnosisType.DiagnosisTypeID}>
                                                <option value="">---Select Diagnosis Type---</option>
                                                {diagonsistypes.map((p) => (
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
                                            <input type="text" name="Description" className="form-control" defaultValue={opdDiagnosisType.Description || ""} />
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