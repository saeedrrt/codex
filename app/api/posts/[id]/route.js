import { NextResponse } from 'next/server';

let posts = [];

export async function GET(request, { params }) {
  const post = posts.find(p => p.id === params.id);
  if (!post) return NextResponse.json({ message: 'Not Found' }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(request, { params }) {
  const index = posts.findIndex(p => p.id === params.id);
  if (index === -1) return NextResponse.json({ message: 'Not Found' }, { status: 404 });
  const data = await request.json();
  posts[index] = { ...posts[index], ...data };
  return NextResponse.json(posts[index]);
}

export async function DELETE(request, { params }) {
  const index = posts.findIndex(p => p.id === params.id);
  if (index === -1) return NextResponse.json({ message: 'Not Found' }, { status: 404 });
  const removed = posts.splice(index, 1);
  return NextResponse.json(removed[0]);
}
