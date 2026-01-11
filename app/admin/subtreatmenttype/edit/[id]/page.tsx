import { prisma } from "@/lib/prisma";
import { EditSubTreatmentTypeAction } from "@/app/action/subtreatmenttype/EditActionSubTreatmentType";

export default async function EditSubTreatmentType({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const subTreatmentTypeId = Number(id);
    const subTreatmentType = await prisma.mst_sub_treatment_type.findUnique({
        where: { SubTreatmentTypeID: subTreatmentTypeId },
    });
    const treatmenttypes = await prisma.mst_treatment_type.findMany();

    if (!subTreatmentType) {
        return <div>Sub Treatment Type not found</div>;
    }

    return (
        <>
            <div className="pagetitle">
                <h1>Edit Sub Treatment Type</h1>
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
                                <h5 className="card-title">Edit Sub Treatment Type</h5>
                                {/* General Form Elements */}
                                <form action={EditSubTreatmentTypeAction}>
                                    <input type="hidden" name="id" value={subTreatmentType.SubTreatmentTypeID} />
                                    <div className="row mb-3">
                                        <label htmlFor="SubTreatmentTypeName" className="col-sm-2 col-form-label">
                                            Sub Treatment Type Name
                                        </label>
                                        <div className="col-sm-10">
                                            <input
                                                type="text"
                                                name="SubTreatmentTypeName"
                                                className="form-control"
                                                defaultValue={subTreatmentType.SubTreatmentTypeName}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="TreatmentTypeID" className="col-sm-2 col-form-label">
                                            Treatment Type
                                        </label>
                                        <div className="col-sm-10">
                                            <select name="TreatmentTypeID" className="form-select" aria-label="Default select example" required>
                                                <option value="">---Select Treatment Type---</option>
                                                {treatmenttypes.map((t) => (
                                                    <option key={t.TreatmentTypeID} value={t.TreatmentTypeID}>
                                                        {t.TreatmentTypeName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="Rate" className="col-sm-2 col-form-label">
                                            Rate
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="Rate" className="form-control" defaultValue={subTreatmentType.Rate?.toString()} />
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
                                                defaultValue={subTreatmentType.Description || ""}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="AccountID" className="col-sm-2 col-form-label">
                                            Account ID
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="AccountID" className="form-control" defaultValue={subTreatmentType.AccountID?.toString()} />
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