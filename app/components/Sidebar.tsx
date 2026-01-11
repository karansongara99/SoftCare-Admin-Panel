import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <>
      {/* ======= Sidebar ======= */}
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">

          {/* Dashboard */}
          <li className="nav-item">
            <Link className="nav-link" href="/">
              <i className="bi bi-grid" />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Hospital Master */}
          <li className="nav-item">
            <a className="nav-link collapsed" data-bs-target="#hospital-nav" data-bs-toggle="collapse" href="#">
              <i className="bi bi-hospital" /><span>Hospital</span><i className="bi bi-chevron-down ms-auto" />
            </a>
            <ul id="hospital-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
              <li>
                <Link href="/admin/hospital">
                  <i className="bi bi-circle" /><span>Hospital List</span>
                </Link>
              </li>
            </ul>
          </li>

          {/* Doctor Master */}
          <li className="nav-item">
            <a className="nav-link collapsed" data-bs-target="#doctor-nav" data-bs-toggle="collapse" href="#">
              <i className="bi bi-person-badge" /><span>Doctor</span><i className="bi bi-chevron-down ms-auto" />
            </a>
            <ul id="doctor-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
              <li>
                <Link href="/admin/doctor">
                  <i className="bi bi-circle" /><span>Doctor List</span>
                </Link>
              </li>
            </ul>
          </li>

          {/* Diagnosis Type Master */}
          <li className="nav-item">
            <a className="nav-link collapsed" data-bs-target="#diagnosis-nav" data-bs-toggle="collapse" href="#">
              <i className="bi bi-clipboard-heart" /><span>Diagnosis Types</span><i className="bi bi-chevron-down ms-auto" />
            </a>
            <ul id="diagnosis-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
              <li>
                <Link href="/admin/diagnosistype">
                  <i className="bi bi-circle" /><span>Diagnosis Type List</span>
                </Link>
              </li>
            </ul>
          </li>

          {/* Treatment Type Master */}
          <li className="nav-item">
            <a className="nav-link collapsed" data-bs-target="#treatment-nav" data-bs-toggle="collapse" href="#">
              <i className="bi bi-capsule" /><span>Treatment Types</span><i className="bi bi-chevron-down ms-auto" />
            </a>
            <ul id="treatment-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
              <li>
                <Link href="/admin/treatmenttype">
                  <i className="bi bi-circle" /><span>Treatment Type List</span>
                </Link>
              </li>
            </ul>
          </li>

          {/* Sub Treatment Type */}
          <li className="nav-item">
            <a className="nav-link collapsed" data-bs-target="#sub-treatment-nav" data-bs-toggle="collapse" href="#">
              <i className="bi bi-capsule-pill" /><span>Sub Treatment Types</span><i className="bi bi-chevron-down ms-auto" />
            </a>
            <ul id="sub-treatment-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
              <li>
                <Link href="/admin/subtreatmenttype">
                  <i className="bi bi-circle" /><span>Sub Treatment Type List</span>
                </Link>
              </li>
            </ul>
          </li>

          {/* Patients */}
          <li className="nav-item">
            <a className="nav-link collapsed" data-bs-target="#patient-nav" data-bs-toggle="collapse" href="#">
              <i className="bi bi-people" /><span>Patients</span><i className="bi bi-chevron-down ms-auto" />
            </a>
            <ul id="patient-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
              <li>
                <Link href="/admin/patient">
                  <i className="bi bi-circle" /><span>Patient List</span>
                </Link>
              </li>
            </ul>
          </li>

          {/* OPD */}
          <li className="nav-item">
            <a className="nav-link collapsed" data-bs-target="#opd-nav" data-bs-toggle="collapse" href="#">
              <i className="bi bi-journal-medical" /><span>OPD</span><i className="bi bi-chevron-down ms-auto" />
            </a>
            <ul id="opd-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
              <li>
                <Link href="/admin/opd">
                  <i className="bi bi-circle" /><span>OPD List</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/opddiagnosistype">
                  <i className="bi bi-circle" /><span>OPD Diagnosis Type</span>
                </Link>
              </li>
            </ul>
          </li>

          {/* Receipts */}
          <li className="nav-item">
            <Link className="nav-link collapsed" href="/admin/receipt">
              <i className="bi bi-receipt" />
              <span>Receipts</span>
            </Link>
          </li>

        </ul>
      </aside>

    </>
  )
}

export default Sidebar