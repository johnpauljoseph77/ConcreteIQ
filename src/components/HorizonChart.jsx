import { useEffect, useRef } from 'react'

/* Animated Horizon Model chart — vanilla SVG draw, mounted by React on the client.
   All DOM/window access is inside useEffect, so it is a no-op during SSR/pre-render. */
export default function HorizonChart() {
  const svgRef = useRef(null)
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    while (svg.firstChild) svg.removeChild(svg.firstChild)

    const SVG_W = 900, SVG_H = 480
    const M = { top: 34, right: 70, bottom: 52, left: 60 }
    const plotW = SVG_W - M.left - M.right
    const plotH = SVG_H - M.top - M.bottom
    const logMin = Math.log10(1), logMax = Math.log10(365)
    const xPos = (d) => M.left + (Math.log10(d) - logMin) / (logMax - logMin) * plotW
    const yPos = (v) => M.top + (1 - v / 100) * plotH
    const xTicks = [1, 3, 7, 14, 28, 56, 90, 180, 365]
    const yTicks = [0, 20, 40, 60, 80, 100]
    const observed = [{ d: 1, v: 32 }, { d: 3, v: 47 }, { d: 7, v: 58 }]
    const predicted = [
      { d: 7, v: 58.0 }, { d: 14, v: 64.0 }, { d: 28, v: 69.5 }, { d: 56, v: 71.0 },
      { d: 90, v: 71.6 }, { d: 180, v: 71.9 }, { d: 365, v: 72.1 }
    ]
    const bandAt = (d) => (d <= 28 ? 3.0 : 3.0 + ((Math.log10(d) - Math.log10(28)) / (Math.log10(365) - Math.log10(28))) * 5.0)

    const NS = 'http://www.w3.org/2000/svg'
    const el = (n, a) => { const x = document.createElementNS(NS, n); for (const k in a) x.setAttribute(k, a[k]); return x }
    const smooth = (pts) => {
      if (!pts.length) return ''
      let d = 'M' + pts[0].x.toFixed(1) + ',' + pts[0].y.toFixed(1)
      for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1], p1 = pts[i], cx = (p0.x + p1.x) / 2
        d += ' C' + cx.toFixed(1) + ',' + p0.y.toFixed(1) + ' ' + cx.toFixed(1) + ',' + p1.y.toFixed(1) + ' ' + p1.x.toFixed(1) + ',' + p1.y.toFixed(1)
      }
      return d
    }

    // grid + axes
    const g = el('g', {})
    yTicks.forEach((t) => {
      const y = yPos(t)
      g.appendChild(el('line', { x1: M.left, y1: y, x2: M.left + plotW, y2: y, stroke: '#2A3548', 'stroke-width': 1, opacity: t === 0 ? 1 : 0.4 }))
      const l = el('text', { x: M.left - 12, y: y + 4, fill: '#8892A4', 'font-family': 'IBM Plex Mono, monospace', 'font-size': 12, 'text-anchor': 'end' }); l.textContent = t; g.appendChild(l)
    })
    const yt = el('text', { x: 16, y: M.top + plotH / 2, fill: '#8892A4', 'font-family': 'IBM Plex Mono, monospace', 'font-size': 11, 'text-anchor': 'middle', transform: 'rotate(-90 16 ' + (M.top + plotH / 2) + ')', 'letter-spacing': '0.15em' }); yt.textContent = 'STRENGTH · MPa'; g.appendChild(yt)
    xTicks.forEach((t) => {
      const x = xPos(t)
      g.appendChild(el('line', { x1: x, y1: M.top, x2: x, y2: M.top + plotH, stroke: '#2A3548', 'stroke-width': 1, opacity: 0.22 }))
      const l = el('text', { x: x, y: M.top + plotH + 22, fill: '#8892A4', 'font-family': 'IBM Plex Mono, monospace', 'font-size': 12, 'text-anchor': 'middle' }); l.textContent = t + 'd'; g.appendChild(l)
    })
    svg.appendChild(g)

    // day 28 acceptance line
    const x28 = xPos(28)
    const accLine = el('line', { x1: x28, y1: M.top - 4, x2: x28, y2: M.top + plotH, stroke: '#8892A4', 'stroke-width': 1, 'stroke-dasharray': '2 4', opacity: 0 })
    svg.appendChild(accLine)
    const accLbl = el('text', { x: x28 + 6, y: M.top + 10, fill: '#8892A4', 'font-family': 'IBM Plex Mono, monospace', 'font-size': 10.5, opacity: 0, 'letter-spacing': '0.08em' }); accLbl.textContent = 'Standard acceptance test'; svg.appendChild(accLbl)

    // confidence band
    const bt = [], bb = []
    predicted.forEach((p) => { const hw = bandAt(p.d); bt.push({ x: xPos(p.d), y: yPos(p.v + hw) }); bb.push({ x: xPos(p.d), y: yPos(p.v - hw) }) })
    const botD = smooth(bb.slice().reverse()).replace(/^M/, ' L')
    const bandPath = el('path', { d: smooth(bt) + botD + ' Z', fill: '#4A7FA5', opacity: 0, stroke: 'none' })
    svg.appendChild(bandPath)

    // predicted dashed
    const predPts = predicted.map((p) => ({ x: xPos(p.d), y: yPos(p.v) }))
    const predPath = el('path', { d: smooth(predPts), fill: 'none', stroke: '#C8A96E', 'stroke-width': 2.4, 'stroke-dasharray': '7 6', 'stroke-linecap': 'round', opacity: 0 })
    svg.appendChild(predPath)

    // observed solid
    const obsPts = observed.map((p) => ({ x: xPos(p.d), y: yPos(p.v) }))
    const obsPath = el('path', { d: smooth(obsPts), fill: 'none', stroke: '#C8A96E', 'stroke-width': 3, 'stroke-linecap': 'round' })
    svg.appendChild(obsPath)

    const dotsG = el('g', { opacity: 0 })
    observed.forEach((p) => dotsG.appendChild(el('circle', { cx: xPos(p.d), cy: yPos(p.v), r: 4.5, fill: '#080C14', stroke: '#C8A96E', 'stroke-width': 2.2 })))
    svg.appendChild(dotsG)

    const annot = (d, v, txt) => {
      const grp = el('g', { opacity: 0 }); const cx = xPos(d), cy = yPos(v)
      grp.appendChild(el('circle', { cx, cy, r: 3.5, fill: '#C8A96E' }))
      const t = el('text', { x: cx, y: cy - 14, fill: '#E8E2D5', 'font-family': 'IBM Plex Mono, monospace', 'font-size': 12.5, 'text-anchor': d === 365 ? 'end' : 'middle' }); t.textContent = txt; grp.appendChild(t)
      return grp
    }
    const a28 = annot(28, 69.5, '69.5 MPa · ±3.0'); svg.appendChild(a28)
    const a365 = annot(365, 72.1, '72.1 MPa · ±8.0'); svg.appendChild(a365)

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia && window.matchMedia('(max-width:720px)').matches
    const fade = (node, dur, delay, to) => { node.style.transition = 'opacity ' + dur + 'ms ease ' + delay + 'ms'; requestAnimationFrame(() => { node.style.opacity = to }) }
    const setStatic = () => { obsPath.style.opacity = 1; predPath.style.opacity = 1; bandPath.style.opacity = 0.22; dotsG.style.opacity = 1; a28.style.opacity = 1; a365.style.opacity = 1; accLine.style.opacity = 0.7; accLbl.style.opacity = 0.85 }

    let done = false
    const run = () => {
      if (done) return; done = true
      if (reduce || isMobile) { setStatic(); return }
      const ol = obsPath.getTotalLength()
      obsPath.style.strokeDasharray = ol; obsPath.style.strokeDashoffset = ol
      obsPath.style.transition = 'stroke-dashoffset 1100ms ease'
      requestAnimationFrame(() => { obsPath.style.strokeDashoffset = 0 })
      fade(dotsG, 500, 700, 1)
      setTimeout(() => {
        const pl = predPath.getTotalLength()
        predPath.style.opacity = 1
        predPath.setAttribute('stroke-dasharray', pl)
        predPath.style.strokeDashoffset = pl
        predPath.style.transition = 'stroke-dashoffset 1400ms ease'
        requestAnimationFrame(() => { predPath.style.strokeDashoffset = 0 })
        setTimeout(() => { predPath.style.transition = 'none'; predPath.style.strokeDashoffset = 0; predPath.setAttribute('stroke-dasharray', '7 6') }, 1450)
      }, 1150)
      fade(bandPath, 900, 2500, 0.22)
      accLine.style.transition = 'opacity 700ms ease 2700ms'; accLbl.style.transition = 'opacity 700ms ease 2800ms'
      requestAnimationFrame(() => { accLine.style.opacity = 0.7; accLbl.style.opacity = 0.85 })
      fade(a28, 600, 3100, 1); fade(a365, 600, 3300, 1)
    }

    if (isMobile || reduce) { setStatic(); done = true; return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { run(); io.disconnect() } })
    }, { threshold: 0.35 })
    io.observe(svg)
    return () => io.disconnect()
  }, [])

  return (
    <div className="border border-gold/40 rounded-[2px] bg-panel p-5 md:p-7 my-12">
      <div className="font-mono text-[11px] text-blue tracking-[0.08em] mb-4">
        Fig. 1 — Horizon Model · Representative CEM II mix · UAE climate
      </div>
      <svg id="chart" ref={svgRef} viewBox="0 0 900 480" preserveAspectRatio="xMidYMid meet"
           role="img" aria-label="Concrete compressive strength prediction curve, Day 1 to Day 365" />
    </div>
  )
}
