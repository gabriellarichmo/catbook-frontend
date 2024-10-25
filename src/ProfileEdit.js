import React, { useState } from 'react';

const ProfileEdit = ({ userProfile, handleSave, handleCancel }) => {
  const [editProfile, setEditProfile] = useState({ ...userProfile });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleHobbiesChange = (e) => {
    setEditProfile({
      ...editProfile,
      hobbies: e.target.value.split(","),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        name="name"
        value={editProfile.name}
        onChange={handleChange}
        className="border border-gray-300 rounded px-4 py-2"
        placeholder="Name"
      />
      <textarea
        name="bio"
        value={editProfile.bio}
        onChange={handleChange}
        className="border border-gray-300 rounded px-4 py-2"
        placeholder="Bio"
      />
      <input
        type="text"
        name="location"
        value={editProfile.location}
        onChange={handleChange}
        className="border border-gray-300 rounded px-4 py-2"
        placeholder="Location"
      />
      <textarea
        name="hobbies"
        value={editProfile.hobbies.join(", ")}
        onChange={handleHobbiesChange}
        className="border border-gray-300 rounded px-4 py-2"
        placeholder="Hobbies (comma-separated)"
      />
      
      <div>
        <button
          onClick={() => handleSave(editProfile)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;
