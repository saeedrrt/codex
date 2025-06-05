import { NextResponse } from 'next/server';

let posts = [];

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(request) {
  const data = await request.json();
  const newPost = { id: Date.now().toString(), ...data };
  posts.push(newPost);
  return NextResponse.json(newPost, { status: 201 });
}
