import Link from "next/link";

export default function Test() {
  return (
    <>
      <h1>Test</h1>
      <ul className="flex flex-row items-center gap-4">
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/test">Test</Link>
        </li>
      </ul>
    </>
  );
}
