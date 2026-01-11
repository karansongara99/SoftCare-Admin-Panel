import { prisma } from "@/lib/prisma";
import { EditTreatmentTypeAction } from "@/app/action/treatmenttype/EditActionDeleteTreatmentType";

export default async function EditTreatmentType({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const treatmentTypeId = Number(id);
    const treatmentType = await prisma.mst_treatment_type.findUnique({
        where: { TreatmentTypeID: treatmentTypeId },
    });
    const hospitals = await prisma.mst_hospital.findMany();

    if (!treatmentType) {
        return <div>Treatment Type not found</div>;
    }

    return (
        <>
            <div className="pagetitle">
                <h1>Edit Treatment Type</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">Treatment Type</li>
                        <li className="breadcrumb-item active">Edit Treatment Type</li>
                    </ol>
                </nav>
            </div>
            {/* End Page Title */}
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Edit Treatment Type</h5>
                                {/* General Form Elements */}
                                <form action={EditTreatmentTypeAction}>
                                    <input type="hidden" name="id" value={treatmentType.TreatmentTypeID} />
                                    <div className="row mb-3">
                                        <label htmlFor="TreatmentTypeName" className="col-sm-2 col-form-label">
                                            Treatment Type Name
                                        </label>
                                        <div className="col-sm-10">
                                            <input
                                                type="text"
                                                name="TreatmentTypeName"
                                                className="form-control"
                                                defaultValue={treatmentType.TreatmentTypeName}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="TreatmentTypeShortName" className="col-sm-2 col-form-label">
                                            Treatment Type Short Name
                                        </label>
                                        <div className="col-sm-10">
                                            <input
                                                type="text"
                                                name="TreatmentTypeShortName"
                                                className="form-control"
                                                defaultValue={treatmentType.TreatmentTypeShortName || ""}
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
                                                defaultValue={treatmentType.HospitalID}
                                                required
                                            >
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
                                        <label htmlFor="Description" className="col-sm-2 col-form-label">
                                            Description
                                        </label>
                                        <div className="col-sm-10">
                                            <input
                                                type="text"
                                                name="Description"
                                                className="form-control"
                                                defaultValue={treatmentType.Description || ""}
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