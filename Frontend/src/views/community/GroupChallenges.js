import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CListGroup,
  CListGroupItem,
  CButton,
  CRow,
  CCol,
  CAlert,
} from "@coreui/react";
import { fetchChallenges, joinChallenge } from "../../services/challenges";

const GroupChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchChallenges();
        setChallenges(data);
      } catch {
        setMessage("Failed to load challenges");
      }
    })();
  }, []);

  const join = async (challengeId) => {
    try {
      if (!user?.id) {
        setMessage("Please login to join challenges");
        return;
      }
      const res = await joinChallenge(challengeId, user.id);
      setMessage(res.message);
    } catch (err) {
      setMessage("Failed to join challenge");
    }
  };

  return (
    <CRow className="justify-content-center mt-5">
      <CCol xs={12} md={8}>
        <CCard>
          <CCardHeader>
            <h4>🤝 Group Challenges</h4>
          </CCardHeader>
          <CCardBody>
            {message && (
              <CAlert color={message.startsWith("Failed") ? "danger" : "success"}>
                {message}
              </CAlert>
            )}
            <CListGroup>
              {challenges.length === 0 && (
                <CListGroupItem>No challenges available.</CListGroupItem>
              )}
              {challenges.map((c) => (
                <CListGroupItem
                  key={c.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>
                    {c.title || c.name}
                    {typeof c.member_count === "number" && ` (${c.member_count} members)`}
                  </span>
                  <CButton size="sm" color="primary" onClick={() => join(c.id)}>
                    Join
                  </CButton>
                </CListGroupItem>
              ))}
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default GroupChallenges;
