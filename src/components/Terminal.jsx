const STATUS = [
  ['live', 'LIVE', 'data_pipeline', 'processing real UAE lab records'],
  ['live', 'LIVE', 'machine_integration', 'Cyber-Plus Evolution · direct USB export'],
  ['live', 'LIVE', 'checksum_verification', 'tamper-evident · per-cube cryptographic seal'],
  ['live', 'LIVE', 'backend_ledger', '17 tables · Supabase · row-level security'],
  ['live', 'LIVE', 'prediction_sandbox', 'XGBoost · accepting early-age inputs'],
  ['active', 'ACTIVE', 'horizon_model', '365-day trajectory · calibrating'],
  ['active', 'ACTIVE', 'dataset_growth', '300 cubes/day · 1 branch · scaling to 7'],
  ['draft', 'DRAFT', 'dpp_export', 'CPR / EPD schema · structured'],
  ['draft', 'PIPELINE', 'eiac_validation', 'ISO 17025 supplementary tool pathway'],
  ['draft', 'PIPELINE', 'khalifa_university', 'independent validation study · discussions']
]

export default function Terminal() {
  const dotColor = { live: '#4ade80', active: '#C8A96E', draft: '#5a6678' }
  const stateColor = { live: 'text-[#4ade80]', active: 'text-gold', draft: 'text-[#8892A4]' }
  return (
    <div className="bg-termbg border border-termborder rounded-[2px] p-5 md:p-7 my-12 overflow-x-auto font-mono text-[12.5px] md:text-[13px] leading-relaxed">
      {STATUS.map((r, i) => (
        <div key={i}
             className={'flex items-center gap-4 whitespace-nowrap px-3 py-1.5 ' + (i % 2 === 0 ? 'bg-panel' : 'bg-transparent')}>
          <span className={'w-2 h-2 rounded-full flex-none ' + (r[0] === 'live' ? 'dot-live' : '')}
                style={{ background: dotColor[r[0]] }} />
          <span className={'w-[8ch] flex-none ' + stateColor[r[0]]}>{r[1]}</span>
          <span className="w-[22ch] flex-none text-parchment">{r[2]}</span>
          <span className="text-[#8892A4]">{r[3]}</span>
        </div>
      ))}
    </div>
  )
}
