import React from "react"
import { CCard, CCardBody, CCardHeader, CRow, CCol, CButton } from "@coreui/react"

const Calendar = () => {
  return (
    <CRow className="justify-content-center mt-5">
      <CCol xs={12} md={8}>
        <CCard>
          <CCardHeader><h4>📅 Calendar Sync</h4></CCardHeader>
          <CCardBody>
            <p>Connect your calendar to schedule habits around your events.</p>
            <CButton color="primary" className="me-2">Connect Google Calendar</CButton>
            <CButton color="dark">Connect Apple Calendar</CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Calendar