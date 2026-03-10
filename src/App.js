import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css"

/* ══ DATA ══ */
const TICKERS = [
  { i: "📢", t: <><strong>NEW:</strong> Scholarship 2025 — Apply by 31st March</> },
  { i: "🎉", t: <><strong>UPCOMING:</strong> Holi Milan Samaroh — 14 March, Jaipur</> },
  { i: "🏥", t: <><strong>HEALTH CAMP:</strong> Free camp for seniors — 20 March</> },
  { i: "💒", t: <><strong>MATRIMONIAL:</strong> 500+ new profiles — Visit portal today</> },
  { i: "🏆", t: <><strong>ACHIEVEMENT:</strong> Shri Ramesh Mahawar honoured with Rajasthan Business Award</> },
  { i: "📋", t: <><strong>MEETING:</strong> Quarterly Samaj Parishad — 25 May</> },
];

const SLIDES = [
  { id: 1, e: "🎨", bg: "linear-gradient(135deg,#FF6B00,#D4A017 40%,#FF4500)", tag: "FESTIVAL", tc: "#FF6B00", title: "होली मिलन समारोह", sub: "Holi Milan Samaroh 2024", desc: "A vibrant celebration of colours, joy and togetherness as the Mahawar community comes alive with festivity.", date: "March 2024" },
  { id: 2, e: "🪔", bg: "linear-gradient(135deg,#8B0000,#D4A017 50%,#FF6B00)", tag: "RELIGIOUS", tc: "#8B0000", title: "दीपावली महोत्सव", sub: "Diwali Mahotsav 2024", desc: "Thousands of diyas illuminated the Samaj Bhawan as families gathered to celebrate the festival of lights.", date: "November 2024" },
  { id: 3, e: "🕺", bg: "linear-gradient(135deg,#4A0080,#8B0000 50%,#FF6B00)", tag: "CULTURAL", tc: "#4A0080", title: "नवरात्रि महोत्सव", sub: "Navratri Mahotsav 2024", desc: "Nine nights of devotional Garba, bhajans and prayers celebrating the divine feminine.", date: "October 2024" },
  { id: 4, e: "🎊", bg: "linear-gradient(135deg,#003A1A,#D4A017 50%,#5C3D1E)", tag: "ANNUAL", tc: "#006B30", title: "वार्षिक समारोह", sub: "Annual Function 2024", desc: "Our grand annual function brought 2000+ members for cultural performances, awards and community bonding.", date: "January 2024" },
  { id: 5, e: "💒", bg: "linear-gradient(135deg,#8B0050,#D4A017 50%,#8B0000)", tag: "MATRIMONIAL", tc: "#8B0050", title: "सामूहिक विवाह समारोह", sub: "Samuh Vivah Samaroh 2024", desc: "A sacred ceremony uniting 50+ couples in matrimony with blessings from the entire Mahawar community.", date: "June 2024" },
  { id: 6, e: "🌟", bg: "linear-gradient(135deg,#001A4A,#FF6B00 50%,#D4A017)", tag: "YOUTH", tc: "#001A4A", title: "युवा सम्मेलन", sub: "Yuva Sammelan 2024", desc: "Young leaders of Mahawar Samaj came together to shape the future with energy, innovation and pride.", date: "April 2024" },
];

const EVENTS = [
  { day: "14", mon: "MAR", name: "Holi Milan Samaroh", type: "FESTIVAL 🎨", desc: "Annual Holi with cultural performances, traditional food, and joyful community bonding.", loc: "Community Hall, Jaipur", time: "10:00 AM", bg: "linear-gradient(135deg,#4A0000,#8B2500)" },
  { day: "02", mon: "APR", name: "Navratri Mahotsav", type: "RELIGIOUS 🙏", desc: "Nine nights of devotional Garba, bhajans, and prayers with special Ashtami aarti.", loc: "Mahawar Samaj Mandir", time: "6:00 PM", bg: "linear-gradient(135deg,#1A0050,#5C0080)" },
  { day: "18", mon: "APR", name: "Yuva Sammelan 2025", type: "YOUTH 🌟", desc: "Annual youth convention with career guidance, networking, and cultural competitions.", loc: "Town Hall, Jaipur", time: "9:00 AM", bg: "linear-gradient(135deg,#003A1A,#006B30)" },
  { day: "25", mon: "MAY", name: "Samaj Parishad", type: "GENERAL BODY 📋", desc: "Quarterly meeting to discuss community welfare and upcoming samaj resolutions.", loc: "Samaj Bhawan, Jaipur", time: "4:00 PM", bg: "linear-gradient(135deg,#2C1A0E,#5C3D1E)" },
  { day: "10", mon: "JUN", name: "Vivah Parichay Meet", type: "MATRIMONIAL 💒", desc: "Matrimonial meet for eligible members. Pre-registration is recommended.", loc: "Hotel Clarks, Jaipur", time: "11:00 AM", bg: "linear-gradient(135deg,#4A0000,#8B0050)" },
  { day: "15", mon: "AUG", name: "Swatantrata Diwas", type: "NATIONAL 🇮🇳", desc: "Independence Day with flag hoisting, cultural programs, and member felicitation.", loc: "Samaj Bhawan", time: "8:00 AM", bg: "linear-gradient(135deg,#001A4A,#002B7F)" },
];

const NEWS = [
  { cat: "SCHOLARSHIP", h: "Mahawar Samaj Scholarship 2025 — Open", x: "50 merit-cum-need scholarships for students. Last date 31st March 2025.", date: "5 Mar 2025" },
  { cat: "WELFARE", h: "Free Health Camp for Senior Members", x: "200+ senior members availed free check-ups, medicines, and specialist consultations.", date: "28 Feb 2025" },
  { cat: "ACHIEVEMENT", h: "Shri Ramesh Mahawar Honoured by CM", x: "Shri Ramesh Mahawar received the Rajasthan Business Excellence Award 2025.", date: "20 Feb 2025" },
  { cat: "INITIATIVE", h: "Free Skill Development Centre Launched", x: "New centre offering computer literacy, stitching, and beautician courses at Samaj Bhawan.", date: "12 Feb 2025" },
  { cat: "MATRIMONIAL", h: "500+ Profiles on Matrimonial Portal", x: "Our digital matrimonial portal has seen overwhelming response. Create your profile today.", date: "1 Feb 2025" },
  { cat: "RELIGIOUS", h: "Samuh Vivah Samaroh — Registration Open", x: "Annual group marriage ceremony in June. Families may register at the samaj office.", date: "25 Jan 2025" },
];

const MEMBERS = [
  { n: "Shri Rajendra Mahawar", r: "PRESIDENT", c: "Jaipur", b: "पदाधिकारी", i: "र", g: "linear-gradient(135deg,#FF6B00,#8B0000)" },
  { n: "Shri Suresh Agrawal", r: "SECRETARY", c: "Jaipur", b: "पदाधिकारी", i: "सु", g: "linear-gradient(135deg,#8B0000,#4A0000)" },
  { n: "Smt. Sunita Devi", r: "TREASURER", c: "Jodhpur", b: "पदाधिकारी", i: "सु", g: "linear-gradient(135deg,#D4A017,#8B6010)" },
  { n: "Shri Vikram Mahawar", r: "VICE PRESIDENT", c: "Kota", b: "पदाधिकारी", i: "वि", g: "linear-gradient(135deg,#006B30,#003A1A)" },
  { n: "Smt. Rekha Sharma", r: "WOMEN'S WING", c: "Ajmer", b: "सदस्य", i: "रे", g: "linear-gradient(135deg,#8B0050,#4A0030)" },
  { n: "Shri Deepak Mahawar", r: "YOUTH LEADER", c: "Bikaner", b: "युवा नेता", i: "दी", g: "linear-gradient(135deg,#001A4A,#003A8B)" },
  { n: "Shri Mahesh Gupta", r: "CULTURAL HEAD", c: "Jaipur", b: "सदस्य", i: "म", g: "linear-gradient(135deg,#5C1A00,#8B3300)" },
  { n: "Dr. Anita Mahawar", r: "HEALTH COMMITTEE", c: "Udaipur", b: "विशेषज्ञ", i: "अ", g: "linear-gradient(135deg,#1A3A00,#3A6B00)" },
];

const GALLERY = [
  { e: "🪔", bg: "linear-gradient(135deg,#8B0000,#D4A017 60%,#FF6B00)", l: "Diwali Celebration 2024" },
  { e: "🎊", bg: "linear-gradient(135deg,#FF6B00,#8B0000)", l: "Annual Function" },
  { e: "🏛️", bg: "linear-gradient(135deg,#5C3D1E,#D4A017)", l: "Samaj Bhawan" },
  { e: "👨‍👩‍👧‍👦", bg: "linear-gradient(135deg,#4A0000,#FF8C00)", l: "Community Meet" },
  { e: "🎭", bg: "linear-gradient(135deg,#D4A017,#8B0000)", l: "Cultural Program" },
  { e: "📚", bg: "linear-gradient(135deg,#001A4A,#FF6B00)", l: "Scholarship Award" },
];

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  left: Math.random() * 100,
  delay: -(Math.random() * 20),
  dur: Math.random() * 10 + 14
}));
/* ══ CELEBRATION SLIDER ══ */
function CelebrationSlider() {
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState(null);
  const [dir, setDir] = useState("next");
  const [anim, setAnim] = useState(false);
  const [paused, setPaused] = useState(false);
  const INTV = 5000;

  const goTo = useCallback((idx, d = "next") => {
    if (anim) return;
    setDir(d); setPrev(cur); setAnim(true); setCur(idx);
    setTimeout(() => { setPrev(null); setAnim(false); }, 700);
  }, [anim, cur]);

  const next = useCallback(() => goTo((cur + 1) % SLIDES.length, "next"), [cur, goTo]);
  const back = useCallback(() => goTo((cur - 1 + SLIDES.length) % SLIDES.length, "prev"), [cur, goTo]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, INTV);
    return () => clearInterval(t);
  }, [paused, next]);

  const s = SLIDES[cur];
  const ps = prev !== null ? SLIDES[prev] : null;

  return (
    <section className="sec fu vis" style={{ background: "linear-gradient(180deg,#FFF8EE,#F5E6C8)" }}>
      <div className="sh">
        <span className="sey">— उत्सव दीर्घा —</span>
        <h2 className="st">Celebrations & <em style={{ color: "var(--gd)", fontStyle: "normal" }}>Moments</em></h2>
        <div className="sr"><span className="srg">✦</span></div>
      </div>
      <div className="cslider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="cstage">
          {ps && (
            <div className={`cslide cslide-exit cslide-exit-${dir}`}>
              <div className="csfall" style={{ background: ps.bg }}><span className="csfemoji">{ps.e}</span></div>
              <div className="csovr" />
            </div>
          )}
          <div className={`cslide cslide-active ${anim ? `cslide-enter-${dir}` : ""}`}>
            <div className="csfall" style={{ background: s.bg }}><span className="csfemoji">{s.e}</span></div>
            <div className="csovr" />
            <div className={`cscap ${anim ? "cscap-in" : "cscap-vis"}`}>
              <span className="cctag" style={{ background: s.tc }}>{s.tag}</span>
              <h3 className="cctitle">{s.title}</h3>
              <p className="ccsub">{s.sub}</p>
              <p className="ccdesc">{s.desc}</p>
              <span className="ccdate">📅 {s.date}</span>
            </div>
          </div>
          <button className="csarr csarr-l" onClick={back}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button className="csarr csarr-r" onClick={next}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
          <div className="csctr">
            <span className="ccur">{String(cur + 1).padStart(2, "0")}</span>
            <span className="csep"> / </span>
            <span className="ctot">{String(SLIDES.length).padStart(2, "0")}</span>
          </div>
          <div className="cpwrap">
            <div key={cur} className={`cpbar${paused ? " cpbar-p" : ""}`} style={{ animationDuration: `${INTV}ms` }} />
          </div>
        </div>
        <div className="cthumbs">
          {SLIDES.map((sl, i) => (
            <button key={sl.id} className={`cthumb${i === cur ? " act" : ""}`} onClick={() => goTo(i, i > cur ? "next" : "prev")}>
              <span className="cthumb-in" style={{ background: sl.bg }}>{sl.e}</span>
              {i === cur && <span className="cthlbl">{sl.tag}</span>}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ CONTACT SECTION ══ */
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = () => {
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };
  return (
    <section className="sec">
      <div className="sh fu">
        <span className="sey">— संपर्क करें —</span>
        <h2 className="st">Contact <em style={{ color: "var(--gd)", fontStyle: "normal" }}>Us</em></h2>
        <div className="sr"><span className="srg">✦</span></div>
      </div>
      <div className="cinfo fu">
        {[{ i: "📍", l: "Address", v: "Samaj Bhawan, Jaipur, Rajasthan" }, { i: "📞", l: "Phone", v: "+91 98765 43210" }, { i: "✉️", l: "Email", v: "info@mahawarsamaj.org" }, { i: "🕐", l: "Office Hours", v: "Mon–Sat, 10AM – 6PM" }].map(c => (
          <div key={c.l} className="cinfo-card">
            <span className="cinfo-icon">{c.i}</span>
            <div className="cinfo-lbl">{c.l}</div>
            <div className="cinfo-val">{c.v}</div>
          </div>
        ))}
      </div>
      <div className="cform fu">
        {sent ? (
          <div style={{ textAlign: "center", padding: "2.5rem" }}>
            <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🙏</div>
            <h3 style={{ fontFamily: "'Yatra One',cursive", fontSize: "1.5rem", color: "var(--mr)", marginBottom: ".5rem" }}>धन्यवाद! Thank You</h3>
            <p style={{ color: "var(--tm)", fontSize: "1rem" }}>Your message has been received. We will contact you shortly.</p>
          </div>
        ) : (
          <>
            <div className="cform-row">
              <div className="cfield">
                <label>YOUR NAME</label>
                <input value={form.name} onChange={e => upd("name", e.target.value)} placeholder="Shri / Smt. Full Name" />
              </div>
              <div className="cfield">
                <label>PHONE NUMBER</label>
                <input value={form.phone} onChange={e => upd("phone", e.target.value)} placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>
            <div className="cform-row">
              <div className="cfield">
                <label>EMAIL ADDRESS</label>
                <input type="email" value={form.email} onChange={e => upd("email", e.target.value)} placeholder="your@email.com" />
              </div>
              <div className="cfield">
                <label>SUBJECT</label>
                <select value={form.subject} onChange={e => upd("subject", e.target.value)}>
                  <option value="">Select Subject</option>
                  <option>Membership Enquiry</option>
                  <option>Events Information</option>
                  <option>Scholarship Query</option>
                  <option>Matrimonial</option>
                  <option>Health Camp</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="cfield">
              <label>YOUR MESSAGE</label>
              <textarea value={form.message} onChange={e => upd("message", e.target.value)} placeholder="Write your message here..." />
            </div>
            <div style={{ textAlign: "center", marginTop: ".5rem" }}>
              <button className="btn-f" onClick={submit}>🙏 Send Message</button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ══ MAIN APP ══ */
export default function MahawarSamaj() {
  const [tab, setTab] = useState("home");
  const obsRef = useRef(null);
  const DT = [...TICKERS, ...TICKERS];
  useEffect(() => {
    const move = e => {
      const particles = document.querySelectorAll(".p")
      particles.forEach(p => {
        const speed = Math.random() * 2
        p.style.transform = `translate(${e.clientX * speed / 100}px)`
      })
    }

    window.addEventListener("mousemove", move)

    return () => window.removeEventListener("mousemove", move)

  }, [])
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      obsRef.current = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("vis"); });
      }, { threshold: .1 });
      document.querySelectorAll(".fu").forEach(el => obsRef.current.observe(el));
    }, 100);
    return () => { clearTimeout(timer); obsRef.current?.disconnect(); };
  }, [tab]);

  /* Only 4 nav items — no join button */
  const TABS = [["home", "Home"], ["events", "Events"], ["about", "About"], ["contact", "Contact"]];

  return (
    <div style={{ minHeight: "100vh" }}>

      {/* LIVE TICKER */}
      <div className="tick">
        <div className="tick-lbl"><span className="tick-dot" />🔔 LIVE</div>
        <div style={{ overflow: "hidden", flex: 1 }}>
          <div className="tick-track">
            {DT.map((t, i) => (
              <span key={i} className="tick-item">{t.i} {t.t} <span style={{ color: "var(--sf)", margin: "0 .3rem" }}>✦</span></span>
            ))}
          </div>
        </div>
      </div>

      {/* NAVBAR — Logo left, links right, no join button */}
      <nav className="nav">
        {/* LEFT: Logo */}
        <div className="brand" onClick={() => setTab("home")}>
          <span className="brand-om">ॐ</span>
          <div>
            <div className="brand-hi">महावर समाज</div>
            <div className="brand-en">MAHAWAR SAMAJ</div>
          </div>
        </div>

        {/* RIGHT: Nav links only */}
        <div className="nav-links">
          {TABS.map(([id, lbl], idx) => (
            <span key={id} style={{ display: "inline-flex", alignItems: "center" }}>
              <button className={`nb${tab === id ? " on" : ""}`} onClick={() => setTab(id)}>{lbl}</button>
              {idx < TABS.length - 1 && <span className="nb-sep">✦</span>}
            </span>
          ))}
        </div>
      </nav>

      {/* ═══ HOME ═══ */}
      {tab === "home" && <>
        <section className="hero">
          <div className="ptcl">
            {PARTICLES.map(p => (
              <div
                key={p.id}
                className="p"
                style={{
                  width: p.size + "px",
                  height: p.size + "px",
                  left: p.left + "%",
                  animationDelay: p.delay + "s",
                  animationDuration: p.dur + "s"
                }}
              />
            ))}
          </div>
          <div className="mw">
            {["ml1", "ml2", "ml3", "ml4", "ml5"].map(c => <div key={c} className={`ml ${c}`} />)}
          </div>
          <div className="hc">
            <div className="hbadge"><span className="hbd" /><span>स्थापित १९५२ • राजस्थान</span></div>
            <h1 className="hh1">महावर <em>समाज</em></h1>
            <p className="hdv">एकता &nbsp;•&nbsp; संस्कृति &nbsp;•&nbsp; प्रगति</p>
            <div className="horn">
              <div className="ol" /><span className="os">✦</span>
              <span style={{ fontSize: "1.6rem" }}>🪔</span>
              <span className="os">✦</span><div className="ol r" />
            </div>
            <p className="hp">Preserving the rich heritage, traditions and values of the Mahawar community — empowering members through unity, education and cultural pride since 1952.</p>
            <div className="hbtns">
              <button className="btn-f" onClick={() => setTab("events")}>📅 Upcoming Events</button>
              <button className="btn-g" onClick={() => setTab("about")}>🙏 About Us</button>
            </div>
          </div>
          <div className="scroll-h"><span>SCROLL</span><div className="sa" /></div>
        </section>

        <div className="stats">
          {[["5000+", "सदस्य • Members"], ["70+", "वर्ष • Years"], ["50+", "Events / Year"], ["12+", "शहर • Cities"]].map(([n, l]) => (
            <div key={l} className="stat"><span className="stn">{n}</span><span className="stl">{l}</span></div>
          ))}
        </div>

        <div className="ibanner">
          <div className="imarq">
            {DT.map((t, i) => (
              <span key={i} className="ii">{t.i} {t.t}<span style={{ color: "var(--sf)", margin: "0 .5rem" }}>•</span></span>
            ))}
          </div>
        </div>

        <CelebrationSlider />

        <section className="sec">
          <div className="sh fu">
            <span className="sey">— ताज़ा समाचार —</span>
            <h2 className="st">Latest Updates</h2>
            <div className="sr"><span className="srg">✦</span></div>
          </div>
          <div className="ngrid" style={{ maxWidth: 920 }}>
            {NEWS.slice(0, 3).map((n, i) => (
              <div key={i} className="ncard fu" style={{ transitionDelay: `${i * .1}s` }}>
                <div className="ncat">{n.cat}</div>
                <div className="nh">{n.h}</div>
                <div className="nx">{n.x}</div>
                <div className="nd">📅 {n.date}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }} className="fu">
            <button className="btn-f" onClick={() => setTab("events")}>View All Events →</button>
          </div>
        </section>

        <div className="qsec">
          <p className="qt">"समाज की एकता ही हमारी सबसे बड़ी शक्ति है।<br />Unity of community is our greatest strength."</p>
          <p className="qa">— Mahawar Samaj Founding Charter, 1952</p>
        </div>
      </>}

      {/* ═══ EVENTS ═══ */}
      {tab === "events" && (
        <section className="sec">
          <div className="sh fu">
            <span className="sey">— आयोजन —</span>
            <h2 className="st">Upcoming Events</h2>
            <div className="sr"><span className="srg">✦</span></div>
          </div>
          <div className="egrid">
            {EVENTS.map((e, i) => (
              <div key={i} className="ecard fu" style={{ transitionDelay: `${i * .08}s` }}>
                <div className="ehead" style={{ background: e.bg }}>
                  <div className="edate"><span className="eday">{e.day}</span><span className="emon">{e.mon}</span></div>
                  <div><div className="ename">{e.name}</div><div className="etype">{e.type}</div></div>
                </div>
                <div className="ebody">
                  <p className="edesc">{e.desc}</p>
                  <div className="emeta"><span>📍 {e.loc}</span><span>🕐 {e.time}</span></div>
                  <span className="etag">REGISTER NOW</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══ ABOUT ═══ */}
      {tab === "about" && <>
        <div style={{ background: "linear-gradient(135deg,#3A0000,#6B0000 40%,#8B2500)", padding: "4rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", opacity: .05 }}>
            <span style={{ fontSize: "28rem", lineHeight: 1, color: "var(--gd)", fontFamily: "serif" }}>ॐ</span>
          </div>
          <span style={{ fontFamily: "'Crimson Pro',serif", fontStyle: "italic", color: "var(--sf)", letterSpacing: "4px", fontSize: ".85rem", display: "block", marginBottom: "6px" }}>— हमारे बारे में —</span>
          <h2 style={{ fontFamily: "'Yatra One',cursive", fontSize: "clamp(2rem,5vw,3.5rem)", color: "var(--gd2)", marginBottom: "1rem", position: "relative", zIndex: 1 }}>About Mahawar Samaj</h2>
          <p style={{ fontFamily: "'Tiro Devanagari Hindi',serif", color: "var(--pa)", fontSize: "1.2rem", opacity: .9, letterSpacing: "2px", position: "relative", zIndex: 1 }}>एकता • संस्कृति • प्रगति</p>
        </div>

        <section className="sec">
          <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
            <div className="fu">
              <span className="sey">— हमारी कहानी —</span>
              <h3 style={{ fontFamily: "'Yatra One',cursive", fontSize: "2rem", color: "var(--mr)", marginBottom: "1.2rem", lineHeight: 1.2 }}>Our Story Since <em style={{ color: "var(--sf)", fontStyle: "normal" }}>1952</em></h3>
              <p style={{ fontSize: "1rem", color: "var(--tm)", lineHeight: 1.85, marginBottom: "1rem" }}>Mahawar Samaj was established in 1952 in Jaipur, Rajasthan, by visionary community leaders who believed in the power of unity. What started as a small gathering has grown into a thriving community of 5,000+ members across 12+ cities.</p>
              <p style={{ fontSize: "1rem", color: "var(--tm)", lineHeight: 1.85 }}>For over 70 years, we have celebrated our cultural festivals, supported members through scholarships, health camps, matrimonial services, and preserved the unique heritage of the Mahawar community.</p>
            </div>
            <div className="fu" style={{ transitionDelay: ".15s" }}>
              <div style={{ background: "linear-gradient(135deg,#8B0000,#D4A017 60%,#FF6B00)", borderRadius: 16, height: 300, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "7rem", boxShadow: "0 20px 50px rgba(139,0,0,.25)" }}>🏛️</div>
            </div>
          </div>
        </section>

        <section className="sec sec-alt">
          <div className="sh fu">
            <span className="sey">— हमारे मूल्य —</span>
            <h2 className="st">Our Core Values</h2>
            <div className="sr"><span className="srg">✦</span></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1.4rem", maxWidth: 1060, margin: "0 auto" }}>
            {[
              { e: "🤝", t: "एकता • Unity", d: "Together we stand stronger. Every member is family, every voice matters." },
              { e: "🎭", t: "संस्कृति • Culture", d: "Preserving our rich Rajasthani traditions, festivals and heritage with pride." },
              { e: "📚", t: "शिक्षा • Education", d: "Empowering youth through scholarships, skill training and career guidance." },
              { e: "❤️", t: "सेवा • Service", d: "Serving the community through health camps, welfare funds and free legal aid." },
              { e: "💒", t: "विवाह • Matrimony", d: "Connecting families through our trusted matrimonial portal and Vivah Samarohs." },
              { e: "🌟", t: "प्रगति • Progress", d: "Building a modern, prosperous future while staying rooted in timeless values." },
            ].map((v, i) => (
              <div key={i} className="fu" style={{ transitionDelay: `${i * .07}s`, background: "white", borderRadius: 12, padding: "1.8rem 1.5rem", textAlign: "center", boxShadow: "0 4px 20px rgba(139,0,0,.07)", border: "1px solid rgba(212,160,23,.15)" }}>
                <div style={{ fontSize: "2.8rem", marginBottom: ".8rem" }}>{v.e}</div>
                <div style={{ fontFamily: "'Yatra One',cursive", fontSize: "1rem", color: "var(--mr)", marginBottom: ".5rem" }}>{v.t}</div>
                <div style={{ fontSize: ".88rem", color: "var(--tm)", lineHeight: 1.7 }}>{v.d}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="sec">
          <div className="sh fu">
            <span className="sey">— नेतृत्व —</span>
            <h2 className="st">Our Leadership</h2>
            <div className="sr"><span className="srg">✦</span></div>
          </div>
          <div className="mgrid">
            {MEMBERS.map((m, i) => (
              <div key={i} className="mcard fu" style={{ transitionDelay: `${i * .07}s` }}>
                <div className="mavt" style={{ background: m.g }}>{m.i}</div>
                <div className="mn">{m.n}</div>
                <div className="mr2">{m.r}</div>
                <div className="mc">📍 {m.c}</div>
                <span className="mbadge">{m.b}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="sec sec-alt">
          <div className="sh fu">
            <span className="sey">— झलकियाँ —</span>
            <h2 className="st">Celebration Gallery</h2>
            <div className="sr"><span className="srg">✦</span></div>
          </div>
          <div className="ggrid fu">
            {GALLERY.map((g, i) => (
              <div key={i} className="gitem">
                <div className="ginn" style={{ background: g.bg }}>
                  {g.e}<div className="govr"><span className="gcap">{g.l}</span></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="qsec">
          <p className="qt">"समाज की एकता ही हमारी सबसे बड़ी शक्ति है।<br />Unity of community is our greatest strength."</p>
          <p className="qa">— Mahawar Samaj Founding Charter, 1952</p>
        </div>
      </>}

      {/* ═══ CONTACT ═══ */}
      {tab === "contact" && <ContactSection />}

      {/* FOOTER */}
      <footer className="footer">
        <div className="fg">
          <div>
            <span className="flogo">महावर समाज</span>
            <div style={{ fontFamily: "'Crimson Pro',serif", fontStyle: "italic", color: "var(--gd)", fontSize: ".82rem" }}>
              Mahawar Samaj • Est. 1952
            </div>
            <p className="fdesc">
              Serving the Mahawar community with unity, tradition and progress.
              Building a stronger tomorrow together.
            </p>
          </div>

          <div>
            <div className="fh">Quick Links</div>
            <ul className="ful">
              {[["home", "Home"], ["events", "Events"], ["about", "About"], ["contact", "Contact"]].map(([id, l]) => (
                <li key={id} onClick={() => setTab(id)}>{l}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="fh">Services</div>
            <ul className="ful">
              {["Scholarships", "Health Camps", "Matrimonial", "Skill Training", "Welfare Fund", "Legal Aid"].map(l =>
                <li key={l}>{l}</li>
              )}
            </ul>
          </div>

          <div>
            <div className="fh">Contact</div>
            <ul className="ful" style={{ listStyle: "none" }}>
              {[
                "📍 Samaj Bhawan, Jaipur",
                "📞 +91 98765 43210",
                "✉️ info@mahawarsamaj.org",
                "🌐 www.mahawarsamaj.org"
              ].map(l => (
                <li key={l} style={{ padding: "4px 0", fontSize: ".85rem", opacity: .7 }}>{l}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="fb">
          <p style={{ fontSize: "1rem", marginBottom: "5px", opacity: .85 }}>
            🙏 ॐ नमः शिवाय • जय श्री राम • जय माँ भवानी 🙏
          </p>
          <p>© 2025 Mahawar Samaj. All rights reserved.</p>
          <p style={{ fontSize: ".9rem", opacity: .8 }}>
            Powered By ❤️
            <a
              className="dev"
              href="https://sahilgupta03.github.io/sahil_portfolio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sahil Gupta
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
