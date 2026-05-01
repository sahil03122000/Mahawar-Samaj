import React from 'react'

function LiveTicker({DT}) {
  return (
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
  )
}

export default LiveTicker
