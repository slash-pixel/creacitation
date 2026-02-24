"use client"
import Link from "next/link"
import {useState, useEffect} from "react";

interface Citation {
  id: number;
  cite: string;
  auteur: string;
  date: string;
}

export default function Home() {
  const [loading,setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [citations, setCitations] = useState<Citation[]>([]);

  
  useEffect(() => {
    async function fetchCitations() {
      const res = await fetch("/api/citations");
      const data: Citation[] = await res.json();
      setCitations(data);
    }
    fetchCitations();
  }, []);

  const createCitation = async (formData: FormData)=>{
    setLoading(true)
    const result = await fetch ('/api/citations', {
      body: JSON.stringify({
        cite: formData.get("cite"),
        auteur: formData.get("auteur"),
      }),
      method:"POST",
      headers: { "Content-Type": "application/json" }
    })
    const json = await result.json();
  
    setCitations(prev => [...prev, json.citation]);
    setLoading(false)
  }

  return(
    <div className="w-full h-screen">
      <div className="p-1 m-3 justify-end flex align-middle ">
          <input type="button" value="create citation" onClick={() => setShowForm(!showForm)}
        />
      </div>
      
      {showForm && (  
        <div className="m-3">
          <form action={async (formData)=>{
            await createCitation(formData)
          }} >
            <input type="text" placeholder="ajouter citation" name="cite" className="w-full p-2" />
            <input type="text" placeholder="auteur de la citation" name="auteur" className="w-full p-2" />
            <input type="submit" disabled={loading} value="add" className=" mt-3 p-1 w-15 rounded bg-[#b8860b] text-[#FFFFFF]"/>
          </form>
        </div>
      )}
{citations.map(c => (
  <Link href={`/citation/${c.id}`} key={c.id}>
    <div className="m-3 p-1 pl-5 border rounded border-[#808080] hover:bg-gray-100 cursor-pointer">
      <p className="font-bold text-2xl">{c.cite}</p>
      <cite>{c.auteur}</cite> - <p>{new Date(c.date).toLocaleDateString()}</p>
    </div>
  </Link>
))}

    </div>
  )
}
