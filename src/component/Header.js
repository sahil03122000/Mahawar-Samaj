import React from 'react'

function Header({ setTab, tab }) {
    /* Only 4 nav items — no join button */
    const TABS = [["home", "Home"], ["events", "Events"], ["about", "About"], ["contact", "Contact"]];

    return (
        <nav className="nav">
            {/* LEFT: Logo */}
            <div className="brand" onClick={() => setTab("home")}>
                <span className="brand-om">
                    <div className="om-ring">
                        <div className="om-ring-circle" />
                        <div className="om-ring-circle2" />
                        <div className="om-glyph">
                            <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="logo" />
                        </div>
                    </div>
                </span>
                <div>
                    <div className="brand-hi">महावर समाज</div>
                    <div className="brand-en">MAHAWAR SAMAJ</div>
                    <div className="brand-en" style={{ fontSize: "0.9rem" ,color:"yellow",fontWeight:"bold"}}>Reg. No HR-016-2023-00015</div>
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
    )
}

export default Header
