import React from 'react'
import data from "../data/siteData.json"

function Event() {
    // const EVENTS = [
    //     { day: "15", mon: "MAR", name: "Holi Milan Samaroh", type: "FESTIVAL 🎨", desc: "Annual Holi with cultural performances, traditional food, and joyful community bonding.", loc: "OM Garden , Ateli Mandi", time: "1:00 PM", bg: "linear-gradient(135deg,#4A0000,#8B2500)" },
    //     // { day: "02", mon: "APR", name: "Navratri Mahotsav", type: "RELIGIOUS 🙏", desc: "Nine nights of devotional Garba, bhajans, and prayers with special Ashtami aarti.", loc: "Mahawar Samaj Mandir", time: "6:00 PM", bg: "linear-gradient(135deg,#1A0050,#5C0080)" },
    //     // { day: "18", mon: "APR", name: "Yuva Sammelan 2025", type: "YOUTH 🌟", desc: "Annual youth convention with career guidance, networking, and cultural competitions.", loc: "Town Hall, Jaipur", time: "9:00 AM", bg: "linear-gradient(135deg,#003A1A,#006B30)" },
    //     // { day: "25", mon: "MAY", name: "Samaj Parishad", type: "GENERAL BODY 📋", desc: "Quarterly meeting to discuss community welfare and upcoming samaj resolutions.", loc: "Samaj Bhawan, Jaipur", time: "4:00 PM", bg: "linear-gradient(135deg,#2C1A0E,#5C3D1E)" },
    //     // { day: "10", mon: "JUN", name: "Vivah Parichay Meet", type: "MATRIMONIAL 💒", desc: "Matrimonial meet for eligible members. Pre-registration is recommended.", loc: "Hotel Clarks, Jaipur", time: "11:00 AM", bg: "linear-gradient(135deg,#4A0000,#8B0050)" },
    //     // { day: "15", mon: "AUG", name: "Swatantrata Diwas", type: "NATIONAL 🇮🇳", desc: "Independence Day with flag hoisting, cultural programs, and member felicitation.", loc: "Samaj Bhawan", time: "8:00 AM", bg: "linear-gradient(135deg,#001A4A,#002B7F)" },
    // ];
    return (
        <div>
            <section className="sec">
                <div className="sh fu">
                    <span className="sey">— आयोजन —</span>
                    <h2 className="st">Upcoming Events</h2>
                    <div className="sr"><span className="srg">✦</span></div>
                </div>
                <div className="egrid">
                    {data.EVENTS.map((e, i) => (
                        <div key={i} className="ecard fu" style={{ transitionDelay: `${i * .08}s` }}>
                            <div className="ehead" style={{ background: e.bg }}>
                                <div className="edate"><span className="eday">{e.day}</span><span className="emon">{e.mon}</span></div>
                                <div><div className="ename">{e.name}</div><div className="etype">{e.type}</div></div>
                            </div>
                            <div className="ebody">
                                <p className="edesc">{e.desc}</p>
                                <div className="emeta"><span>📍 {e.loc}</span><span>🕐 {e.time}</span></div>
                                {/* <span className="etag">REGISTER NOW</span> */}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Event
