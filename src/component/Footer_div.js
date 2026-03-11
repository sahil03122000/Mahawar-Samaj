import React from 'react'
import data from "../data/siteData.json"

function Footer_div({setTab}) {
  return (
     <footer className="footer">
        <div className="fg">
          <div>
            <span className="flogo">{data.site.hindi}</span>
            <div style={{ fontFamily: "'Crimson Pro',serif", fontStyle: "italic", color: "var(--gd)", fontSize: ".82rem" }}>
              {data.site.name} • Est. {data.site.year}
            </div>
            <p className="fdesc">
              {data.site.tagline}
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
              {data.footer.services.map(l =>
                <li key={l}>{l}</li>
              )}
            </ul>
          </div>

          <div>
            <div className="fh">Contact</div>
            <ul className="ful" style={{ listStyle: "none" }}>
              {data.contactus.map(l => (
                <li key={l.l} style={{ padding: "4px 0", fontSize: ".85rem", opacity: .7 }}>
                  <span>{l.i}</span> {l.v}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="fb">
          <p style={{ fontSize: "1rem", marginBottom: "5px", opacity: .85 }}>
            {data.footer.pray}
          </p>
          <p>© {data.site.year} {data.site.name}. All rights reserved.</p>
          <p style={{ fontSize: ".9rem", opacity: .8 }}>
            Powered By ❤️
            <a
              className="dev"
              href={data.footer.poweredbyur}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.footer.poweredby}
            </a>
          </p>
        </div>
      </footer>
  )
}

export default Footer_div
