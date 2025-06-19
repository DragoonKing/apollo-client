// pages/index.tsx
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/doctors/general-physician-internal-medicine");
  }, [router]);

  return null;
}
