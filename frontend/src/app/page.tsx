"use client";

import { useEffect, useState } from "react";
import Card from "./components/common/Card";
import Header from "./components/layout/Header";


export default function Home() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fethcSongs = async () => {  
      try {
        const response = await fetch('http://localhost:8080/api/v1/songs/', {
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
    <main className="min-h-screen px-10">
      <Header />

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-8  ">
        {/* <Card src="https://i.scdn.co/image/ab67616d00001e0271d62ea7ea8a5be92d3c1f62" name="HIT ME HARD AND SOFT" author="Billy Eilish" id="123"/> */}
        {/* <Card src="https://i.scdn.co/image/ab67616d00001e0271d62ea7ea8a5be92d3c1f62" name="HIT ME HARD AND SOFT" author="Billy Eilish" id="123"/>
        <Card src="https://i.scdn.co/image/ab67616d00001e0271d62ea7ea8a5be92d3c1f62" name="HIT ME HARD AND SOFT" author="Billy Eilish" id="123"/>
        <Card src="https://i.scdn.co/image/ab67616d00001e0271d62ea7ea8a5be92d3c1f62" name="HIT ME HARD AND SOFT" author="Billy Eilish" id="123"/>
        <Card src="https://i.scdn.co/image/ab67616d00001e0271d62ea7ea8a5be92d3c1f62" name="HIT ME HARD AND SOFT" author="Billy Eilish" id="123"/>
        <Card src="https://i.scdn.co/image/ab67616d00001e0271d62ea7ea8a5be92d3c1f62" name="HIT ME HARD AND SOFT" author="Billy Eilish" id="123"/> */}

        {songs.map((song: any) => (
          <Card src={song.img} name={song.name} author={song.artist} id={song._id} />
        ))}
      </div>
    </main>
  );
}
