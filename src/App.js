import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './Layout';  
import Home from './Home';  
import Registration from './Registration';  
import Profile from './Profile';  
import NewCatbook from './NewCatbook';
import CatbookCollection from './CatbookCollection';
import CatbookEdit from './CatbookEdit';

function App() {
  const [catbooks, setCatbooks] = useState([]);
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCatbooks = async () => {
      try {
        const response = await fetch('/catbooks.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCatbooks(data.catbooks);
      } catch (error) {
        console.error('Error fetching catbooks:', error);
        setError('Failed to fetch catbooks.');
      }
    };
  
    fetchCatbooks();
  }, []);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/profile.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProfile(data.profile);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile.');
      }
    };
  
    fetchProfile();
  }, []);

  const handleSaveNewCatbook = (newCatbook) => {
    setCatbooks((prevCatbooks) => [
      ...prevCatbooks,
      { id: prevCatbooks.length + 1, ...newCatbook },
    ]);
  };

  const handleSaveImages = (updatedImages, catbookId) => {
    setCatbooks((prevCatbooks) => 
      prevCatbooks.map((catbook) =>
        catbook.id === catbookId 
          ? { ...catbook, photos: updatedImages }
          : catbook
      )
    );
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="registration" element={<Registration />} />
            <Route 
              path="profile" 
              element={<Profile catbooks={catbooks} profile={profile} />} 
            />
            <Route 
              path="newcatbook" 
              element={<NewCatbook onSave={handleSaveNewCatbook} />} 
            />
            <Route 
              path="catbook/:id" 
              element={<CatbookCollection catbooks={catbooks} />} 
            />
            <Route 
              path="catbook/:id/edit" 
              element={
                <CatbookEdit 
                  catbooks={catbooks} 
                  onSave={handleSaveImages}
                />
              } 
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
