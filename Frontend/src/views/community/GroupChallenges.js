import React, { useState } from "react"
import { CCard, CCardBody, CCardHeader, CListGroup, CListGroupItem, CButton, CRow, CCol } from "@coreui/react"

const GroupChallenges = () => {
  const [challenges] = useState([
    { title: "Run 10km this week", members: 12 },
    { title: "Meditate 5 days", members: 8 },
    { title: "Read 50 pages", members: 15 },
  ])

  const join = (title) => {
    alert(`✅ You joined: ${title}`)
  }

  return (
    <CRow className="justify-content-center mt-5">
      <CCol xs={12} md={8}>
        <CCard>
          <CCardHeader><h4>🤝 Group Challenges</h4></CCardHeader>
          <CCardBody>
            <CListGroup>
              {challenges.map((c, i) => (
                <CListGroupItem key={i} className="d-flex justify-content-between">
                  <span>{c.title} ({c.members} members)</span>
                  <CButton size="sm" color="primary" onClick={() => join(c.title)}>Join</CButton>
                </CListGroupItem>
              ))}
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default GroupChallenges