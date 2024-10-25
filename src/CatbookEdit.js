import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDropzone } from 'react-dropzone';

// SortableImage Component
const SortableImage = ({ id, image, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative group">
      <img src={image} alt="Cat Pic" className="w-48 h-48 object-cover rounded-md" />
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 bg-red text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100"
      >
        Delete
      </button>
    </div>
  );
};

// CatbookEdit Component
const CatbookEdit = ({ thisCatbook, handleSaveCatbook, handleCancelCatbook }) => {
  const [images, setImages] = useState(thisCatbook.photos); // Load current catbook photos into state

  // Handle drag and drop reordering
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDelete = (id) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => ({
        id: Date.now(),
        image: URL.createObjectURL(file), 
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    },
  });

  const handleSave = () => {
    handleSaveCatbook({ ...thisCatbook, photos: images });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-brown">Edit Catbook</h2>

      {/* Drag-and-Drop Grid */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={images} strategy={verticalListSortingStrategy}>
          <div className="grid grid-cols-3 gap-4">
            {images.map((photo) => (
              <SortableImage
                key={photo.id}
                id={photo.id}
                image={photo.image}
                onDelete={() => handleDelete(photo.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Add New Images */}
      <div {...getRootProps()} className="mt-6 p-4 border-2 border-dashed border-gray-400 rounded-md">
        <input {...getInputProps()} />
        <p className="text-center text-brown">Drag 'n' drop some images here, or click to select images</p>
      </div>

      <div className="mt-4">
        <button
          onClick={handleSave}
          className="bg-turquoise text-white px-4 py-2 rounded hover:bg-coral mr-2"
        >
          Save
        </button>
        <button
          onClick={handleCancelCatbook}
          className="bg-turquoise text-white px-4 py-2 rounded hover:bg-coral"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CatbookEdit;
