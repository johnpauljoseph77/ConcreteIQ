import { useState, useEffect } from 'react'

const NAV = [
  ['PROBLEM', 'problem'],
  ['PRODUCT', 'product'],
  ['MODEL', 'horizon'],
  ['MARKET', 'market'],
  ['TRACTION', 'traction'],
  ['TEAM', 'team']
]

export default function Nav() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 })
    NAV.forEach(([, id]) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/95 backdrop-blur-sm">
      <div className="mx-auto max-w-[1080px] px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-display font-bold text-parchment text-xl linkglow">ConcreteIQ</a>
        <div className="hidden md:flex items-center gap-7 font-mono text-[12px] tracking-[0.14em]">
          {NAV.map(([txt, id]) => (
            <a key={id} href={'#' + id}
               className={'navlink ' + (active === id ? 'active text-gold' : 'text-parchment/70')}>
              {txt}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
