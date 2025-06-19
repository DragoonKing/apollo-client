// app/api/add-doctor/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch("https://codecollabhub-beld.onrender.com/api/add-doctor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
