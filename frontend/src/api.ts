const API = import.meta.env.VITE_API_URL || (typeof __API__ !== 'undefined' ? (__API__ as string) : 'http://localhost:8000');

export async function health(){
  const r = await fetch(`${API}/health`);
  if (!r.ok) throw new Error(`Health error: ${r.status}`);
  return r.json();
}

export async function compute(volumen:number, temperatura:number){
  const r = await fetch(`${API}/compute`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ volumen, temperatura })
  });
  if (!r.ok) throw new Error((await r.json()).detail ?? `HTTP ${r.status}`);
  return r.json();
}

export async function getResults(){
  const r = await fetch(`${API}/results`);
  if (!r.ok) throw new Error(`Results error: ${r.status}`);
  return r.json();
}

