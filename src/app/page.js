import Link from "next/link"

export default function Home() {
  return (
    <main >
      <h1>API Call from mongodb cloud database (Atlas)</h1>
      <br />
      <br />
      <Link href='/user'>Add user</Link>
      <br />
      <Link href='/getuser'>All users detail</Link>
    </main>
  )
}
