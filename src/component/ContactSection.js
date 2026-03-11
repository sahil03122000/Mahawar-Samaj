import React, { useState } from 'react'
import data from "../data/siteData.json"

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
                {data.contactus.map(c => (
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

export default ContactSection
