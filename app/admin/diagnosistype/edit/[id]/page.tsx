import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import { EditDiagnosisTypeAction } from "@/app/action/diagnosistype/EditDiagnosisTypeAction";

export default async function EditDiagnosisType({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const diagnosisTypeId = Number(id);
    const diagnosisType = await prisma.mst_diagnosis_type.findUnique({
        where: { DiagnosisTypeID: diagnosisTypeId },
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

    if (!diagnosisType) {
        return <div>Diagnosis Type not found</div>;
    }

    return (
        <>
            <div className="pagetitle">
                <h1>Edit Diagnosis Type</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">Diagnosis Type</li>
                        <li className="breadcrumb-item active">Edit Diagnosis Type</li>
                    </ol>
                </nav>
            </div>
            {/* End Page Title */}
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Edit Diagnosis Type</h5>
                                <form action={EditDiagnosisTypeAction}>
                                    <input type="hidden" name="id" value={diagnosisType.DiagnosisTypeID} />
                                    <div className="row mb-3">
                                        <label htmlFor="DiagnosisTypeName" className="col-sm-2 col-form-label">
                                            Diagnosis Type Name
                                        </label>
                                        <div className="col-sm-10">
                                            <input
                                                type="text"
                                                name="DiagnosisTypeName"
                                                className="form-control"
                                                defaultValue={diagnosisType.DiagnosisTypeName}
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
                                                defaultValue={diagnosisType.HospitalID}
                                                required
                                            >
                                                <option value="">---Select Hospital---</option>
                                                {hospitals.map((h) => (
                                                    <option key={h.HospitalID} value={h.HospitalID}
                                                        defaultValue={diagnosisType.HospitalID === h.HospitalID ? h.HospitalID : ""}>
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
                                            <input type="text" name="DiagnosisTypeShortName" className="form-control" required defaultValue={diagnosisType.DiagnosisTypeShortName ?? ""} />
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
                                                defaultValue={diagnosisType.Description || ""}
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