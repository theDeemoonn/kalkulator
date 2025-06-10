import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-6">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/my-project">My Project</Link>
      <Link href="/result">Result</Link>
      <Link href="/login">Login</Link>
    </main>
  );
}
