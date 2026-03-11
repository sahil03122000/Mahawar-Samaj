import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css"
import data from "./data/siteData.json"
import Footer_div from "./component/Footer_div";
import ContactSection from "./component/ContactSection";
import Aboutus from "./component/Aboutus";

/* ══ DATA ══ */
// 📢,🎉,🏥,💒,🏆,📋
const TICKERS = data.ticker;


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
  size: Math.random() * 3 + 10,
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

    setDir(d);
    setPrev(cur);
    setAnim(true);
    setCur(idx);

    setTimeout(() => {
      setPrev(null);
      setAnim(false);
    }, 700);
  }, [anim, cur]);

  const next = useCallback(() => {
    setCur((c) => {
      const idx = (c + 1) % SLIDES.length;

      setDir("next");
      setPrev(c);
      setAnim(true);

      setTimeout(() => {
        setPrev(null);
        setAnim(false);
      }, 700);

      return idx;
    });
  }, []);

  const back = useCallback(() => {
    setCur((c) => {
      const idx = (c - 1 + SLIDES.length) % SLIDES.length;

      setDir("prev");
      setPrev(c);
      setAnim(true);

      setTimeout(() => {
        setPrev(null);
        setAnim(false);
      }, 700);

      return idx;
    });
  }, []);

  useEffect(() => {
    if (paused || anim) return;

    const timer = setInterval(() => {
      next();
    }, INTV);

    return () => clearInterval(timer);
  }, [paused, anim, next]);

  const s = SLIDES[cur];
  const ps = prev !== null ? SLIDES[prev] : null;

  return (
    <section className="sec fu vis" style={{ background: "linear-gradient(180deg,#FFF8EE,#F5E6C8)" }}>
      <div className="sh">
        <span className="sey">— उत्सव दीर्घा —</span>
        <h2 className="st">
          Celebrations & <em style={{ color: "var(--gd)", fontStyle: "normal" }}>Moments</em>
        </h2>
        <div className="sr"><span className="srg">✦</span></div>
      </div>

      <div
        className="cslider"
      // onMouseEnter={() => setPaused(true)}
      // onMouseLeave={() => setPaused(false)}
      >
        <div className="cstage">

          {ps && (
            <div className={`cslide cslide-exit cslide-exit-${dir}`}>
              <div className="csfall" style={{ background: ps.bg }}>
                <span className="csfemoji">{ps.e}</span>
              </div>
              <div className="csovr" />
            </div>
          )}

          <div className={`cslide cslide-active ${anim ? `cslide-enter-${dir}` : ""}`}>
            <div className="csfall" style={{ background: s.bg }}>
              <span className="csfemoji">{s.e}</span>
            </div>

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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button className="csarr csarr-r" onClick={next}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="csctr">
            <span className="ccur">{String(cur + 1).padStart(2, "0")}</span>
            <span className="csep"> / </span>
            <span className="ctot">{String(SLIDES.length).padStart(2, "0")}</span>
          </div>

          <div className="cpwrap">
            <div
              key={cur}
              className={`cpbar${paused ? " cpbar-p" : ""}`}
              style={{ animationDuration: `${INTV}ms` }}
            />
          </div>
        </div>

        <div className="cthumbs">
          {SLIDES.map((sl, i) => (
            <button
              key={sl.id}
              className={`cthumb${i === cur ? " act" : ""}`}
              onClick={() => goTo(i, i > cur ? "next" : "prev")}
            >
              <span className="cthumb-in" style={{ background: sl.bg }}>
                {sl.e}
              </span>

              {i === cur && <span className="cthlbl">{sl.tag}</span>}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ══ CONTACT SECTION ══ */
// function ContactSection() {
//   const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
//   const [sent, setSent] = useState(false);
//   const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
//   const submit = () => {
//     setSent(true);
//     setTimeout(() => setSent(false), 3500);
//     setForm({ name: "", email: "", phone: "", subject: "", message: "" });
//   };
//   return (
//     <section className="sec">
//       <div className="sh fu">
//         <span className="sey">— संपर्क करें —</span>
//         <h2 className="st">Contact <em style={{ color: "var(--gd)", fontStyle: "normal" }}>Us</em></h2>
//         <div className="sr"><span className="srg">✦</span></div>
//       </div>
//       <div className="cinfo fu">
//         {[{ i: "📍", l: "Address", v: "Samaj Bhawan, Jaipur, Rajasthan" }, { i: "📞", l: "Phone", v: "+91 98765 43210" }, { i: "✉️", l: "Email", v: "info@mahawarsamaj.org" }, { i: "🕐", l: "Office Hours", v: "Mon–Sat, 10AM – 6PM" }].map(c => (
//           <div key={c.l} className="cinfo-card">
//             <span className="cinfo-icon">{c.i}</span>
//             <div className="cinfo-lbl">{c.l}</div>
//             <div className="cinfo-val">{c.v}</div>
//           </div>
//         ))}
//       </div>
//       <div className="cform fu">
//         {sent ? (
//           <div style={{ textAlign: "center", padding: "2.5rem" }}>
//             <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🙏</div>
//             <h3 style={{ fontFamily: "'Yatra One',cursive", fontSize: "1.5rem", color: "var(--mr)", marginBottom: ".5rem" }}>धन्यवाद! Thank You</h3>
//             <p style={{ color: "var(--tm)", fontSize: "1rem" }}>Your message has been received. We will contact you shortly.</p>
//           </div>
//         ) : (
//           <>
//             <div className="cform-row">
//               <div className="cfield">
//                 <label>YOUR NAME</label>
//                 <input value={form.name} onChange={e => upd("name", e.target.value)} placeholder="Shri / Smt. Full Name" />
//               </div>
//               <div className="cfield">
//                 <label>PHONE NUMBER</label>
//                 <input value={form.phone} onChange={e => upd("phone", e.target.value)} placeholder="+91 XXXXX XXXXX" />
//               </div>
//             </div>
//             <div className="cform-row">
//               <div className="cfield">
//                 <label>EMAIL ADDRESS</label>
//                 <input type="email" value={form.email} onChange={e => upd("email", e.target.value)} placeholder="your@email.com" />
//               </div>
//               <div className="cfield">
//                 <label>SUBJECT</label>
//                 <select value={form.subject} onChange={e => upd("subject", e.target.value)}>
//                   <option value="">Select Subject</option>
//                   <option>Membership Enquiry</option>
//                   <option>Events Information</option>
//                   <option>Scholarship Query</option>
//                   <option>Matrimonial</option>
//                   <option>Health Camp</option>
//                   <option>Other</option>
//                 </select>
//               </div>
//             </div>
//             <div className="cfield">
//               <label>YOUR MESSAGE</label>
//               <textarea value={form.message} onChange={e => upd("message", e.target.value)} placeholder="Write your message here..." />
//             </div>
//             <div style={{ textAlign: "center", marginTop: ".5rem" }}>
//               <button className="btn-f" onClick={submit}>🙏 Send Message</button>
//             </div>
//           </>
//         )}
//       </div>
//     </section>
//   );
// }

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
              <span key={i} className="tick-item">{t.i}

                <strong>{t.t}:</strong> {t.p}
                <span style={{ color: "var(--sf)", margin: "0 .3rem" }}>✦</span></span>
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
              <span key={i} className="tick-item">{t.i}

                <strong>{t.t}:</strong> {t.p}
                <span style={{ color: "var(--sf)", margin: "0 .3rem" }}>✦</span></span>
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
      {tab === "about" && 
      <Aboutus/>
      }

      {/* ═══ CONTACT ═══ */}
      {tab === "contact" && <ContactSection />}

      {/* FOOTER */}
      {/* <footer className="footer">
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
      </footer> */}
      <Footer_div
        setTab={setTab}
      />
    </div>
  );
}
