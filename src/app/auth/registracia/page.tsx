// src/app/auth/registracia/page.tsx
"use client"; // This marks the component as a client component

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Updated import for navigation

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // For navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would typically call an API to register the user
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Registration was successful, you can sign in the user or redirect them
      await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      router.push('/dashboard'); // Redirect to the dashboard after successful registration
    } else {
      console.error('Registration failed', data);
      // Optionally handle error feedback
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationPage;
