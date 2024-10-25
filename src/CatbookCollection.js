import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CatbookEdit from './CatbookEdit';

const CatbookCollection = ({ catbooks }) => {
  const { id } = useParams();
  const currentCatbook = catbooks.find(catbook => catbook.id === parseInt(id));
  const [editCatbook, setEditCatbook] = useState(false);
  const [thisCatbook, setThisCatbook] = useState(currentCatbook);
  const navigate = useNavigate();

  const handleSaveCatbook = (updatedCatbook) => {
    setThisCatbook(updatedCatbook);
    setEditCatbook(false);
  };

  const handleCancelCatbook = () => {
    setEditCatbook(false);
  };

  const handleClickCatbook = (id) => {
    navigate(`/catbook/${id}/edit`);
  };

  if (!currentCatbook) {
    return <p>Catbook not found!</p>;
  }

  return (
    <div className="container mx-auto p-6 bg-robin">
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-brown">{thisCatbook.title}</h2>
        <div>
          {!editCatbook ? (
            <button
              onClick={() => setEditCatbook(true)}
              className='bg-coral text-white px-4 py-2 rounded hover:bg-brown'
            >
              Edit Catbook
            </button>
          ) : null}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {thisCatbook.photos.map((photo, index) => (
            <img key={index} src={photo.image} alt="Cat" className="h-auto max-w-full rounded-lg" />
          ))}
        </div>
        {editCatbook && (
          <CatbookEdit 
            thisCatbook={thisCatbook}
            handleSaveCatbook={handleSaveCatbook}
            handleCancelCatbook={handleCancelCatbook}
          />
        )}
      </div>
    </div>
  );
};

export default CatbookCollection;
