import Nav from './components/Nav.jsx'
import Terminal from './components/Terminal.jsx'
import HorizonChart from './components/HorizonChart.jsx'
import { Reveal, Highlight, Label, Heading, StatRow, Expandable, Section, P } from './components/ui.jsx'

export default function App() {
  return (
    <div id="top">
      <Nav />

      {/* HERO — always fully open */}
      <section className="min-h-screen flex items-center pt-28 pb-24">
        <div className="mx-auto max-w-[760px] px-6 w-full">
          <Reveal>
            <h1 className="font-display font-bold text-parchment leading-[1.05] mb-10"
                style={{ fontSize: 'clamp(3rem, 8vw, 6.2rem)' }}>
              Every concrete pour is a 28-day bet. ConcreteIQ settles it in a week.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <div className="max-w-[720px] space-y-6">
              <P>The global construction industry pours 14 billion cubic metres of concrete every year and accepts the results 28 days later — after the structure is already built. Every column, every foundation, every tunnel segment is a commitment made on incomplete information. The industry has operated this way for over a century because no alternative existed. ConcreteIQ is that alternative.</P>
              <P>We are building the first machine learning platform trained on real UAE construction lab data to predict compressive strength and durability outcomes from early-age readings. Our pipeline connects directly to crushing machines, extracts tamper-evident test records, and produces predictions before the 28-day result arrives — giving engineers, contractors, and lab managers a three-week early warning system for structural risk.</P>
              <P>The platform is live. The data pipeline is processing real records from active UAE construction projects. The training dataset includes concrete pours from Dubai Metro Blue Line, major high-rise foundations, and tunnel infrastructure across the UAE. This is not a proof of concept.</P>
            </div>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-12 max-w-[720px] divide-y divide-termborder/70 border-y border-termborder/70 font-mono text-[14px]">
              <div className="flex items-baseline gap-4 py-3">
                <span className="text-gold text-[1.3rem] min-w-[6ch]">$130B+</span>
                <span className="text-[#8892A4]">· GCC annual construction market</span>
              </div>
              <div className="flex items-baseline gap-4 py-3">
                <span className="text-gold text-[1.3rem] min-w-[6ch]">0</span>
                <span className="text-[#8892A4]">· Predictive analytics platforms serving it</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROBLEM */}
      <Section id="problem">
        <Reveal><Highlight>The UAE has no shortage of concrete testing data — it has simply never been connected, and the structural risk hides in that gap.</Highlight></Reveal>
        <Reveal delay={120}>
          <Label>§ 01 — The Problem</Label>
          <Heading>A century-old workflow generating real-time risk.</Heading>
          <P>Material testing laboratories across the UAE test every concrete pour for structural compliance — compressive strength at 3, 7, and 28 days, plus durability tests for chloride resistance, water penetration, and absorption. Hundreds of reports a month flow through a single laboratory network. The data exists in abundance; what's missing is any layer that connects it, cross-references it, or predicts from it.</P>
          <StatRow stats={[
            { num: '14B m³', label: 'concrete poured globally each year' },
            { num: '~8%', label: 'pours fail strength on first test' },
            { num: '28 days', label: 'until the result arrives' },
            { num: '2003', label: 'era of incumbent lab software' }
          ]} />
          <Expandable>
            <P>The problem is that this data has never been connected. Strength results sit in one Excel file. Durability results sit in another. Same concrete pour. Same structural element. Different reports, different reference numbers, never cross-referenced. The lab produces a 28-day result and files it. No one asks whether the 3-day reading predicted this outcome. No one asks whether the durability test failure could have been flagged three weeks earlier.</P>
            <P>The consequence is structural risk hidden in plain sight. Approximately 8% of concrete pours fail to meet specified strength on first test. In a market building infrastructure at the scale of Dubai 2040 — projecting population growth from 3.3 million to 5.8 million by 2040 — that failure rate compounds into significant remediation cost, project delays, and in the most serious cases, long-term structural liability.</P>
            <P>The software managing this data was built in the early 2000s. No machine learning. No predictive layer. No cross-referencing between test types. Digital filing cabinets. The labs running compliance testing for the tallest buildings in the world are operating with the analytical infrastructure of a mid-tier accounting firm from 2003.</P>
          </Expandable>
        </Reveal>
      </Section>

      {/* PRODUCT */}
      <Section id="product">
        <Reveal><Highlight>ConcreteIQ predicts the 28-day result from early-age readings — prediction, not confirmation — on data the lab already collects.</Highlight></Reveal>
        <Reveal delay={120}>
          <Label>§ 02 — The Product</Label>
          <Heading>Prediction, not confirmation.</Heading>
          <P>ConcreteIQ is an end-to-end machine learning pipeline that extracts, cleans, merges, and models concrete test data from UAE laboratory records. It reads raw Excel reports straight from the lab's existing workflow — no new instruments, no process changes, no infrastructure spend from the customer — and handles the messy reality of real lab data: inconsistent layouts, ghost template rows, age-unit misclassification, specimen deduplication, and five different durability test formats in the same folder.</P>
          <Expandable>
            <P>The extraction layer processes compressive strength reports and durability reports separately, then joins them on a shared client reference number — the unique identifier that links every pour to its project, its contractor, and its specification. The result is a merged dataset of 14 features per concrete pour: casting date, class of concrete, mix design, density, 3-day strength, 7-day strength, 28-day strength, concrete temperature, RCPT average charge passed, chloride migration coefficient, water penetration depth, initial surface absorption, and water absorption percentage.</P>
            <P>The prediction model — currently a calibrated XGBoost regressor — takes early-age readings at day 3 or day 7 and predicts the 28-day durability outcome before the official result exists. The model is trained exclusively on proprietary UAE construction lab data, making it the only concrete durability prediction model calibrated for UAE climate conditions, UAE mix designs, and UAE construction practice.</P>
            <P>The tamper-evident data pipeline is a core product feature, not an afterthought. Crushing machines at the partner laboratories export raw test files containing a machine-generated checksum for every cube crushed. ConcreteIQ ingests these files directly, stores the checksum as an immutable seal, and flags any result where the checksum does not match the stored value. In an industry where result manipulation is a known risk — labs occasionally alter results to help clients pass compliance thresholds — a cryptographically verifiable test record is a meaningful differentiator.</P>
            <P>The output is a clean CSV dataset and, in the current build, a desktop application that any lab staff member can run without technical training. The roadmap takes this output to a full Digital Product Passport — a portable, verifiable compliance record for every concrete pour, structured for EU Construction Products Regulation compatibility and exportable as a primary-data Environmental Product Declaration.</P>
          </Expandable>
        </Reveal>
      </Section>

      {/* HORIZON MODEL */}
      <Section id="horizon">
        <Reveal><Highlight>From one week of data to a year of confidence: a full 365-day strength and durability trajectory, with uncertainty shown honestly.</Highlight></Reveal>
        <Reveal delay={120}>
          <Label>§ 03 — The Horizon Model</Label>
          <Heading>From one week of data to a year of confidence.</Heading>
          <P>The 28-day compressive strength test answers one question on one day. Our engineering goal is the entire curve: a learned regression that maps early-age readings onto a 365-day trajectory of structural strength and chloride permeability — the two metrics that actually govern whether a structure lasts a decade or a century.</P>
        </Reveal>
        <Reveal delay={180}><HorizonChart /></Reveal>
        <Reveal delay={120}>
          <Expandable>
            <P>Concrete durability in the UAE faces an adversarial environment that most markets do not. Ambient temperatures exceeding 40°C in summer. Coastal chloride exposure from the Gulf penetrating the concrete matrix and corroding steel reinforcement. High humidity cycles causing expansion and contraction. Ground conditions with elevated sulphate content. A concrete element can pass its 28-day strength test and fail structurally within 15 years from chloride-induced corrosion. Strength and durability are not the same problem, and the GCC market has never had a tool that treats them as connected.</P>
            <P>The Horizon Model resolves this. It takes the density, early-age strength, mix design, and exposure class of any pour and produces a full strength trajectory with calibrated confidence intervals — the shaded band in the chart above. The interval widens honestly with the extrapolation horizon, because the difference between a model and a guess is whether it shows its uncertainty.</P>
            <P>The physics layer extends the ML prediction forward using Fick's Second Law of Diffusion — the industry-standard equation for modelling chloride ingress through concrete over time. The RCPT charge passed and chloride migration coefficient predicted by the ML model become inputs to the diffusion model, which outputs a probability distribution of chloride penetration depth at any future time horizon. The result is not a single number but a service life estimate: the probability that chloride reaches the reinforcement within a given number of years under specified exposure conditions.</P>
            <P>This combination — ML prediction of early-age outcomes feeding a calibrated physics model for long-term service life — is not available in any commercial product currently serving the GCC market. It is the subject of active academic research globally, consistently blocked by the same constraint: insufficient real field data. ConcreteIQ's proprietary dataset from an active UAE laboratory network is the resource that unlocks it.</P>
          </Expandable>
        </Reveal>
      </Section>

      {/* DATA MOAT */}
      <Section id="moat">
        <Reveal><Highlight>The moat is not the algorithm. It is proprietary field data from an active UAE laboratory network that no competitor can replicate.</Highlight></Reveal>
        <Reveal delay={120}>
          <Label>§ 04 — The Data Moat</Label>
          <Heading>The asset that cannot be replicated.</Heading>
          <P>Every machine learning model is only as good as the data it was trained on, and in concrete durability prediction, data is the entire problem. The research has been published since the mid-1990s; the deployment has not, because nobody outside an operating laboratory has access to real field data. ConcreteIQ does — and that access is the company.</P>
          <Expandable>
            <P>Academic researchers have been publishing ML models for concrete strength prediction since the mid-1990s. A 2024 review covering the field from 2013 to 2024 noted heavy reliance on laboratory-synthesised datasets, limited use of field data, and scarcity of newly generated datasets — with most studies utilising existing literature-based datasets and few contributing novel data. The research has been done. The deployment has not, because nobody outside an operating laboratory has access to real field data.</P>
            <P>ConcreteIQ's training dataset is drawn from the active records of a multi-branch material testing laboratory network operating across seven locations in the UAE. The dataset covers real concrete pours from real construction projects: Dubai Metro Blue Line, tunnel segments, high-rise foundations, marine infrastructure, and residential developments across the emirate. This is not scraped data. It is not synthetic. It is the test record of the built environment of one of the most active construction markets in the world.</P>
            <P>The data advantage compounds over time. Every pour tested at any branch in the network from this point forward enters the training pipeline. At approximately 300 cubes crushed per day per branch across the network, the dataset grows at a rate no external competitor can replicate without establishing equivalent laboratory relationships. The moat is not the algorithm — the algorithm is table stakes. The moat is the data, and the data requires being inside the industry.</P>
            <P>The founder is inside the industry. ConcreteIQ was built by the person processing these test records every day, who identified the data gap from within, built the extraction pipeline from direct observation of the lab's actual workflow, and has direct access to seven branches of active testing data as the product scales. This is the origin story that cannot be copied: the insight came from the access, and the access came from being in the room.</P>
          </Expandable>
        </Reveal>
      </Section>

      {/* MARKET */}
      <Section id="market">
        <Reveal><Highlight>A $130B+ GCC construction market with no predictive-analytics incumbent, accelerated by an EU regulatory wave arriving within the decade.</Highlight></Reveal>
        <Reveal delay={120}>
          <Label>§ 05 — The Market</Label>
          <Heading>The GCC construction market is the beachhead. The regulatory wave is the scale.</Heading>
          <P>The GCC construction market generates over $130 billion in annual project value, executing the largest sustained infrastructure programme in the world — NEOM, Dubai 2040, FIFA World Cup legacy projects, Vision 2030. Every structural element is tested by a material testing laboratory under legal compliance requirements. There is no opt-out, and there is no incumbent serving these labs with predictive analytics.</P>
          <StatRow stats={[
            { num: '$130B+', label: 'GCC annual construction value' },
            { num: '0', label: 'predictive analytics incumbents' },
            { num: '2029', label: 'EU Digital Product Passport mandate' },
            { num: '6', label: 'GCC nations building at scale' }
          ]} />
          <Expandable>
            <P>The material testing lab industry in the GCC is fragmented, underfunded on technology, and completely unserved by predictive analytics. The primary software platforms in use were built before machine learning existed as a commercial technology. There is no incumbent. There is no entrenched competitor defending territory with data network effects or switching costs. The market is open.</P>
            <P>The regulatory environment accelerates the opportunity. The European Union's Ecodesign for Sustainable Products Regulation, which came into force in 2024, mandates Digital Product Passports for construction materials by 2029. Iron and steel requirements begin in 2028. Concrete follows. The UAE has historically adopted EU construction standards — BS EN specifications, ISO 17025 accreditation, CE marking frameworks — within three to five years of European adoption. A Digital Material Passport for concrete will become a compliance requirement in the GCC within the decade. ConcreteIQ is building that infrastructure now.</P>
            <P>The competitive landscape is thin. ConcreteAI, a Singapore-based hardware startup backed by NUS and Enterprise Singapore, has deployed sensors for real-time in-situ strength monitoring. Their approach requires physical hardware deployed on every pour, answers a different question (is the structure strong enough to remove formwork?), and serves a different customer (site engineers, not testing labs). ConcreteIQ is pure software, requires no new hardware, works on data already being collected, and targets a different buyer. These are complementary products operating in the same industry, not competing for the same customer.</P>
          </Expandable>
        </Reveal>
      </Section>

      {/* BUSINESS MODEL */}
      <Section id="business">
        <Reveal><Highlight>Three revenue layers — SaaS to labs, per-report risk scores, per-pour passports — all feeding one compounding data flywheel.</Highlight></Reveal>
        <Reveal delay={120}>
          <Label>§ 06 — Business Model</Label>
          <Heading>Three revenue layers, one data flywheel.</Heading>
          <P>The primary revenue model is SaaS subscription to material testing laboratories — a monthly fee per branch for the prediction platform, dataset management, and Digital Material Passport generation. The pitch to the lab is simple: predictive intelligence on top of tests they already run, at a price far below the cost of a single structural remediation event, and immediately defensible to their quality management system.</P>
          <Expandable>
            <P>The secondary revenue layer is professional services to structural engineers and contractors — pour-level risk scores delivered as a report at the point of design review or construction sign-off. A structural engineer specifying a critical concrete element on a marine structure in Abu Dhabi currently has no predictive data available at design stage. ConcreteIQ's durability model, calibrated for UAE exposure conditions, produces the probability distribution they need. This is a per-report fee model with high margin and low customer acquisition cost, sold through the laboratory relationships already established at layer one.</P>
            <P>The long-term layer is the Digital Material Passport as a compliance infrastructure product — a per-pour fee for generating, signing, and storing a verifiable passport record tied to a unique pour identifier, accessible via QR code at project handover. As regulatory requirements in the GCC formalise around the EU DPP framework, this becomes a mandatory cost of construction that passes through to the contractor. At the scale of GCC construction — hundreds of thousands of structural pours per year across the network — the per-pour fee model generates compounding revenue with near-zero marginal cost per additional record.</P>
          </Expandable>
        </Reveal>
      </Section>

      {/* TRACTION — always fully open */}
      <Section id="traction">
        <Reveal><Highlight>The pipeline is live and processing real UAE lab records today. This is not a proof of concept.</Highlight></Reveal>
        <Reveal delay={120}>
          <Label>§ 07 — Traction</Label>
          <Heading>The pipeline is live. The data is real.</Heading>
          <Terminal />
          <P>The data pipeline processes raw Excel reports from the laboratory network's records, handling five durability test formats, multi-sheet strength reports, and direct machine file exports from the Matest Cyber-Plus Evolution crushing machine. The machine exports a checksum with every test file — a cryptographic seal that ConcreteIQ stores at import and uses to detect any post-export result modification. This is the tamper-evident pipeline that underpins the Digital Material Passport's claim to verified provenance.</P>
          <P>The regulatory pathway is identified and mapped. EIAC accreditation under ISO 17025 clause 7.11 covers the use of validated computational methods as supplementary analytical tools within an accredited laboratory. ConcreteIQ does not need to replace accredited cube testing to generate regulatory value — it needs to demonstrate validation accuracy sufficient for EIAC to recognise it as an approved supplementary method. That validation study requires the matched strength-durability dataset that is currently being built. The pipeline from current build to regulatory recognition is a straight line.</P>
        </Reveal>
      </Section>

      {/* TEAM */}
      <Section id="team">
        <Reveal><Highlight>Built from the inside — by the person processing these test records every day.</Highlight></Reveal>
        <Reveal delay={120}>
          <Label>§ 08 — Team</Label>
          <Heading>Built from the inside.</Heading>
          <P>ConcreteIQ was founded by John Paul Joseph, 18, based in Dubai, UAE. John works as a data scientist and systems developer at the multi-branch UAE material testing laboratory network that provides the platform's training data, while enrolled in the B.Sc. Data Science and Artificial Intelligence programme at BITS Pilani Digital. He built and deployed the LIMS replacement system currently in use across that network's branches before founding ConcreteIQ.</P>
        </Reveal>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-termborder pt-12 pb-16">
        <div className="mx-auto max-w-[1080px] px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-display font-bold text-parchment text-2xl">ConcreteIQ</span>
            <span className="font-mono text-[12px] text-[#8892A4] tracking-[0.12em]">Dubai, UAE · 2026</span>
            <a href="mailto:johnpauljoseph77@gmail.com" className="font-mono text-[13px] text-gold linkglow">johnpauljoseph77@gmail.com</a>
          </div>
          <div className="font-mono text-[11px] text-[#8892A4] tracking-[0.14em] mt-7">
            Built on proprietary UAE construction data. Designed for the GCC.
          </div>
        </div>
      </footer>
    </div>
  )
}
