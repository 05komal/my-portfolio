import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Experience", "Projects", "Skills", "Achievements", "Contact"];

const SKILLS = [
  { cat: "Languages", items: ["Python", "Java", "C", "JavaScript", "Solidity", "SQL"] },
  { cat: "Frontend", items: ["React", "Bootstrap", "HTML5", "CSS3", "JSX"] },
  { cat: "Backend", items: ["Node.js", "Express.js", "Django", "FastAPI"] },
  { cat: "Databases", items: ["MongoDB", "PostgreSQL", "SQL"] },
  { cat: "Tools & Platforms", items: ["GitHub", "VS Code", "MATLAB", "PowerBI", "Linux", "Canva", "Docker"] },
  { cat: "Cybersecurity", items: ["Wireshark", "Kali Linux", "Putty", "Cisco Packet Tracer"] },
  { cat: "Blockchain", items: ["Solidity", "Truffle", "MetaMask", "Ganache", "Hardhat", "Ethers.js", "Echidna Testing"] },
  { cat: "AI / ML", items: ["Machine Learning", "Deep Learning", "Image Processing", "FastAPI Deployment", "Feature Engineering", "Model Evaluation"] },
];

const EXPERIENCE = [
  {
    role: "Student Researcher",
    org: "Council of Scientific & Industrial Research (CSIR) – 4pi",
    loc: "Bangalore",
    period: "July 2025 – Jan 2026",
    points: [
      "Engineered data pipelines for network telemetry ingestion & built integrated dashboards for anomaly/attack pattern visualization.",
      "Created and labeled custom deepfake dataset; applied augmentation and preprocessing to improve model robustness.",
      "Productionized models through FastAPI endpoints and MATLAB-based GUI apps for real-time testing.",
      "Performed feature engineering, model evaluation (Precision/Recall/F1), and deployment-ready packaging.",
    ],
    papers: [
      "Network-Borne Cyber Attacks: A Hybrid Survey of Vectors, Techniques, and Impacts",
      "Deepfake Detection through Multi-Scale Preprocessing and Face Localization",
    ],
  },
  {
    role: "Software Developer Intern",
    org: "Indian Institute of Technology, Delhi",
    loc: "On-site",
    period: "May 2024 – July 2024",
    points: [
      "Full-stack development using React, Node.js, Express.js, MongoDB.",
      "Increased site performance by 20% and user engagement by 15% through mobile-responsive UI.",
      "Reduced API response time by 25% with optimized Express.js backend.",
      "Implemented data integrity mechanisms, cutting error rates by 30%.",
    ],
    papers: [],
  },
  {
    role: "Cisco AICTE Virtual Intern",
    org: "Cisco",
    loc: "Virtual",
    period: "May 2024 – July 2024",
    points: [
      "Resolved network issues with 90% success in Cisco Packet Tracer.",
      "Designed and configured networks using RIP, OSPF, and EIGRP protocols.",
    ],
    papers: [],
  },
  {
    role: "Cyber Security Intern",
    org: "APSSDC Edunet Foundation (IBM)",
    loc: "Virtual",
    period: "May 2024 – June 2024",
    points: [
      "Completed 40+ hours of hands-on cybersecurity training through IBM.",
      "Improved firewall efficiency by 25%, conducted 10 vulnerability assessments, mitigated 12 critical risks.",
    ],
    papers: [],
  },
];

const PROJECTS = [
  {
    name: "BSA Website",
    stack: "JavaScript · Node.js · SQL · HTML5/CSS",
    desc: "Digitizing sports management — streamlined events, boosted student engagement by 20%, and provided data-driven insights for better resource planning.",
    color: "#00f5d4",
    icon: "🏟️",
  },
  {
    name: "Water Bill Management dApp",
    stack: "Solidity · JavaScript · Hardhat · Ganache · MetaMask",
    desc: "Blockchain-based decentralized application for water bill management with secure transactions, real-time bill generation, and MetaMask wallet integration.",
    color: "#f72585",
    icon: "⛓️",
  },
  {
    name: "Room Designer & Planner",
    stack: "Python · Django · PostgreSQL · HTML5/CSS",
    desc: "3D room design platform enhancing creativity and efficiency in room planning with collaborative features and personalized design choices.",
    color: "#7209b7",
    icon: "🏠",
  },
];

const CERTIFICATIONS = [
  { name: "Red Hat Certified Enterprise Application Developer", org: "Red Hat", url: "https://www.credly.com/badges/a0fe6707-ad56-4ca2-852f-bcc07f72fd98/public_url" },
  { name: "Salesforce Certified AI Associate", org: "Salesforce", url: "https://drive.google.com/file/d/1uRMxkz-6alrfEHJGe0KoXznpn53wh4LK/view?usp=sharing" },
  { name: "Oracle Cloud Infrastructure 2024 Generative AI Certified Professional", org: "Oracle", url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=9AF3CB88C6C325AB53F6080232B55A88A7074FFF8812724D06C7640FEB84E37B" },
  { name: "Essentials Automation Certification 2024", org: "Automation Anywhere", url: "https://certificates.automationanywhere.com/de2213e8-c44b-4afe-86fe-cc0e2e004c03#acc.FEXOrp6d" },
  { name: "Certified AppSec Practitioner (CAP) with Merit", org: "The SecOps Group", url: "https://drive.google.com/file/d/17Ddbjp96ytNJwqUSD80jJYC_7T-hweF5/view?usp=sharing" },
  { name: "Aviatrix Certified Engineer – Multicloud Network Associate", org: "Aviatrix", url: "https://www.credly.com/badges/a8467216-f034-4737-8c4b-3e1fe47deebe/public_url" },
];

const ACHIEVEMENTS = [
  { icon: "🥇", text: "Ranked 1st in Extension & Outreach activities at KL University." },
  { icon: "🏆", text: "Ranked 5th at IDE Bootcamp (Edition 2 – Phase 1) by MoE & AICTE among 300+ participants." },
  { icon: "🛡️", text: "Participated in Cyber Security Workshop at IIT Delhi with Kaspersky." },
  { icon: "🇮🇳", text: "Participated in Republic Day Parade 2024, New Delhi (NCC)." },
  { icon: "⭐", text: "Senior Under Officer, 22 Andhra Battalion — trained and led 600+ cadets across 13 national & training camps." },
  { icon: "🎤", text: "Demonstrated leadership at IDE Bootcamp, achieving 5th place among 300+ participants." },
];

// Animated counter hook
function useCounter(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

export default function KomalPortfolio() {
  const [activeSection, setActiveSection] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  const internships = useCounter(4, 1200, statsVisible);
  const projects = useCounter(3, 1200, statsVisible);
  const certs = useCounter(6, 1400, statsVisible);
  const cgpa = useCounter(86, 1500, statsVisible);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(n => document.getElementById(n.toLowerCase()));
      const scrollY = window.scrollY + 120;
      sections.forEach((s, i) => {
        if (s && scrollY >= s.offsetTop && scrollY < s.offsetTop + s.offsetHeight) {
          setActiveSection(NAV_LINKS[i]);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{
      fontFamily: "'Syne', 'DM Sans', sans-serif",
      background: "#050510",
      color: "#e8e8f0",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050510; }
        ::-webkit-scrollbar-thumb { background: #00f5d4; border-radius: 4px; }
        html { scroll-behavior: smooth; }

        .nav-link {
          background: none; border: none; cursor: pointer; font-family: 'Syne', sans-serif;
          font-size: 0.85rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 6px 4px; transition: color 0.2s; color: #888;
        }
        .nav-link:hover { color: #00f5d4; }
        .nav-link.active { color: #00f5d4; }

        .glitch {
          position: relative;
          animation: glitchAnim 4s infinite;
        }
        @keyframes glitchAnim {
          0%, 90%, 100% { text-shadow: none; }
          92% { text-shadow: -3px 0 #f72585, 3px 0 #00f5d4; }
          94% { text-shadow: 3px 0 #f72585, -3px 0 #00f5d4; }
          96% { text-shadow: -3px 0 #f72585, 3px 0 #00f5d4; }
        }

        .hero-enter { opacity: 0; transform: translateY(30px); }
        .hero-visible { opacity: 1; transform: translateY(0); transition: all 0.8s cubic-bezier(0.22,1,0.36,1); }
        .hero-d1 { transition-delay: 0s !important; }
        .hero-d2 { transition-delay: 0.15s !important; }
        .hero-d3 { transition-delay: 0.3s !important; }
        .hero-d4 { transition-delay: 0.45s !important; }

        .card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .card:hover {
          border-color: rgba(0,245,212,0.3);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,245,212,0.08);
        }

        .tag {
          display: inline-block;
          background: rgba(0,245,212,0.08);
          border: 1px solid rgba(0,245,212,0.2);
          color: #00f5d4;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-family: 'DM Mono', monospace;
          margin: 3px;
        }

        .skill-tag {
          display: inline-block;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: #ccc;
          padding: 5px 12px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-family: 'DM Mono', monospace;
          margin: 4px;
          transition: all 0.2s;
          cursor: default;
        }
        .skill-tag:hover {
          background: rgba(0,245,212,0.1);
          border-color: rgba(0,245,212,0.4);
          color: #00f5d4;
        }

        .section-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1;
          margin-bottom: 8px;
        }
        .section-subtitle {
          color: #666;
          font-family: 'DM Mono', monospace;
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 48px;
        }

        .timeline-dot {
          width: 12px; height: 12px;
          background: #00f5d4;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 12px #00f5d4;
          margin-top: 6px;
        }

        .cert-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 16px 20px;
          transition: all 0.3s;
        }
        .cert-card:hover {
          border-color: rgba(247,37,133,0.4);
          background: rgba(247,37,133,0.04);
          transform: translateX(6px);
        }

        .stat-num {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00f5d4, #7209b7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-family: 'Syne', sans-serif;
          line-height: 1;
        }

        .noise-overlay {
          position: fixed; inset: 0; pointer-events: none; z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.4;
        }

        .grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(0,245,212,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,212,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .glow-orb {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(100px);
          z-index: 0;
        }

        .btn-primary {
          background: #00f5d4;
          color: #050510;
          border: none;
          padding: 12px 28px;
          border-radius: 8px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-primary:hover { background: #fff; box-shadow: 0 0 30px rgba(0,245,212,0.4); }

        .btn-outline {
          background: transparent;
          color: #00f5d4;
          border: 1px solid rgba(0,245,212,0.5);
          padding: 12px 28px;
          border-radius: 8px;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-outline:hover { background: rgba(0,245,212,0.1); }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-nav { display: none !important; }
        }
      `}</style>

      {/* Background elements */}
      <div className="grid-bg" />
      <div className="noise-overlay" />
      <div className="glow-orb" style={{ width: 600, height: 600, background: "rgba(0,245,212,0.06)", top: -200, right: -200 }} />
      <div className="glow-orb" style={{ width: 500, height: 500, background: "rgba(114,9,183,0.08)", bottom: "20%", left: -150 }} />

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(5,5,16,0.85)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "0 clamp(20px,5vw,80px)", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#00f5d4", letterSpacing: "-0.02em" }}>
          K<span style={{ color: "#f72585" }}>.</span>
        </span>

        <div className="desktop-nav" style={{ display: "flex", gap: 32 }}>
          {NAV_LINKS.map(n => (
            <button key={n} className={`nav-link ${activeSection === n ? "active" : ""}`} onClick={() => scrollTo(n)}>
              {n}
            </button>
          ))}
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "1.4rem" }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="mobile-nav" style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 99,
          background: "rgba(5,5,16,0.97)", padding: "20px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex", flexDirection: "column", gap: 8,
        }}>
          {NAV_LINKS.map(n => (
            <button key={n} className={`nav-link ${activeSection === n ? "active" : ""}`} style={{ textAlign: "left", padding: "10px 0" }} onClick={() => scrollTo(n)}>
              {n}
            </button>
          ))}
        </div>
      )}

      <div style={{ position: "relative", zIndex: 2 }}>

        {/* HERO */}
        <section id="about" style={{
          minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "100px clamp(20px,8vw,120px) 80px",
        }}>
          <div className={`hero-enter hero-d1 ${heroVisible ? "hero-visible" : ""}`}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", color: "#00f5d4", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              ◈ Available for opportunities
            </span>
          </div>

          <div className={`hero-enter hero-d2 ${heroVisible ? "hero-visible" : ""}`} style={{ marginTop: 24 }}>
            <h1 className="glitch" style={{
              fontSize: "clamp(3.5rem, 10vw, 8rem)", fontWeight: 800,
              lineHeight: 0.95, letterSpacing: "-0.04em",
              background: "linear-gradient(135deg, #ffffff 40%, #00f5d4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Komal
            </h1>
          </div>

          <div className={`hero-enter hero-d3 ${heroVisible ? "hero-visible" : ""}`} style={{ marginTop: 20, maxWidth: 640 }}>
            <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: "#aaa", lineHeight: 1.7, fontWeight: 300 }}>
              Full-Stack Developer · AI/ML Researcher · Cybersecurity Enthusiast ·
              Blockchain Builder — crafting secure, intelligent, and scalable systems.
            </p>
          </div>

          <div className={`hero-enter hero-d4 ${heroVisible ? "hero-visible" : ""}`} style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["Python", "React", "Node.js", "Solidity", "ML", "Cybersecurity"].map(s => (
              <span key={s} className="tag">{s}</span>
            ))}
          </div>

          <div className={`hero-enter hero-d4 ${heroVisible ? "hero-visible" : ""}`} style={{ marginTop: 36, display: "flex", flexWrap: "wrap", gap: 12 }}>
            <button className="btn-primary" onClick={() => scrollTo("Contact")}>Get In Touch</button>
            <button className="btn-outline" onClick={() => scrollTo("Projects")}>View Work</button>
          </div>

          {/* Stats */}
          <div ref={statsRef} style={{
            marginTop: 72, display: "flex", flexWrap: "wrap", gap: 40,
          }}>
            {[
              { val: internships, suffix: "+", label: "Internships" },
              { val: projects, suffix: "", label: "Projects" },
              { val: certs, suffix: "", label: "Certifications" },
              { val: cgpa, suffix: "%", label: "Academic Score" },
            ].map(({ val, suffix, label }) => (
              <div key={label}>
                <div className="stat-num">{val}{suffix}</div>
                <div style={{ color: "#555", fontSize: "0.75rem", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" style={{ padding: "80px clamp(20px,8vw,120px)" }}>
          <p className="section-subtitle">{"//"} work experience</p>
          <h2 className="section-title">Where I've <span style={{ color: "#00f5d4" }}>Worked</span></h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 32, marginTop: 48 }}>
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="card" style={{ padding: "28px 32px", display: "flex", gap: 20 }}>
                <div>
                  <div className="timeline-dot" />
                  {i < EXPERIENCE.length - 1 && <div style={{ width: 1, background: "rgba(255,255,255,0.06)", margin: "8px auto 0", height: "100%", minHeight: 60 }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
                    <div>
                      <h3 style={{ fontWeight: 700, fontSize: "1.1rem", color: "#fff" }}>{exp.role}</h3>
                      <p style={{ color: "#00f5d4", fontSize: "0.85rem", fontFamily: "'DM Mono', monospace" }}>{exp.org} — {exp.loc}</p>
                    </div>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#555", whiteSpace: "nowrap" }}>{exp.period}</span>
                  </div>
                  <ul style={{ listStyle: "none", marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                    {exp.points.map((p, j) => (
                      <li key={j} style={{ display: "flex", gap: 10, fontSize: "0.88rem", color: "#aaa", lineHeight: 1.6 }}>
                        <span style={{ color: "#f72585", flexShrink: 0, marginTop: 2 }}>▸</span> {p}
                      </li>
                    ))}
                  </ul>
                  {exp.papers.length > 0 && (
                    <div style={{ marginTop: 16 }}>
                      <p style={{ fontSize: "0.75rem", color: "#555", fontFamily: "'DM Mono', monospace", marginBottom: 6, letterSpacing: "0.1em" }}>RESEARCH PAPERS</p>
                      {exp.papers.map((paper, k) => (
                        <div key={k} style={{ fontSize: "0.82rem", color: "#7209b7", marginBottom: 4 }}>📄 {paper}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" style={{ padding: "80px clamp(20px,8vw,120px)" }}>
          <p className="section-subtitle">{"//"} projects</p>
          <h2 className="section-title">Things I've <span style={{ color: "#f72585" }}>Built</span></h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: 24, marginTop: 48,
          }}>
            {PROJECTS.map((proj, i) => (
              <div key={i} className="card" style={{ padding: "28px", position: "relative", overflow: "hidden" }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: `linear-gradient(90deg, ${proj.color}, transparent)`,
                }} />
                <div style={{ fontSize: "2rem", marginBottom: 16 }}>{proj.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: "1.15rem", marginBottom: 8, color: "#fff" }}>{proj.name}</h3>
                <p style={{ fontSize: "0.85rem", color: "#888", lineHeight: 1.7, marginBottom: 16 }}>{proj.desc}</p>
                <div>
                  {proj.stack.split("·").map(s => (
                    <span key={s} style={{
                      display: "inline-block", fontSize: "0.7rem", fontFamily: "'DM Mono', monospace",
                      color: proj.color, background: `${proj.color}12`, border: `1px solid ${proj.color}30`,
                      padding: "2px 8px", borderRadius: 6, margin: "2px",
                    }}>{s.trim()}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" style={{ padding: "80px clamp(20px,8vw,120px)" }}>
          <p className="section-subtitle">{"//"} tech stack</p>
          <h2 className="section-title">My <span style={{ color: "#7209b7" }}>Skills</span></h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: 20, marginTop: 48,
          }}>
            {SKILLS.map((group, i) => (
              <div key={i} className="card" style={{ padding: "22px 24px" }}>
                <p style={{ fontSize: "0.72rem", fontFamily: "'DM Mono', monospace", color: "#555", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>{group.cat}</p>
                <div>{group.items.map(s => <span key={s} className="skill-tag">{s}</span>)}</div>
              </div>
            ))}
          </div>

          {/* Languages */}
          <div style={{ marginTop: 32 }} className="card">
            <div style={{ padding: "22px 24px" }}>
              <p style={{ fontSize: "0.72rem", fontFamily: "'DM Mono', monospace", color: "#555", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>
                🌍 Human Languages
              </p>
              <div>
                {["English", "Hindi", "French (B1)", "Punjabi", "Telugu"].map(l => (
                  <span key={l} className="skill-tag">{l}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section id="achievements" style={{ padding: "80px clamp(20px,8vw,120px)" }}>
          <p className="section-subtitle">{"//"} achievements</p>
          <h2 className="section-title">Awards & <span style={{ color: "#00f5d4" }}>Recognition</span></h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))", gap: 16, marginTop: 48 }}>
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12, padding: "18px 20px", display: "flex", gap: 14, alignItems: "flex-start",
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,245,212,0.3)"; e.currentTarget.style.background = "rgba(0,245,212,0.03)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
              >
                <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{a.icon}</span>
                <p style={{ fontSize: "0.88rem", color: "#aaa", lineHeight: 1.6 }}>{a.text}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div style={{ marginTop: 64 }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 24, color: "#fff" }}>
              Certifications <span style={{ color: "#f72585", fontSize: "1rem", fontFamily: "'DM Mono', monospace", fontWeight: 400 }}>{"//"} {CERTIFICATIONS.length} total</span>
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {CERTIFICATIONS.map((c, i) => (
                <a key={i} href={c.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <div className="cert-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ color: "#f72585", fontFamily: "'DM Mono', monospace", fontSize: "0.75rem" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontSize: "0.88rem", color: "#ddd" }}>{c.name}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#555" }}>{c.org}</span>
                    <span style={{ fontSize: "0.75rem", color: "#00f5d4" }}>↗</span>
                  </div>
                </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ padding: "80px clamp(20px,8vw,120px) 120px" }}>
          <p className="section-subtitle">{"//"} contact</p>
          <h2 className="section-title">Let's <span style={{ color: "#f72585" }}>Connect</span></h2>

          <div style={{ maxWidth: 600, marginTop: 48 }}>
            <p style={{ color: "#888", lineHeight: 1.8, fontSize: "1rem", marginBottom: 40 }}>
              I'm currently pursuing my BTech at KL University (2026) and open to internship, research, and full-time opportunities. Let's build something remarkable together.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "✉️", label: "Email", val: "komal742825@gmail.com", href: "https://mail.google.com/mail/?view=cm&to=komal742825@gmail.com", target: "_blank" },
                { icon: "📞", label: "Phone", val: "+91 7428251169", href: "tel:+917428251169", target: "_self" },
                { icon: "🔗", label: "LinkedIn", val: "linkedin.com/in/komal-6779783a5", href: "https://www.linkedin.com/in/komal-6779783a5", target: "_blank" },
                { icon: "🐙", label: "GitHub", val: "github.com/05komal", href: "https://github.com/05komal", target: "_blank" },
              ].map((item) => (
                <a key={item.label} href={item.href} target={item.target} rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 16,
                    background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 12, padding: "16px 20px",
                    transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,245,212,0.3)"; e.currentTarget.style.background = "rgba(0,245,212,0.04)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                    <div>
                      <p style={{ fontSize: "0.7rem", color: "#555", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.label}</p>
                      <p style={{ color: "#00f5d4", fontSize: "0.9rem", fontFamily: "'DM Mono', monospace" }}>{item.val}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "24px clamp(20px,8vw,120px)",
          display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12,
          color: "#333", fontSize: "0.75rem", fontFamily: "'DM Mono', monospace",
        }}>
          <span>© 2025 Komal — All rights reserved</span>
          <span>Built with <span style={{ color: "#f72585" }}>♥</span> & React</span>
        </footer>
      </div>
    </div>
  );
}