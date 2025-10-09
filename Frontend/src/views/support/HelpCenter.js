import React from "react"
import { CCard, CCardBody, CCardHeader, CListGroup, CListGroupItem, CRow, CCol } from "@coreui/react"

const HelpCenter = () => {
  const faqs = [
    { q: "How do I create a habit?", a: "Go to Add Habit and fill in the details." },
    { q: "How does AI assistance work?", a: "It suggests micro-steps and frequencies based on your habits." },
    { q: "Can I sync with Google Calendar?", a: "Yes, connect under the Sync section." },
  ]

  return (
    <CRow className="justify-content-center mt-5">
      <CCol xs={12} md={8}>
        <CCard>
          <CCardHeader><h4>❓ Help Center</h4></CCardHeader>
          <CCardBody>
            <CListGroup>
              {faqs.map((faq, idx) => (
                <CListGroupItem key={idx}>
                  <strong>{faq.q}</strong>
                  <p className="mb-0 text-muted">{faq.a}</p>
                </CListGroupItem>
              ))}
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default HelpCenter