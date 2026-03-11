import React from 'react'
import data from "../data/siteData.json"
function Aboutus() {
  return (
    <div>
      <>
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
            {data.MEMBERS.map((m, i) => (
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
            {data.GALLERY.map((g, i) => (
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
      </>
    </div>
  )
}

export default Aboutus
