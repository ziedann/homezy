import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (![email, password].every(Boolean)) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const res = await fetch(`https://68c23541f9928dbf33ed9465.mockapi.io/api/v1/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const users = await res.json();

    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const { password: _, ...safeUser } = user;
    return NextResponse.json(safeUser, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
