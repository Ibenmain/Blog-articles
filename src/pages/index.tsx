import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import Head from 'next/head';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-screen h-fit flex flex-col">
      <Head>
        <title>My Landing Page</title>
        <meta name="description" content="Welcome to our landing page!" />
      </Head>
      <header className="w-full py-4 bg-white shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-gray-800">My Website</h1>
          <div className="space-x-4">
            <Button onClick={() => {router.push('/auth/sign-in')}} variant="outline">Login</Button>
            <Button onClick={() => {router.push('/auth/sign-up')}} variant="default">Register</Button>
          </div>
        </div>
      </header>

      <main className="h-full flex-grow w-full pt-16 bg-gray-50 flex flex-col items-center justify-center">
        <section className="w-full text-center py-20">
          <h1 className="text-5xl font-bold text-gray-800">Welcome to Our Platform</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing features and services that will boost your productivity.
          </p>
          <Button className="mt-6" variant="outline">Get Started</Button>
        </section>
      </main>

      <footer className="w-full fixed bottom-0 py-6 text-center bg-gray-100">
        <p className="text-gray-600">© 2024 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
}
