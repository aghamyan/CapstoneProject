import React, { useState } from "react"
import { CCard, CCardBody, CCardHeader, CForm, CFormInput, CFormTextarea, CButton, CRow, CCol } from "@coreui/react"

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("✅ Message sent! We'll get back to you soon.")
    setForm({ name: "", email: "", message: "" })
  }

  return (
    <CRow className="justify-content-center mt-5">
      <CCol xs={12} md={8}>
        <CCard>
          <CCardHeader><h4>📩 Contact Us</h4></CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CFormInput
                className="mb-3"
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <CFormInput
                className="mb-3"
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              <CFormTextarea
                className="mb-3"
                label="Message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
              />
              <CButton type="submit" color="primary">Send</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Contact