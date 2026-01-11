import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

import { prisma } from '@/lib/prisma';


export default async function Home() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/");
    }

    const user: any = verifyToken(token);

    if (!user) {
        redirect("/");
    }

    const countByUser = async (model: any, userId: number) => {
        return model.count({
            where: { UserID: userId }
        });
    };

    const hospitalCount = await countByUser(prisma.mst_hospital, user.id);
    const patientCount = await countByUser(prisma.mst_patient, user.id);
    const opdCount = await countByUser(prisma.mst_opd, user.id);

    return (
        <>
            <div className="pagetitle">
                <h1>Dashboard</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                </nav>
            </div>{/* End Page Title */}
            <section className="section dashboard">
                <div className="row">
                    {/* Left side columns */}
                    <div className="col-lg-12">
                        <div className="row">
                            {/* OPD Visits Card */}
                            <div className="col-xxl-4 col-md-6">
                                <div className="card info-card sales-card">

                                    <div className="card-body">
                                        <h5 className="card-title">Total OPD Visits</h5>

                                        <div className="d-flex align-items-center">
                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                <i className="bi bi-activity" />
                                            </div>
                                            <div className="ps-3">
                                                <h6>{opdCount}</h6>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* End OPD Visits Card */}


                            {/* OPD Revenue Card */}
                            <div className="col-xxl-4 col-md-6">
                                <div className="card info-card revenue-card">

                                    <div className="card-body">
                                        <h5 className="card-title">Total Hospitals</h5>

                                        <div className="d-flex align-items-center">
                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                <i className="bi bi-hospital" />
                                            </div>
                                            <div className="ps-3">
                                                <h6>{hospitalCount}</h6>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* End OPD Revenue Card */}


                            {/* New Patients Card */}
                            <div className="col-xxl-4 col-xl-12">
                                <div className="card info-card customers-card">

                                    <div className="card-body">
                                        <h5 className="card-title">Total Patients</h5>

                                        <div className="d-flex align-items-center">
                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                <i className="bi bi-person-plus" />
                                            </div>
                                            <div className="ps-3">
                                                <h6>{patientCount}</h6>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* End New Patients Card */}

                            {/* OPD Records Table */}
                            <div className="col-12">
                                <div className="card recent-sales overflow-auto">

                                    <div className="card-body">
                                        <h5 className="card-title">
                                            OPD Records <span>| Today</span>
                                        </h5>

                                        <table className="table table-striped datatable">
                                            <thead>
                                                <tr className="text-start">
                                                    <th scope="col">OPD ID</th>
                                                    <th scope="col">Patient Name</th>
                                                    <th scope="col">Doctor</th>
                                                    <th scope="col">Diagnosis</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <th scope="row"><a href="#">#OPD001</a></th>
                                                    <td>Rahul Sharma</td>
                                                    <td>Dr. Mehta</td>
                                                    <td><a href="#" className="text-primary">Fever, Cough</a></td>
                                                    <td>2025-01-10</td>
                                                    <td><span className="badge bg-success">Completed</span></td>
                                                </tr>

                                                <tr>
                                                    <th scope="row"><a href="#">#OPD002</a></th>
                                                    <td>Anita Patel</td>
                                                    <td>Dr. Shah</td>
                                                    <td><a href="#" className="text-primary">Migraine</a></td>
                                                    <td>2025-01-10</td>
                                                    <td><span className="badge bg-warning">In Progress</span></td>
                                                </tr>

                                                <tr>
                                                    <th scope="row"><a href="#">#OPD003</a></th>
                                                    <td>Vikram Singh</td>
                                                    <td>Dr. Kapadia</td>
                                                    <td><a href="#" className="text-primary">Back Pain</a></td>
                                                    <td>2025-01-10</td>
                                                    <td><span className="badge bg-danger">Cancelled</span></td>
                                                </tr>

                                                <tr>
                                                    <th scope="row"><a href="#">#OPD004</a></th>
                                                    <td>Neha Gupta</td>
                                                    <td>Dr. Rao</td>
                                                    <td><a href="#" className="text-primary">Skin Allergy</a></td>
                                                    <td>2025-01-09</td>
                                                    <td><span className="badge bg-success">Completed</span></td>
                                                </tr>

                                                <tr>
                                                    <th scope="row"><a href="#">#OPD005</a></th>
                                                    <td>Arjun Desai</td>
                                                    <td>Dr. Fernandes</td>
                                                    <td><a href="#" className="text-primary">Stomach Pain</a></td>
                                                    <td>2025-01-09</td>
                                                    <td><span className="badge bg-warning">In Progress</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                            {/* End OPD Records Table */}

                            {/* Top OPD Visits */}
                            <div className="col-12">
                                <div className="card top-selling overflow-auto">
                                    <div className="card-body pb-0">
                                        <h5 className="card-title">Top OPD Visits <span>| Today</span></h5>
                                        <table className="table table-bordered datatable">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Doctor</th>
                                                    <th scope="col">Doctor Name</th>
                                                    <th scope="col">Consultation Fee</th>
                                                    <th scope="col">Patients Seen</th>
                                                    <th scope="col">Revenue</th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                <tr>
                                                    <th scope="row">
                                                        <a href="#">
                                                            <img
                                                                src="https://randomuser.me/api/portraits/men/11.jpg"
                                                                alt="Doctor 1"
                                                                style={{ width: '60px', height: '60px', borderRadius: '8px' }}
                                                            />
                                                        </a>
                                                    </th>
                                                    <td>
                                                        <a href="#" className="text-primary fw-bold">Dr. Amit Mehta (Physician)</a>
                                                    </td>
                                                    <td>₹500</td>
                                                    <td className="fw-bold">18</td>
                                                    <td>₹9,000</td>
                                                </tr>

                                                <tr>
                                                    <th scope="row">
                                                        <a href="#">
                                                            <img
                                                                src="https://randomuser.me/api/portraits/women/65.jpg"
                                                                alt="Doctor 2"
                                                                style={{ width: '60px', height: '60px', borderRadius: '8px' }}
                                                            />
                                                        </a>
                                                    </th>
                                                    <td>
                                                        <a href="#" className="text-primary fw-bold">Dr. Neha Shah (Dermatologist)</a>
                                                    </td>
                                                    <td>₹800</td>
                                                    <td className="fw-bold">10</td>
                                                    <td>₹8,000</td>
                                                </tr>

                                                <tr>
                                                    <th scope="row">
                                                        <a href="#">
                                                            <img
                                                                src="https://randomuser.me/api/portraits/men/31.jpg"
                                                                alt="Doctor 3"
                                                                style={{ width: '60px', height: '60px', borderRadius: '8px' }}
                                                            />
                                                        </a>
                                                    </th>
                                                    <td>
                                                        <a href="#" className="text-primary fw-bold">Dr. Ravi Kapoor (Orthopedic)</a>
                                                    </td>
                                                    <td>₹700</td>
                                                    <td className="fw-bold">7</td>
                                                    <td>₹4,900</td>
                                                </tr>

                                                <tr>
                                                    <th scope="row">
                                                        <a href="#">
                                                            <img
                                                                src="https://randomuser.me/api/portraits/women/32.jpg"
                                                                alt="Doctor 4"
                                                                style={{ width: '60px', height: '60px', borderRadius: '8px' }}
                                                            />
                                                        </a>
                                                    </th>
                                                    <td>
                                                        <a href="#" className="text-primary fw-bold">Dr. Swati Rao (Pediatrician)</a>
                                                    </td>
                                                    <td>₹600</td>
                                                    <td className="fw-bold">12</td>
                                                    <td>₹7,200</td>
                                                </tr>

                                                <tr>
                                                    <th scope="row">
                                                        <a href="#">
                                                            <img
                                                                src="https://randomuser.me/api/portraits/men/53.jpg"
                                                                alt="Doctor 5"
                                                                style={{ width: '60px', height: '60px', borderRadius: '8px' }}
                                                            />
                                                        </a>
                                                    </th>
                                                    <td>
                                                        <a href="#" className="text-primary fw-bold">Dr. Prakash Fernandes (Cardiologist)</a>
                                                    </td>
                                                    <td>₹1,200</td>
                                                    <td className="fw-bold">5</td>
                                                    <td>₹6,000</td>
                                                </tr>

                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                            {/* End Top OPD Visits */}

                        </div>
                    </div>{/* End Left side columns */}
                </div>
            </section>

        </>
    );
}
