import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const citation = await prisma.citations.findMany();
    return NextResponse.json(citation, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "fail to fetch citation" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const cite = formData.get("cite") as string;
    const auteur = formData.get("auteur") as string;

    if (!cite || !auteur) {
      return NextResponse.json({ error: "citation or author is required" }, { status: 400 });
    }

    const newCitation = await prisma.citations.create({
      data: { cite, auteur },
    });

    return NextResponse.json(newCitation, { status: 201 });
  } catch (error) {
    console.error("failed to create citation", error);
    return NextResponse.json({ error: "failed to create citation" }, { status: 500 });
  }
}
