"use client"

import { useEffect, useState } from "react";
import { Button } from "../ui/button-song"
import { Slider } from "../ui/slider"

export function SongPage( id: string ) {
  const [song, setSong] = useState([]);

  useEffect(() => {
    const fethcSongs = async () => {  
      try {
        const response = await fetch(`http://localhost:8080/api/v1/songs/${id}`, {
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
        console.log(data.data)
        setSong(data.data)
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fethcSongs();
   }, []);

  return (
    <div className="min-h-screen py-16 text-white">
      <div className="container mx-auto py-12 px-4 md:px-6 bg-[#1e1e1e] rounded-xl">
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 ">
          <div className="flex flex-col items-center gap-4 ">
            <img
              alt="Album Cover"
              className="rounded-xl"
              height="300"
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/300",
                objectFit: "cover",
              }}
              width="300"
            />
            <div className="text-center">
              <h1 className="text-3xl font-bold">Starboy</h1>
              <p className="text-gray-400">The Weeknd</p>
              <p className="text-gray-400">Starboy (2016)</p>
              <p className="text-gray-400">4:10</p>
            </div>
          </div>
          <div className="grid gap-8">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Button size="icon" variant="ghost">
                  <ShuffleIcon className="h-6 w-6" />
                </Button>
                <Button size="icon" variant="ghost">
                  <RepeatIcon className="h-6 w-6" />
                </Button>
                <Button size="icon" variant="ghost">
                  <HeartIcon className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Button size="icon" variant="ghost">
                  <ChevronLeftIcon className="h-6 w-6" />
                </Button>
                <Button size="icon" variant="ghost">
                  <PauseIcon className="h-6 w-6" />
                </Button>
                <Button size="icon" variant="ghost">
                  <ChevronRightIcon className="h-6 w-6" />
                </Button>
              </div>
              <Slider
                className="w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform"
                defaultValue={[40]}
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>1:23</span>
                <span>4:10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}


function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}


function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}


function PauseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="14" y="4" width="4" height="16" rx="1" />
      <rect x="6" y="4" width="4" height="16" rx="1" />
    </svg>
  )
}


function RepeatIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  )
}


function ShuffleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
      <path d="m18 2 4 4-4 4" />
      <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
      <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
      <path d="m18 14 4 4-4 4" />
    </svg>
  )
}
