import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const stored = localStorage.getItem("user");
  const authUser = stored ? JSON.parse(stored) : null;

  useEffect(() => {
    if (!authUser?.id) return;
    fetch(`http://localhost:5001/api/users/profile/${authUser.id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, [authUser?.id]);

  if (!authUser) return <p>⚠️ No user profile found. Please login.</p>;
  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="p-4">
      <h2>👤 User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {user.age && <p><strong>Age:</strong> {user.age}</p>}
      {user.gender && <p><strong>Gender:</strong> {user.gender}</p>}
      {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
    </div>
  );
};

export default UserProfile;
