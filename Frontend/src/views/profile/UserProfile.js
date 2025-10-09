import React, { useEffect, useState } from "react"

const UserProfile = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"))
    if (storedUser) {
      fetch(`http://localhost:5001/api/users/profile/${storedUser.id}`)
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch(() => setUser(null))
    }
  }, [])

  if (!user) return <p>⚠️ No user profile found. Please login.</p>

  return (
    <div className="p-4">
      <h2>👤 User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {user.age && <p><strong>Age:</strong> {user.age}</p>}
      {user.gender && <p><strong>Gender:</strong> {user.gender}</p>}
      {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
    </div>
  )
}

export default UserProfile