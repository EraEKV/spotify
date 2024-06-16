"use client"

import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
// import { Link } from "lucide-react"
import Link from 'next/link'
import { useState } from "react"
import { useRouter } from "next/navigation"

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const { accessToken } = data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('playlists', data.user.playlists);
      localStorage.setItem('userId', data.user._id);
      localStorage.setItem('liked', data.user.likedSongs);
      router.push('/');
    } catch (error: any) {
      setError(error.message);
    }
  };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-950">
        <Card className="w-full max-w-md px-4 pb-4 bg-white shadow-lg">
            <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
            <CardDescription className="text-gray-500 text-center">
                Enter your datas to access your account.
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="m@example.com" required type="text" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Username</Label>
                <Input id="email" placeholder="Alidar" required type="text" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" required type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            </CardContent>
            <p className="px-6 pb-4">Already have an account? <Link className="underline " href="/login" >Login</Link> </p>
            <CardFooter>
            
            <Button className="w-full">Sign Up</Button>
            </CardFooter>
        </Card>
        </div>
    )
}

export default Register