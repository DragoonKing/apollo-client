// src/app/api/list-doctor-with-filter/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const baseUrl = "https://codecollabhub-beld.onrender.com/api/list-doctor-with-filter";
  const queryString = searchParams.toString();

  try {
    const response = await fetch(`${baseUrl}?${queryString}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 });
  }
}
