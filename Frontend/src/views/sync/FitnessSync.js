import React from "react"
import { CCard, CCardBody, CCardHeader, CRow, CCol, CButton } from "@coreui/react"

const FitnessSync = () => {
  return (
    <CRow className="justify-content-center mt-5">
      <CCol xs={12} md={8}>
        <CCard>
          <CCardHeader><h4>💪 Fitness Sync</h4></CCardHeader>
          <CCardBody>
            <p>Connect your fitness apps for automatic progress tracking.</p>
            <CButton color="success" className="me-2">Connect Google Fit</CButton>
            <CButton color="info">Connect Apple Health</CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FitnessSync