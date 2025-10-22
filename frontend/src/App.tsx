import { useEffect, useMemo, useState } from 'react'
import { compute, getResults, health } from './api'

type ResultRow = { id:number; label:string; value:number; unit:string }

export default function App(){
  const [volumen, setVolumen] = useState<string>('10')
  const [temperatura, setTemperatura] = useState<string>('25')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rows, setRows] = useState<ResultRow[] | null>(null)
  const apiUrl = useMemo(() => (import.meta.env.VITE_API_URL ?? 'http://localhost:8000'), [])

  useEffect(() => {
    health().catch(()=>{})
    refresh()
  }, [])

  async function refresh(){
    setError(null)
    try {
      const data = await getResults()
      setRows(data)
    } catch (e:any) {
      setRows([])
      setError(e?.message ?? 'Error cargando resultados')
    }
  }

  async function onCalcular(){
    setLoading(true)
    setError(null)
    try {
      const v = parseFloat(volumen)
      const t = parseFloat(temperatura)
      if (!isFinite(v) || !isFinite(t)) throw new Error('Entradas inválidas')
      await compute(v, t)
      await refresh()
    } catch (e:any) {
      setError(e?.message ?? 'Error en cálculo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{fontFamily:'Inter, system-ui, sans-serif', maxWidth: 720, margin: '24px auto', padding: 16}}>
      <h1 style={{margin: 0}}>HackMTY Frontend</h1>
      <p style={{color:'#555'}}>API: {apiUrl}</p>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr auto', gap: 12, alignItems:'end'}}>
        <div>
          <label>Volumen (m³)</label>
          <input
            value={volumen}
            onChange={e=>setVolumen(e.target.value)}
            placeholder="m³ > 0"
            type="number"
            step="0.01"
            min="0"
            style={{width:'100%', padding:8, border:'1px solid #ccc', borderRadius:8}}
          />
        </div>
        <div>
          <label>Temperatura (°C)</label>
          <input
            value={temperatura}
            onChange={e=>setTemperatura(e.target.value)}
            placeholder="> -273.15"
            type="number"
            step="0.1"
            style={{width:'100%', padding:8, border:'1px solid #ccc', borderRadius:8}}
          />
        </div>
        <button onClick={onCalcular} disabled={loading} style={{padding:'10px 16px', background:'#2563EB', color:'#fff', border:0, borderRadius:8, cursor:'pointer'}}>
          {loading ? 'Calculando…' : 'Calcular'}
        </button>
      </div>

      {error && (
        <div style={{marginTop:12, color:'#EF4444'}}>Error: {error}</div>
      )}

      <h2 style={{marginTop:24}}>Resultados recientes</h2>
      {!rows && <div>Cargando…</div>}
      {rows && rows.length === 0 && <div>Vacío</div>}
      {rows && rows.length > 0 && (
        <div style={{display:'grid', gap:8}}>
          {rows.map(r => (
            <div key={r.id} style={{display:'grid', gridTemplateColumns:'auto 1fr auto', gap:12, alignItems:'center', border:'1px solid #eee', borderRadius:8, padding:12}}>
              <div style={{fontWeight:600}}>{r.label}</div>
              <div style={{color:'#111'}}>{r.value.toFixed(4)}</div>
              <div style={{color:'#555'}}>{r.unit}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{marginTop:24, fontSize:12, color:'#666'}}>Estados: cargando/vacío/error incluidos.</div>
    </div>
  )
}

