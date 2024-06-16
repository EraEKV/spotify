"use client"

import React, { useEffect } from 'react'
import Card from '../components/common/Card';

const Favs = () => {
  const [songs, setSongs] = React.useState([]);

  React.useEffect(() => {
    const fethcSongs = async () => {  
      try {
        const response = await fetch('http://localhost:8080/api/v1/songs/like', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem('accessToken')
          },
        });
  
        if (!response.ok) {
          throw new Error('Login failed');
        }
  
        const data = await response.json();
        setSongs(data.data)
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fethcSongs();
   }, []);


  return (
    <div className='min-h-screen px-2 sm:px-8 py-10'>
        <h1 className='text-center text-2xl sm:text-3xl mb-8'>My Favorites</h1>

        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-8 '>
          {songs.map((song: any) => (
            <Card src={song.img} name={song.name} author={song.artist} id={song._id} />
          ))}
        </div>
    </div>
  )
}

export default Favs