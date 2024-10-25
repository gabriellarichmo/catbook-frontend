import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

const NewCatbook = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    const previewImages = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setImages([...images, ...previewImages]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  const handleSave = () => {
    const newCatbook = {
      title,
      images,
    };
    onSave(newCatbook);
    setTitle('');
    setImages([]);
    navigate('/profile');
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create a New Catbook</h2>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Catbook Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

{/* DRAG N DROP */}
      <div
        {...getRootProps()}
        className="mb-4 border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <p className="text-sm text-gray-600">Drag and drop images here, or click to select images</p>
      </div>

      {/* Image Previews */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {images.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={file.preview}
              alt={`preview ${index}`}
              className="w-full h-32 object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="bg-turquoise text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Catbook
      </button>
    </div>
  );
};

export default NewCatbook;
