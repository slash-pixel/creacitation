import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const citation = await prisma.citations.findMany();
    return NextResponse.json(citation, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "errreur get" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try{
    const json = await request.json();

    const newCitation = await prisma.citations.create({
      data: {
        auteur: json.auteur,
        cite: json.cite,
      },

    });
    return NextResponse.json({citation: newCitation,} );
    
}catch(error){
  console.error(error);
  return NextResponse.json({error:"erreur post"},{ status:500})
}
}