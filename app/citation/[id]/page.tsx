import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link"; // 1. Importe Link

const prisma = new PrismaClient();

export default async function CitationPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  const citation = await prisma.citations.findUnique({
    where: { id: parseInt(id) },
  });

  if (!citation) return notFound();

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="no-underline hover:text-[#eceae3] flex items-center gap-2">
           <button className="border rounded p-1 bg-[#eceae3] hover:bg-black">Retour</button>
        </Link>
      </div>

      <div className="p-6 border rounded-lg shadow-sm border-[#808080]">
        <h1 className="text-4xl font-serif mb-4">{citation.cite}</h1>
        <cite className="text-xl text-[#b8860b]">{citation.auteur}</cite>
        <p className="mt-4 text-sm text-gray-400">
            Publié le {new Date(citation.date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
