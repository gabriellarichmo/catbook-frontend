import React, { useState, useEffect } from 'react';
import ProfileEdit from './ProfileEdit';
import { useNavigate } from 'react-router-dom';

const Profile = ({ catbooks, profile }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (profile && profile.length > 0) {
      setUserProfile(profile[0]); 
    }
  }, [profile]);

  const handleSave = (updatedProfile) => {
    setUserProfile(updatedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleClick = (id) => {
    navigate(`/catbook/${id}`);
  };

  if (!userProfile) {
    return <p>Loading profile data...</p>;
  }

  return (
    <div className="bg-white min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 p-6">
        <div className="flex justify-end mb-4">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-coral text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Profile Display */}
        <div className="bg-robin flex flex-col items-center md:items-start text-brown">
          <img
            src={userProfile.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />

          {!isEditing ? (
            <>
              <h2 className="text-2xl font-semibold mb-2">{userProfile.name}</h2>
              <p className="text-gray-600 text-center md:text-left mb-4">{userProfile.bio}</p>
              <p className="text-gray-500 mb-4"><strong>Location:</strong> {userProfile.location}</p>
              <h3 className="text-xl font-semibold mb-2">Hobbies:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {userProfile.hobbies?.map((hobby, index) => (
                  <li key={index}>{hobby}</li>
                ))}
              </ul>
            </>
          ) : (
            <ProfileEdit
              userProfile={userProfile}
              handleSave={handleSave}
              handleCancel={handleCancel}
            />
          )}
        </div>
      </div>

      {/* Catbook Grid */}
      <div className="w-full md:w-2/3 p-6">
        <h2 className="text-2xl font-bold tracking-tight text-brown mb-6">My Catbooks</h2>
        <div className="container m-auto grid grid-cols-3">
          {catbooks.map((catbook) => (
            <div
              key={catbook.id}
              className="group relative cursor-pointer m-2"
              onClick={() => handleClick(catbook.id)}
            >
              <div className="p-4 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                <img
                  src={catbook.photos[0]?.image} 
                  alt={catbook.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <h3 className="text-sm text-brown">{catbook.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
