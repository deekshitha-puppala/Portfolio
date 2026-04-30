import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';

/* =========================================================================
   DATA
   ========================================================================= */
const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/hackathons', label: 'Hackathons' },
  { to: '/publications', label: 'Research' },
  { to: '/social', label: 'Social' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact' }
];

const PROGRAMMING_SKILLS = [
  { name: 'Java', pct: 90 },
  { name: 'Python', pct: 85 },
  { name: 'JavaScript', pct: 80 },
  { name: 'C', pct: 75 },
  { name: 'SQL', pct: 85 },
  { name: 'HTML + CSS', pct: 90 }
];

const DEVOPS_SKILLS = [
  { name: 'Docker', ico: '🐳' },
  { name: 'Kubernetes', ico: '☸️' },
  { name: 'Jenkins', ico: '⚙️' },
  { name: 'Azure DevOps', ico: '☁️' },
  { name: 'Ansible', ico: '🔧' },
  { name: 'Terraform', ico: '🏗️' },
  { name: 'Splunk', ico: '📊' },
  { name: 'Git', ico: '🌿' },
  { name: 'Maven', ico: '📦' },
  { name: 'JIRA', ico: '📋' }
];

const AI_SKILLS = [
  { name: 'Artificial Intelligence', ico: '🧠' },
  { name: 'OpenCV', ico: '👁️' },
  { name: 'Pandas', ico: '🐼' },
  { name: 'Pillow', ico: '🖼️' }
];

const CONCEPT_SKILLS = [
  { name: 'DSA', ico: '🧮' },
  { name: 'DBMS', ico: '🗄️' },
  { name: 'Computer Networks', ico: '🌐' },
  { name: 'Linux', ico: '🐧' },
  { name: 'CI / CD', ico: '🔁' },
  { name: 'Agile', ico: '🚀' }
];

const PROJECTS = [
  {
    title: 'SmartPix — Image Enhancement System',
    date: 'Nov 2025 – Mar 2026',
    desc: 'AI-powered image processing and enhancement system. Applies advanced filters, sharpening, and quality refinement using OpenCV pipelines and statistical analysis on image datasets.',
    stack: ['Python', 'OpenCV', 'PIL', 'Pandas', 'AI']
  },
  {
    title: 'DrumKit — Web App',
    date: 'Jun 2025 – Jul 2025',
    desc: 'Interactive in-browser drum kit. Each drum responds to keyboard and mouse events with real-time audio playback and animated UI feedback for tactile, gamified rhythm play.',
    stack: ['HTML', 'CSS', 'JavaScript', 'DOM Events']
  },
  {
    title: 'ATM Machine Simulation',
    date: 'Feb 2024 – Mar 2024',
    desc: 'Console-based banking simulator written in core Java. Implements PIN authentication, deposit, withdrawal, balance enquiry, and session handling with clean OOP design.',
    stack: ['Java', 'OOP', 'CLI']
  }
];

const CERTIFICATIONS = [
  { name: 'Generative AI — Beginner', issuer: 'Udemy', icon: '🤖' },
  { name: 'Backend Development Bootcamp', issuer: 'Student Development Community (SNIST)', icon: '⚡' },
  { name: 'AZ-104 — Microsoft Azure Administrator', issuer: 'Microsoft', icon: '☁️' },
  { name: 'SQL (Basic)', issuer: 'HackerRank', icon: '🗃️' },
  { name: 'DevOps Fundamentals', issuer: 'Cognizant Internal', icon: '🛠️' }
];

const HACKATHONS = [
  { name: 'UX-Plosion Hackathon', org: 'Student Development Community, SNIST', icon: '🏆', badge: 'PARTICIPANT' },
  { name: 'Felicity Virtual Labs Hackathon', org: 'IIIT Hyderabad', icon: '🥇', badge: 'PARTICIPANT' }
];

const SOCIALS = [
  { name: 'LinkedIn', handle: '/in/deekshithapuppala', icon: '💼', href: 'https://linkedin.com/in/deekshithapuppala' },
  { name: 'GitHub', handle: '@deekshitha', icon: '🐙', href: 'https://github.com/' },
  { name: 'HackerRank', handle: 'puppaladeekshitha', icon: '🧠', href: 'https://www.hackerrank.com/' },
  { name: 'CodeChef', handle: 'deekshitha_p', icon: '👨‍🍳', href: 'https://www.codechef.com/' },
  { name: 'Email', handle: 'puppaladeekshitha2@gmail.com', icon: '✉️', href: 'mailto:puppaladeekshitha2@gmail.com' }
];

const ROLES = ['DevOps Engineer', 'Cloud Enthusiast', 'Java Developer', 'Problem Solver'];

/* =========================================================================
   ANIMATION VARIANTS
   ========================================================================= */
const pageVariants = {
  initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, filter: 'blur(4px)', transition: { duration: 0.3, ease: 'easeIn' } }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.15 } }
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const sectionReveal = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
};

/* =========================================================================
   NAVBAR
   ========================================================================= */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <motion.nav
      className={`nav ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Link to="/" className="nav-logo" aria-label="Home">PD</Link>

      <div className={`nav-links ${open ? 'open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <button className="nav-burger" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
        <span style={{ transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
        <span style={{ opacity: open ? 0 : 1 }} />
        <span style={{ transform: open ? 'rotate(-45deg) translate(6px, -6px)' : 'none' }} />
      </button>
    </motion.nav>
  );
}

/* =========================================================================
   HERO HELPERS
   ========================================================================= */
function RoleCycler() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROLES.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="hero-role">
      <span className="arrow">{'>'}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[idx]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
        >
          {ROLES[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function FloatingParticles({ count = 24 }) {
  const particles = useRef(
    Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 6 + Math.random() * 6,
      size: 2 + Math.random() * 3
    }))
  ).current;
  return (
    <div className="particles" aria-hidden>
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.7, 0.2]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}

/* =========================================================================
   HOME
   ========================================================================= */
function Home() {
  const navigate = useNavigate();
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <section className="hero">
        <FloatingParticles />
        <motion.div variants={stagger} initial="initial" animate="animate" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div variants={fadeUp} className="hero-tag">// PORTFOLIO · 2026</motion.div>
          <motion.h1 variants={fadeUp} className="hero-name">
            PUPPALA DEEKSHITHA<span className="cursor">_</span>
          </motion.h1>
          <motion.div variants={fadeUp}>
            <RoleCycler />
          </motion.div>
          <motion.p variants={fadeUp} className="hero-tagline">
            Building scalable systems. One pipeline at a time. B.Tech CSE-IoT student
            and DevOps Intern at <span style={{ color: 'var(--cyan)' }}>Cognizant</span>,
            bridging code, cloud, and automation.
          </motion.p>
          <motion.div variants={fadeUp} className="hero-ctas">
            <button className="btn btn-primary" onClick={() => navigate('/resume')}>VIEW RESUME</button>
            <button className="btn btn-ghost" onClick={() => navigate('/contact')}>CONTACT ME →</button>
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-ind"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <span className="mouse" />
          <span>SCROLL</span>
        </motion.div>
      </section>
    </motion.div>
  );
}

/* =========================================================================
   ABOUT
   ========================================================================= */
function StatCard({ num, label, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [val, setVal] = useState(0);
  const numeric = typeof num === 'number';

  useEffect(() => {
    if (!inView || !numeric) return;
    const start = performance.now();
    const dur = 1200;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      setVal(Math.round(p * num * 100) / 100);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, num, numeric]);

  return (
    <motion.div ref={ref} className="stat-card" {...sectionReveal}>
      <div className="stat-num">{numeric ? `${val}${suffix}` : num}</div>
      <div className="stat-label">{label}</div>
    </motion.div>
  );
}

function About() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <section className="section">
        <motion.div className="section-tag" {...sectionReveal}>// 01 · WHO I AM</motion.div>
        <motion.h2 className="section-title" {...sectionReveal}>About Me</motion.h2>
        <motion.p className="section-sub" {...sectionReveal}>
          Engineer-in-training. Tinkerer at heart. Always one terminal window away from a new pipeline.
        </motion.p>

        <div className="about-grid">
          <motion.div
            className="about-photo"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03, y: -6, boxShadow: '0 0 60px rgba(0, 245, 255, 0.3)' }}
          >
            PD
          </motion.div>

          <motion.div className="about-text" {...sectionReveal}>
            <p>
              I'm a <strong>Computer Science (IoT)</strong> undergraduate at SNIST, graduating in
              <span className="accent"> 2026</span>, currently interning as a
              <strong> Programmer Analyst Trainee / DevOps Intern</strong> at
              <span className="accent"> Cognizant</span>, Chennai.
            </p>
            <p>
              I'm passionate about <strong>DevOps, CI/CD, automation</strong> and clean Java backends.
              My day-to-day blends Jenkins pipelines, container orchestration, infrastructure-as-code,
              and the occasional debugging marathon — all in service of making software ship faster
              and break less.
            </p>
            <p>
              Outside of work, I'm building <span className="accent">SmartPix</span> — my final-year
              capstone — an AI-powered image enhancement system. I run, play throwball and kho-kho,
              and volunteer with NSS.
            </p>

            <div className="tags-row">
              <span className="tag-pill">🌏 Telugu</span>
              <span className="tag-pill">🌏 English</span>
              <span className="tag-pill">🏃 Running</span>
              <span className="tag-pill">🤾 Throwball</span>
              <span className="tag-pill">🏐 Kho-Kho</span>
              <span className="tag-pill">🤝 NSS Volunteer</span>
            </div>
          </motion.div>
        </div>

        <div className="stats-grid">
          <StatCard num={9.04} label="CGPA" />
          <StatCard num={3} label="Projects" />
          <StatCard num={5} label="Certifications" />
          <StatCard num="Cognizant" label="Internship" />
        </div>
      </section>
    </motion.div>
  );
}

/* =========================================================================
   SKILLS
   ========================================================================= */
function SkillBar({ name, pct }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <div className="skill-bar-wrap" ref={ref}>
      <div className="skill-bar-head">
        <span className="name">{name}</span>
        <span className="pct">{pct}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function SkillPillGrid({ items }) {
  return (
    <div className="skill-pill-grid">
      {items.map((s, i) => (
        <motion.div
          key={s.name}
          className="skill-pill"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          whileHover={{ scale: 1.05, y: -4 }}
        >
          <span className="ico">{s.ico}</span>
          <span>{s.name}</span>
        </motion.div>
      ))}
    </div>
  );
}

function Skills() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <section className="section">
        <motion.div className="section-tag" {...sectionReveal}>// 02 · TOOLKIT</motion.div>
        <motion.h2 className="section-title" {...sectionReveal}>Skills & Stack</motion.h2>
        <motion.p className="section-sub" {...sectionReveal}>
          The languages, tools, and concepts I reach for to build, deploy, and operate software.
        </motion.p>

        <div className="skill-cat">
          <div className="skill-cat-title">DEVOPS & CLOUD</div>
          <SkillPillGrid items={DEVOPS_SKILLS} />
        </div>

        <div className="skill-cat">
          <div className="skill-cat-title">PROGRAMMING LANGUAGES</div>
          {PROGRAMMING_SKILLS.map((s) => (
            <SkillBar key={s.name} name={s.name} pct={s.pct} />
          ))}
        </div>

        <div className="skill-cat">
          <div className="skill-cat-title">AI / ML & DATA</div>
          <SkillPillGrid items={AI_SKILLS} />
        </div>

        <div className="skill-cat">
          <div className="skill-cat-title">CORE CS CONCEPTS</div>
          <SkillPillGrid items={CONCEPT_SKILLS} />
        </div>
      </section>
    </motion.div>
  );
}

/* =========================================================================
   EXPERIENCE
   ========================================================================= */
function TimelineCard({ side, date, role, org, points }) {
  return (
    <div className={`timeline-item ${side}`}>
      <motion.div
        className="timeline-card"
        initial={{ opacity: 0, x: side === 'left' ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.02, y: -4 }}
      >
        <div className="timeline-date">{date}</div>
        <div className="timeline-role">{role}</div>
        <div className="timeline-org">{org}</div>
        <ul className="timeline-list">
          {points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

function Experience() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <section className="section">
        <motion.div className="section-tag" {...sectionReveal}>// 03 · IN THE FIELD</motion.div>
        <motion.h2 className="section-title" {...sectionReveal}>Experience</motion.h2>
        <motion.p className="section-sub" {...sectionReveal}>
          Where I'm currently shipping, breaking, and re-shipping things in production-shaped environments.
        </motion.p>

        <div className="timeline">
          <TimelineCard
            side="left"
            date="JAN 2026 — PRESENT · CHENNAI, TN"
            role="Programmer Analyst Trainee · DevOps Intern"
            org="Cognizant"
            points={[
              'Designing and maintaining CI/CD pipelines using Jenkins and Azure DevOps',
              'Containerizing services with Docker; orchestrating workloads on Kubernetes (Microsoft Azure)',
              'Authoring infrastructure-as-code modules in Terraform for repeatable cloud provisioning',
              'Automating server configuration and rollout with Ansible playbooks',
              'Building dashboards and alerts in Splunk for application observability',
              'Managing source and artifacts via Git and Maven; tracking sprints in JIRA under an Agile workflow'
            ]}
          />

          <TimelineCard
            side="right"
            date="2022 — 2026 · HYDERABAD, TG"
            role="B.Tech · Computer Science (IoT)"
            org="Sreenidhi Institute of Science and Technology"
            points={[
              'Current CGPA: 9.04 / 10',
              'Coursework: DSA, DBMS, Computer Networks, Operating Systems, AI/ML, IoT',
              'Capstone: SmartPix — AI image enhancement system',
              'Active member · Student Development Community (SDC)'
            ]}
          />

          <TimelineCard
            side="left"
            date="SEP 2024 — PRESENT"
            role="NSS Volunteer · Social Services"
            org="National Service Scheme, SNIST"
            points={[
              'Community outreach drives, awareness campaigns, and campus initiatives',
              'Organising volunteer schedules and on-ground coordination'
            ]}
          />
        </div>
      </section>
    </motion.div>
  );
}

/* =========================================================================
   PROJECTS
   ========================================================================= */
function Projects() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <section className="section">
        <motion.div className="section-tag" {...sectionReveal}>// 04 · BUILDS</motion.div>
        <motion.h2 className="section-title" {...sectionReveal}>Projects</motion.h2>
        <motion.p className="section-sub" {...sectionReveal}>
          Selected things I've built — from AI image pipelines to console-based banking simulators.
        </motion.p>

        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              className="proj-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.03, y: -6 }}
            >
              <span className="proj-date">{p.date}</span>
              <h3 className="proj-title">{p.title}</h3>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-stack">
                {p.stack.map((s) => (
                  <span key={s} className="stack-chip">{s}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

/* =========================================================================
   CERTIFICATIONS
   ========================================================================= */
function Certificates() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <section className="section">
        <motion.div className="section-tag" {...sectionReveal}>// 05 · CREDENTIALS</motion.div>
        <motion.h2 className="section-title" {...sectionReveal}>Certifications</motion.h2>
        <motion.p className="section-sub" {...sectionReveal}>
          Learning never stops. Here are the validated checkpoints along the way.
        </motion.p>

        <div className="cert-grid">
          {CERTIFICATIONS.map((c, i) => (
            <motion.div
              key={c.name}
              className="cert-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.04, y: -6 }}
            >
              <div className="cert-icon">{c.icon}</div>
              <div className="cert-name">{c.name}</div>
              <div className="cert-issuer">{c.issuer}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

/* =========================================================================
   HACKATHONS
   ========================================================================= */
function Hackathons() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <section className="section">
        <motion.div className="section-tag" {...sectionReveal}>// 06 · ARENAS</motion.div>
        <motion.h2 className="section-title" {...sectionReveal}>Hackathons & Conferences</motion.h2>
        <motion.p className="section-sub" {...sectionReveal}>
          Where I've showed up to build, break, and learn under a clock.
        </motion.p>

        <div className="hack-grid">
          {HACKATHONS.map((h, i) => (
            <motion.div
              key={h.name}
              className="hack-card"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ scale: 1.04, y: -6 }}
            >
              <div className="hack-icon">{h.icon}</div>
              <div className="hack-name">{h.name}</div>
              <div className="hack-org">{h.org}</div>
              <span className="hack-badge">{h.badge}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="section-tag"
          style={{ marginTop: 70 }}
          {...sectionReveal}
        >
          // 06.5 · CONFERENCES
        </motion.div>
        <motion.h3
          className="section-title"
          style={{ fontSize: '1.6rem', marginBottom: 24 }}
          {...sectionReveal}
        >
          Conferences Attended
        </motion.h3>

        <motion.div
          className="hack-card"
          style={{ maxWidth: 520 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -4 }}
        >
          <div className="hack-icon">🎤</div>
          <div className="hack-name">Applications of IoT Using Firebase</div>
          <div className="hack-org">Dept. of CSE-IoT, SNIST</div>
          <span className="hack-badge">SEP 2023</span>
        </motion.div>
      </section>
    </motion.div>
  );
}

/* =========================================================================
   PUBLICATIONS
   ========================================================================= */
function Publications() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <section className="section">
        <motion.div className="section-tag" {...sectionReveal}>// 07 · WRITTEN WORK</motion.div>
        <motion.h2 className="section-title" {...sectionReveal}>Research & Papers</motion.h2>
        <motion.p className="section-sub" {...sectionReveal}>
          A space reserved for upcoming research output and technical writing.
        </motion.p>

        <motion.div
          className="empty-state"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="empty-icon"
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            📜
          </motion.span>
          <div className="empty-title">Research coming soon...</div>
          <p className="empty-desc">
            I'm currently working on my SmartPix capstone and exploring publishable angles in
            applied computer vision and DevOps automation. Check back here — papers, write-ups,
            and technical articles will live in this space.
          </p>
        </motion.div>
      </section>
    </motion.div>
  );
}

/* =========================================================================
   SOCIAL
   ========================================================================= */
function Social() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <section className="section">
        <motion.div className="section-tag" {...sectionReveal}>// 08 · ELSEWHERE</motion.div>
        <motion.h2 className="section-title" {...sectionReveal}>Social Footprints</motion.h2>
        <motion.p className="section-sub" {...sectionReveal}>
          Where to find me on the rest of the internet.
        </motion.p>

        <div className="social-grid">
          {SOCIALS.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.04, y: -4 }}
            >
              <div className="social-icon">{s.icon}</div>
              <div>
                <div className="social-name">{s.name}</div>
                <div className="social-handle">{s.handle}</div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="hack-card"
          style={{ marginTop: 50, maxWidth: 560 }}
          {...sectionReveal}
        >
          <div className="hack-icon">🤝</div>
          <div className="hack-name">NSS Volunteer · Social Services</div>
          <div className="hack-org">National Service Scheme, SNIST</div>
          <span className="hack-badge">SEP 2024 — PRESENT</span>
        </motion.div>
      </section>
    </motion.div>
  );
}

/* =========================================================================
   RESUME
   ========================================================================= */
function Resume() {
  const printRef = useRef(null);
  const handleDownload = () => {
    window.print();
  };
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <section className="section">
        <motion.div className="section-tag" {...sectionReveal}>// 09 · ON PAPER</motion.div>
        <motion.h2 className="section-title" {...sectionReveal}>Résumé</motion.h2>
        <motion.p className="section-sub" {...sectionReveal}>
          A structured snapshot — education, skills, and the highlights so far.
        </motion.p>

        <motion.div
          {...sectionReveal}
          style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}
        >
          <button className="btn btn-primary" onClick={handleDownload}>⬇ DOWNLOAD RESUME</button>
        </motion.div>

        <motion.div className="resume-doc" ref={printRef} {...sectionReveal}>
          <div className="resume-head">
            <div>
              <div className="resume-name">PUPPALA DEEKSHITHA</div>
              <div className="resume-role">Programmer Analyst Trainee · DevOps Intern @ Cognizant</div>
            </div>
            <div className="resume-contact">
              📧 puppaladeekshitha2@gmail.com<br />
              📱 +91 9908010098<br />
              📍 Hyderabad, Telangana<br />
              🔗 linkedin.com/in/deekshithapuppala
            </div>
          </div>

          <div className="resume-section">
            <h3>EDUCATION</h3>
            <table className="resume-table">
              <thead>
                <tr>
                  <th>Qualification</th>
                  <th>Institution</th>
                  <th>Year</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>B.Tech — CSE (IoT)</td>
                  <td>Sreenidhi Institute of Science and Technology</td>
                  <td>2022 – 2026</td>
                  <td>CGPA 9.04</td>
                </tr>
                <tr>
                  <td>Class XII (MPC)</td>
                  <td>Narayana Junior College</td>
                  <td>2020 – 2022</td>
                  <td>96%</td>
                </tr>
                <tr>
                  <td>Class X</td>
                  <td>St. Mary's High School</td>
                  <td>2020</td>
                  <td>10 GPA</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="resume-section">
            <h3>INTERNSHIP HIGHLIGHTS</h3>
            <ul className="resume-list">
              <li>Built and maintained CI/CD pipelines on Jenkins and Azure DevOps</li>
              <li>Containerized services with Docker; deployed to Kubernetes on Azure</li>
              <li>Provisioned cloud infrastructure as code using Terraform</li>
              <li>Automated configuration and deployments with Ansible</li>
              <li>Implemented Splunk dashboards and alerts for live observability</li>
              <li>Tracked work and sprints in JIRA under Agile / Scrum</li>
            </ul>
          </div>

          <div className="resume-section">
            <h3>SKILLS SUMMARY</h3>
            <ul className="resume-list">
              <li><strong style={{ color: 'var(--cyan)' }}>DevOps & Cloud:</strong> Docker, Kubernetes, Jenkins, Azure DevOps, Ansible, Terraform, Splunk, Git, Maven, JIRA</li>
              <li><strong style={{ color: 'var(--cyan)' }}>Languages:</strong> Java, Python, JavaScript, C, SQL, HTML, CSS</li>
              <li><strong style={{ color: 'var(--cyan)' }}>AI / Data:</strong> OpenCV, Pandas, Pillow, AI fundamentals</li>
              <li><strong style={{ color: 'var(--cyan)' }}>Concepts:</strong> DSA, DBMS, Computer Networks, Linux, CI/CD, Agile</li>
            </ul>
          </div>

          <div className="resume-section">
            <h3>PROJECTS</h3>
            <ul className="resume-list">
              <li><strong>SmartPix:</strong> AI image enhancement system (Python, OpenCV, PIL, Pandas)</li>
              <li><strong>DrumKit:</strong> Browser-based drum kit (HTML, CSS, JS)</li>
              <li><strong>ATM Simulation:</strong> PIN auth + transactions in core Java</li>
            </ul>
          </div>

          <div className="resume-section">
            <h3>CERTIFICATIONS</h3>
            <ul className="resume-list">
              <li>AZ-104 — Microsoft Azure Administrator (Microsoft)</li>
              <li>Generative AI — Beginner (Udemy)</li>
              <li>SQL (Basic) (HackerRank)</li>
              <li>Backend Development Bootcamp (SDC, SNIST)</li>
            </ul>
          </div>

          <div className="resume-section">
            <h3>EXTRA-CURRICULAR</h3>
            <ul className="resume-list">
              <li>NSS Volunteer · Social Services (Sep 2024 – present)</li>
              <li>Sports — Running, Throwball, Kho-Kho</li>
              <li>Languages — Telugu, English</li>
            </ul>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}

/* =========================================================================
   CONTACT
   ========================================================================= */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, sent: false });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    setStatus({ loading: true, sent: false });
    setTimeout(() => {
      setStatus({ loading: false, sent: true });
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1400);
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <section className="section">
        <motion.div className="section-tag" {...sectionReveal}>// 10 · LET'S TALK</motion.div>
        <motion.h2 className="section-title" {...sectionReveal}>Contact</motion.h2>
        <motion.p className="section-sub" {...sectionReveal}>
          Got a role, an idea, or just want to swap notes on cloud and CI/CD? My inbox is open.
        </motion.p>

        <div className="contact-split">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="contact-info-card">
              <div className="contact-info-row">
                <div className="ico">✉️</div>
                <div>
                  <div className="lbl">EMAIL</div>
                  <div className="val">puppaladeekshitha2@gmail.com</div>
                </div>
              </div>
              <div className="contact-info-row">
                <div className="ico">📱</div>
                <div>
                  <div className="lbl">PHONE</div>
                  <div className="val">+91 99080 10098</div>
                </div>
              </div>
              <div className="contact-info-row">
                <div className="ico">📍</div>
                <div>
                  <div className="lbl">LOCATION</div>
                  <div className="val">Hyderabad, Telangana, India</div>
                </div>
              </div>
              <div className="contact-info-row">
                <div className="ico">💼</div>
                <div>
                  <div className="lbl">CURRENTLY</div>
                  <div className="val">Programmer Analyst Trainee · Cognizant, Chennai</div>
                </div>
              </div>
            </div>

            <div className="map-card">
              <div className="pin">📍</div>
              <div className="place">HYDERABAD · TELANGANA</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: 6, position: 'relative', zIndex: 1 }}>
                17.3850° N, 78.4867° E
              </div>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="field">
              <label htmlFor="c-name">NAME</label>
              <input id="c-name" name="name" value={form.name} onChange={onChange} required placeholder="Your full name" />
            </div>
            <div className="field">
              <label htmlFor="c-email">EMAIL</label>
              <input id="c-email" name="email" type="email" value={form.email} onChange={onChange} required placeholder="you@example.com" />
            </div>
            <div className="field">
              <label htmlFor="c-subject">SUBJECT</label>
              <input id="c-subject" name="subject" value={form.subject} onChange={onChange} required placeholder="What's this about?" />
            </div>
            <div className="field">
              <label htmlFor="c-message">MESSAGE</label>
              <textarea id="c-message" name="message" value={form.message} onChange={onChange} required placeholder="Tell me a bit more..." />
            </div>

            <motion.button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              whileTap={{ scale: 0.98 }}
              disabled={status.loading}
            >
              {status.loading ? (
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  SENDING<span className="cursor">_</span>
                </motion.span>
              ) : (
                'SEND MESSAGE →'
              )}
            </motion.button>

            <AnimatePresence>
              {status.sent && (
                <motion.div
                  className="form-msg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  ✓ Message queued. I'll get back to you shortly.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </section>
    </motion.div>
  );
}

/* =========================================================================
   FOOTER
   ========================================================================= */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          Designed & Built by <strong>Puppala Deekshitha</strong> · © {new Date().getFullYear()}
        </div>
        <div className="footer-icons">
          <a className="footer-icon" href="https://linkedin.com/in/deekshithapuppala" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">💼</a>
          <a className="footer-icon" href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">🐙</a>
          <a className="footer-icon" href="https://www.hackerrank.com/" target="_blank" rel="noopener noreferrer" aria-label="HackerRank">🧠</a>
          <a className="footer-icon" href="https://www.codechef.com/" target="_blank" rel="noopener noreferrer" aria-label="CodeChef">👨‍🍳</a>
          <a className="footer-icon" href="mailto:puppaladeekshitha2@gmail.com" aria-label="Email">✉️</a>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================================
   APP ROOT
   ========================================================================= */
export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [location.pathname]);

  return (
    <div className="app">
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/hackathons" element={<Hackathons />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/social" element={<Social />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
