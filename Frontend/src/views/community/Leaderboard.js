import React from "react"
import { CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CRow, CCol } from "@coreui/react"

const Leaderboard = () => {
  const leaders = [
    { name: "Alice", points: 120 },
    { name: "Bob", points: 100 },
    { name: "Charlie", points: 80 },
  ]

  return (
    <CRow className="justify-content-center mt-5">
      <CCol xs={12} md={8}>
        <CCard>
          <CCardHeader><h4>🏅 Leaderboard</h4></CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Rank</CTableHeaderCell>
                  <CTableHeaderCell>User</CTableHeaderCell>
                  <CTableHeaderCell>Points</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {leaders.map((l, i) => (
                  <CTableRow key={i}>
                    <CTableDataCell>{i + 1}</CTableDataCell>
                    <CTableDataCell>{l.name}</CTableDataCell>
                    <CTableDataCell>{l.points}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Leaderboard