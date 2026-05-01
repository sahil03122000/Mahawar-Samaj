import React from 'react'
import data from "../data/siteData.json"

function Home({ PARTICLES, DT, setTab, CelebrationSlider }) {
    const NEWS = [
        // { cat: "SCHOLARSHIP", h: "Mahawar Samaj Scholarship 2025 — Open", x: "50 merit-cum-need scholarships for students. Last date 31st March 2025.", date: "5 Mar 2025" },
        // { cat: "WELFARE", h: "Free Health Camp for Senior Members", x: "200+ senior members availed free check-ups, medicines, and specialist consultations.", date: "28 Feb 2025" },
        {
            cat: "ACHIEVEMENT", h: "Deepika Gupta achieves Chartered Accountant (CA) qualification",
            i: "./images/banner1.png",
            x: "श्री महावर वैश्य नवयुवक मंडल, अटेली की ओर से दीपिका गुप्ता (सुपुत्री स्वर्गीय श्री अशोक गुप्ता — खेड़ा वाले) को चार्टर्ड अकाउंटेंट(CA) बनने पर हार्दिक बधाई एवं शुभकामनाएँ। दीपिका गुप्ता की इस उत्कृष्ट उपलब्धि से सम्पूर्ण महावर समाज, अटेली गौरवान्वित हुआ है। इस अवसर पर आज समाज के पदाधिकारियों ने उनके निवास स्थान पर जाकर उन्हें पटका पहनाकर एवं मुंह मीठा कर सम्मानित किया तथा उज्ज्वल भविष्य के लिए शुभकामनाएँ दीं।",
            date: "1st Mar 2026"
        },
        // { cat: "INITIATIVE", h: "Free Skill Development Centre Launched", x: "New centre offering computer literacy, stitching, and beautician courses at Samaj Bhawan.", date: "12 Feb 2025" },
        // { cat: "MATRIMONIAL", h: "500+ Profiles on Matrimonial Portal", x: "Our digital matrimonial portal has seen overwhelming response. Create your profile today.", date: "1 Feb 2025" },
        // { cat: "RELIGIOUS", h: "Samuh Vivah Samaroh — Registration Open", x: "Annual group marriage ceremony in June. Families may register at the samaj office.", date: "25 Jan 2025" },
    ];
    return (
        <div>
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
                    <div className="hbadge"><span className="hbd" /><span>स्थापित {data.site.hindiyear} • हरियाणा</span></div>
                    {/* <h1 className="hh1">महावर <em>समाज</em></h1> */}
                    <h1 className="hh1">श्री महावर वैश्य <em>नवयुवक मण्डल</em> मण्डी अटेली (रजि.) </h1>
                    <p className="hdv">एकता &nbsp;•&nbsp; संस्कृति &nbsp;•&nbsp; प्रगति</p>
                    <div className="horn">
                        <div className="ol" /><span className="os">✦</span>
                        <span style={{ fontSize: "1.6rem" }}>🪔</span>
                        <span className="os">✦</span><div className="ol r" />
                    </div>
                    <p className="hp">Preserving the rich heritage, traditions and values of the Mahawar community — empowering members through unity, education and cultural pride since {data.site.year}.</p>
                    <div className="hbtns">
                        <button className="btn-f" onClick={() => setTab("events")}>📅 Upcoming Events</button>
                        <button className="btn-g" onClick={() => setTab("about")}>🙏 About Us</button>
                    </div>
                </div>
                <div className="scroll-h"><span>SCROLL</span><div className="sa" /></div>
            </section>

            <div className="stats">
                {[["90+", "परिवार • Family"], ["5+", "वर्ष • Years"], ["5+", "Events / Year"], ["2+", "शहर • Cities"]].map(([n, l]) => (
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
                <p className="qa">— श्री महावर वैश्य नवयुवक मण्डल मण्डी अटेली, 2022</p>
            </div>
        </div>
    )
}

export default Home
