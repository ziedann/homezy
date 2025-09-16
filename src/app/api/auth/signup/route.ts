import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json();

    if (![firstName, lastName, email, password].every(Boolean)) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const apiRes = await fetch(`${process.env.NEXT_PUBLIC_MOCK_API_URL}/users`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      }
    );

    const data = await apiRes.json();

    return apiRes.ok
      ? NextResponse.json(data, { status: 201 })
      : NextResponse.json(
          { message: "Failed to register user", error: data },
          { status: apiRes.status }
        );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
