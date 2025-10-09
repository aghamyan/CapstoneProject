import React, { useState } from "react"
import { CCard, CCardBody, CCardHeader, CFormSwitch, CRow, CCol } from "@coreui/react"

const Preferences = () => {
  const [prefs, setPrefs] = useState({
    darkMode: false,
    emailUpdates: true,
    weeklySummary: true,
  })

  const togglePref = (key) => {
    setPrefs({ ...prefs, [key]: !prefs[key] })
  }

  return (
    <CRow className="justify-content-center mt-5">
      <CCol xs={12} md={8}>
        <CCard>
          <CCardHeader><h4>⚙️ Preferences</h4></CCardHeader>
          <CCardBody>
            <CFormSwitch
              label="Enable Dark Mode"
              checked={prefs.darkMode}
              onChange={() => togglePref("darkMode")}
              className="mb-3"
            />
            <CFormSwitch
              label="Receive Email Updates"
              checked={prefs.emailUpdates}
              onChange={() => togglePref("emailUpdates")}
              className="mb-3"
            />
            <CFormSwitch
              label="Receive Weekly Progress Summary"
              checked={prefs.weeklySummary}
              onChange={() => togglePref("weeklySummary")}
              className="mb-3"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Preferences