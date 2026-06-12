import { useState, useEffect, useRef } from 'react'

/* Reveal — scroll-triggered fade-up */
export function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { node.classList.add('in'); io.unobserve(node) }
      })
    }, { threshold: 0.15 })
    io.observe(node)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={'reveal ' + className} style={{ transitionDelay: delay + 'ms' }}>
      {children}
    </div>
  )
}

/* Highlight bar — the skimmable layer */
export function Highlight({ children }) {
  return (
    <div className="bg-panel border-l-[3px] border-gold px-6 py-5 mb-12">
      <p className="font-display italic text-gold text-[22px] md:text-[28px] leading-snug">
        {children}
      </p>
    </div>
  )
}

export function Label({ children }) {
  return (
    <div className="font-mono text-blue text-[11px] tracking-[0.22em] uppercase mb-5">
      {children}
    </div>
  )
}

export function Heading({ children }) {
  return (
    <h2 className="font-display font-bold text-parchment text-[28px] md:text-[42px] leading-[1.12] mb-8">
      {children}
    </h2>
  )
}

/* Stat row — gold numbers, blue labels, gold dividers */
export function StatRow({ stats }) {
  return (
    <div className="flex flex-wrap justify-center my-14 border-y border-termborder/70 py-9">
      {stats.map((s, i) => (
        <div
          key={i}
          className={'flex-1 min-w-[150px] px-6 text-center ' + (i > 0 ? 'border-l border-gold/30' : '')}
        >
          <div className="font-mono text-gold text-3xl md:text-[2.4rem] leading-none">{s.num}</div>
          <div className="font-mono text-blue text-[10.5px] tracking-[0.16em] uppercase mt-3 leading-snug">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

/* Expandable — Read more collapsible */
export function Expandable({ children }) {
  const [open, setOpen] = useState(false)
  const [h, setH] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    setH(open ? ref.current.scrollHeight : 0)
  }, [open])
  useEffect(() => {
    function onResize() { if (open && ref.current) setH(ref.current.scrollHeight) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open])

  return (
    <div className="mt-10">
      <button className="readmore" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {open ? '− READ LESS' : '+ READ MORE'}
      </button>
      <div style={{ maxHeight: h, overflow: 'hidden', transition: 'max-height .5s ease' }}>
        <div ref={ref} className="pt-8 space-y-6">{children}</div>
      </div>
    </div>
  )
}

export function Section({ id, children }) {
  return (
    <section id={id} className="py-[120px] border-t border-termborder/40">
      <div className="mx-auto max-w-[720px] px-6">{children}</div>
    </section>
  )
}

export const P = ({ children }) => <p className="text-parchment/90 mb-6">{children}</p>
