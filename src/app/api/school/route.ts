import { NextRequest } from "next/server";
import { db } from "@/lib/db";


export async function GET(request: NextRequest) {
  try {
    const [schools] = await db.execute('SELECT * FROM `schools`');
    return new Response(JSON.stringify(schools), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Error fetching schools" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const { name, address, city, state, contact, image, email_id } = body;

    if (!name || !email_id || !city||  !state|| !contact || !image || !email_id ) {
      return new Response(JSON.stringify({ message: "name, address, city, state, contact, image, email_id are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }


    await db.execute(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, image, email_id]
    );

    return new Response(JSON.stringify({ message: "School added successfully" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Error saving school" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


