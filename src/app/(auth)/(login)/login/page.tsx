//'use server'

import { auth, signIn } from "@/auth";
import { redirect } from 'next/navigation'



export default async function Login() {

    const session = await auth();
    

    if (session) {
      redirect('/') 
    }
  
    return (
      <div className="flex justify-center items-center h-screen">
        {!session && (
        <form action={async () => {
          'use server';
          await signIn('google', );// {callbackUrl: '/settings'}
        }}>
          <button
            className="border px-4 py-2 bg-ig-red text-blue rounded-lg"
            type="submit">Login with google
          </button>
        </form>
      )}
  
      </div>
    );
  }