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

    const json = await request.json();
    console.log(json);
    await new Promise((r)=>setTimeout(r,1000))

    const newCitation = await prisma.citations.create({
      data: {
        auteur: json.auteur,
        cite: json.cite
      }

    });
    return NextResponse.json({citation: newCitation,} );
    
}
