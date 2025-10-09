import React from "react"
import { CCard, CCardBody, CCardHeader, CListGroup, CListGroupItem, CRow, CCol } from "@coreui/react"

const Friends = () => {
  const friends = ["Alice", "Bob", "Charlie", "David"]

  return (
    <CRow className="justify-content-center mt-5">
      <CCol xs={12} md={8}>
        <CCard>
          <CCardHeader><h4>👥 Friends</h4></CCardHeader>
          <CCardBody>
            <CListGroup>
              {friends.map((f, i) => (
                <CListGroupItem key={i}>{f}</CListGroupItem>
              ))}
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Friends