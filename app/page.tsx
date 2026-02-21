"use client"

import { useEffect, useState } from "react";
interface Citation { id: number; cite: string; auteur: string; date: string}

export default function Home() {
  const [citations, setCitations] = useState<Citation[]>([]);

  useEffect(() => {
    async function fetchCitations() {
      try {
        const res = await fetch("/api/citations");
        const data = await res.json();
        setCitations(data);
      } catch (error) {
        console.error("Erreur lors du fetch :", error);
      }
    }
    fetchCitations();
  }, []);

  return(
    <div className="w-full h-screen">
      <div className="p-1 m-3 justify-end flex align-middle ">
        <input type="button" value="create citation" />
      </div>
      
        <div className="m-3">
          <form action="/api/citations" method="POST">
            <input type="text" placeholder="ajouter citation" name="cite" className="w-full p-2" />
            <input type="text" placeholder="auteur de la citation"name="auteur" className="w-full p-2" />
            <input type="submit" value="add" className=" mt-3 p-1 w-15 rounded bg-[#b8860b] text-[#FFFFFF]" src="http://localhost:3000/"/>
          </form>

        </div>
      {citations.map((citation) => (
        <div key={citation.id} className="m-3 p-1 pl-5 border rounded border-[#808080]">
          <p className="font-bold text-2xl">{citation.cite}</p>
          <cite>{citation.auteur}</cite>- <p>{citation.date}</p>
        </div>
      ))}

          
  
    </div>
  )
}