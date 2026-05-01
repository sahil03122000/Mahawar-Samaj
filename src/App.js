import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css"
import data from "./data/siteData.json"
import Footer_div from "./component/Footer_div";
import ContactSection from "./component/ContactSection";
import Aboutus from "./component/Aboutus";
import Home from "./component/Home";
import Event from "./component/Event";
import Header from "./component/Header";
import LiveTicker from "./component/LiveTicker";

/* ══ DATA ══ */
// 📢,🎉,🏥,💒,🏆,📋
const TICKERS = data.ticker;


const SLIDES = [
  {
    id: 1,
    e: "🥳",
    bg: "linear-gradient(135deg,#FF6B00,#D4A017 40%,#FF4500)",
    tag: "Celebration",
    tc: "#FF6B00",
    desktopImg: process.env.PUBLIC_URL + "/images/banner1-desktop.png",
    mobileImg: process.env.PUBLIC_URL + "/images/banner1-mobile.png",
    title: "Chartered Accountant (CA) qualification",
    sub: "दीपिका गुप्ता (सुपुत्री स्वर्गीय श्री अशोक गुप्ता — खेड़ा वाले)",
    desc: "श्री महावर वैश्य नवयुवक मंडल, अटेली की ओर से दीपिका गुप्ता (सुपुत्री स्वर्गीय श्री अशोक गुप्ता — खेड़ा वाले) को चार्टर्ड अकाउंटेंट(CA) बनने पर हार्दिक बधाई एवं शुभकामनाएँ। दीपिका गुप्ता की इस उत्कृष्ट उपलब्धि से सम्पूर्ण महावर समाज, अटेली गौरवान्वित हुआ है। इस अवसर पर आज समाज के पदाधिकारियों ने उनके निवास स्थान पर जाकर उन्हें पटका पहनाकर एवं मुंह मीठा कर सम्मानित किया तथा उज्ज्वल भविष्य के लिए शुभकामनाएँ दीं।",
    date: "3rd March 2026"
  }, {
    id: 6,
    e: "💐",
    bg: "linear-gradient(135deg, #8E44AD, #C39BD3)", // Royal purple tone
    tag: "अतिथि सम्मान",
    tc: "#8E44AD",
    desktopImg: process.env.PUBLIC_URL + "/images/1.jpeg",
    mobileImg: process.env.PUBLIC_URL + "/images/1.jpeg",
    title: "अतिथियों का हार्दिक अभिनंदन",
    sub: "सम्मान और कृतज्ञता का प्रतीक",
    desc: "कार्यक्रम की शोभा बढ़ाने वाले हमारे मुख्य अतिथियों का माला पहनाकर और स्मृति चिन्ह भेंट कर सम्मान किया गया। आपकी उपस्थिति हमारे समाज के लिए अत्यंत गौरवपूर्ण रही।",
    date: "2025"
  },
  {
    id: 2,
    e: "💃", // Dancing emoji context ke liye zyada suit karega
    bg: "linear-gradient(135deg,#FF6B00,#D4A017 40%,#FF4500)",
    tag: "Cultural Program Highlight",
    tc: "#FF6B00",
    desktopImg: process.env.PUBLIC_URL + "/images/8.jpeg",
    mobileImg: process.env.PUBLIC_URL + "/images/8.jpeg",
    title: "Cultural Pride & Talent Recognition",
    sub: "A stellar performance followed by community honors.",
    desc: "In the 2025 program, these two talented daughters captivated the audience with their dance performance, subsequently receiving prestigious awards and recognition from the chief guests for their excellence.",
    date: "2025"
  }, {
    id: 3, // Next ID in your sequence
    e: "🏅",
    bg: "linear-gradient(135deg, #FF6B00, #FFD700)", // Orange to Golden
    tag: "Samman Samaroh",
    tc: "#FF6B00",
    desktopImg: process.env.PUBLIC_URL + "/images/12.jpeg",
    mobileImg: process.env.PUBLIC_URL + "/images/12.jpeg",
    title: "Community Leadership & Recognition",
    sub: "Honoring the dedicated members of the unit.",
    desc: "A moment of pride as the organization recognizes the exemplary service and contributions of our committee members (Ikai) during the 2025 annual meet.",
    date: "2025"
  },
  {
    id: 4,
    e: "👥",
    bg: "linear-gradient(135deg, #1A518C, #2E86C1)",
    tag: "कार्यक्रम की झलक",
    tc: "#1A518C",
    desktopImg: process.env.PUBLIC_URL + "/images/7.jpeg",
    mobileImg: process.env.PUBLIC_URL + "/images/7.jpeg",
    title: "प्रतिभा सम्मान समारोह: उपस्थित जनसमूह",
    sub: "कार्यक्रम का भव्य दृश्य",
    desc: "प्रतिक्षण प्रतिभा सम्मान समारोह में पधारे सम्मानित अतिथियों और दर्शकों का उत्साहपूर्ण दृश्य, जो समाज की एकता और उमंग को दर्शाता है।",
    date: "2025"
  }, {
    id: 5,
    e: "🏅",
    bg: "linear-gradient(135deg, #FF9933, #FFCC33)",
    tag: "इकाई सम्मान",
    tc: "#FF9933",
    desktopImg: process.env.PUBLIC_URL + "/images/11.jpeg",
    mobileImg: process.env.PUBLIC_URL + "/images/11.jpeg",
    title: "इकाई सम्मान और प्रोत्साहन",
    sub: "समर्पण के लिए विशेष सम्मान",
    desc: "हमारी इकाई के उन कर्मठ सदस्यों का सम्मान, जिन्होंने अपनी मेहनत और निस्वार्थ सेवा से समाज के कार्यों को नई ऊंचाइयों पर पहुंचाया है।",
    date: "2025"
  },
  // { id: 2, e: "🪔", bg: "linear-gradient(135deg,#8B0000,#D4A017 50%,#FF6B00)", tag: "RELIGIOUS", tc: "#8B0000", title: "दीपावली महोत्सव", sub: "Diwali Mahotsav 2024", desc: "Thousands of diyas illuminated the Samaj Bhawan as families gathered to celebrate the festival of lights.", date: "November 2024" },
  // { id: 3, e: "🕺", bg: "linear-gradient(135deg,#4A0080,#8B0000 50%,#FF6B00)", tag: "CULTURAL", tc: "#4A0080", title: "नवरात्रि महोत्सव", sub: "Navratri Mahotsav 2024", desc: "Nine nights of devotional Garba, bhajans and prayers celebrating the divine feminine.", date: "October 2024" },
  // { id: 4, e: "🎊", bg: "linear-gradient(135deg,#003A1A,#D4A017 50%,#5C3D1E)", tag: "ANNUAL", tc: "#006B30", title: "वार्षिक समारोह", sub: "Annual Function 2024", desc: "Our grand annual function brought 2000+ members for cultural performances, awards and community bonding.", date: "January 2024" },
  // { id: 5, e: "💒", bg: "linear-gradient(135deg,#8B0050,#D4A017 50%,#8B0000)", tag: "MATRIMONIAL", tc: "#8B0050", title: "सामूहिक विवाह समारोह", sub: "Samuh Vivah Samaroh 2024", desc: "A sacred ceremony uniting 50+ couples in matrimony with blessings from the entire Mahawar community.", date: "June 2024" },
  // { id: 6, e: "🌟", bg: "linear-gradient(135deg,#001A4A,#FF6B00 50%,#D4A017)", tag: "YOUTH", tc: "#001A4A", title: "युवा सम्मेलन", sub: "Yuva Sammelan 2024", desc: "Young leaders of Mahawar Samaj came together to shape the future with energy, innovation and pride.", date: "April 2024" },
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
            {/* <div className="csfall" style={{ backgroundImage: `url('${s.desktopImg}')` }}>
              <span className="csfemoji">{s.e}</span>
            </div> */}
            <div
              className="csfall"
              style={{
                backgroundImage: `url('${window.innerWidth <= 768 ? s.mobileImg : s.desktopImg
                  }')`
              }}
            >
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


  return (
    <div style={{ minHeight: "100vh" }}>

      {/* LIVE TICKER */}
      <LiveTicker DT={DT} />

      {/* NAVBAR — Logo left, links right, no join button */}
      <Header setTab={setTab} tab={tab} />

      {/* ═══ HOME ═══ */}
      {tab === "home" && <>
        <Home
          PARTICLES={PARTICLES}
          DT={DT}
          setTab={setTab}
          CelebrationSlider={CelebrationSlider}
        />
      </>}

      {/* ═══ EVENTS ═══ */}
      {tab === "events" && (
        <Event />
      )}

      {/* ═══ ABOUT ═══ */}
      {tab === "about" &&
        <Aboutus />
      }

      {/* ═══ CONTACT ═══ */}
      {tab === "contact" && <ContactSection />}

      {/* FOOTER */}
      <Footer_div
        setTab={setTab}
      />
    </div>
  );
}
