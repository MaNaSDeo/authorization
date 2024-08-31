"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main id="landingPage">
      <button className="gtLgnPage" onClick={() => router.push("/login")}>
        Go To Login Page
      </button>
    </main>
  );
}
