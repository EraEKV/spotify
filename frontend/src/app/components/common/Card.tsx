"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';

interface CardProps {
    src: string;
    name: string;
    author: string;
    id: string;
}

const Card: React.FC<CardProps> = ({ src, name, author, id }) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const storedLikedIds = JSON.parse(localStorage.getItem('likedIds') || '[]');
        if (storedLikedIds.includes(id)) {
            setLiked(true);
        }
    }, [id]);

    const handleToggleLike = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent the Link from navigating
        try {
            const storedLikedIds = JSON.parse(localStorage.getItem('likedIds') || '[]');
            let updatedLikedIds;

            if (liked) {
                updatedLikedIds = storedLikedIds.filter((likedId: string) => likedId !== id);
                localStorage.setItem('likedIds', JSON.stringify(updatedLikedIds));
            } else {
                updatedLikedIds = [...storedLikedIds, id];
                localStorage.setItem('likedIds', JSON.stringify(updatedLikedIds));
            }

            await axios.put(`http://localhost:8080/api/v1/songs/like/${id}`);
            setLiked(!liked);
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    return (
        <Link href={`/song/${id}`} 
            className="hover:bg-[#1e1e1e] mx-auto p-2 rounded-lg shadow-lg max-w-[240px] relative cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
        >
            <div 
                onClick={handleToggleLike} 
                className={`absolute top-3 right-3 cursor-pointer hover:scale-105 p-1 text-black bg-${liked ? 'red' : '[#1fdf64]'} rounded-full`}
            >
                {liked ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                )}
            </div>
            <Image
                src={src}
                alt="Card Image"
                width={300}
                height={300}
                className="rounded-md"
                priority
            />
            <div className="content-block">
                <h2 className="text-base my-2">{name}</h2>
                <p className="text-gray-400">{author}</p>
            </div>
        </Link>
    );
};

export default Card;
