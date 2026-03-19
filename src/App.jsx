import { useMemo, useState } from "react";
import {
  aiFlows,
  careHighlights,
  doctors,
  instituteDetails,
  panelModules,
  specialties,
} from "./data/doctors";

const stats = [
  { value: "25+", label: "Seeded doctors from NCJIMS public pages" },
  { value: "12+", label: "Clinical specialties discoverable in one flow" },
  { value: "2", label: "Operational panels for admin and doctors" },
];

const quickActions = [
  "Find the right specialist",
  "Check OPD days fast",
  "Book follow-up without re-entry",
];

function Icon({ path }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={path} fill="currentColor" />
    </svg>
  );
}

function App() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0].id);
  const [activePanel, setActivePanel] = useState("admin");

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSpecialty =
        selectedSpecialty === "All" || doctor.specialty === selectedSpecialty;
      const keyword = query.trim().toLowerCase();
      const haystack = [
        doctor.name,
        doctor.specialty,
        doctor.department,
        doctor.opdDays,
        doctor.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return matchesSpecialty && haystack.includes(keyword);
    });
  }, [query, selectedSpecialty]);

  const selectedDoctor =
    filteredDoctors.find((doctor) => doctor.id === selectedDoctorId) ??
    filteredDoctors[0] ??
    doctors[0];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">
            <span />
            <span />
          </div>
          <div>
            <p>{instituteDetails.brand}</p>
            <small>Inspired by NCJIMS care workflows</small>
          </div>
        </div>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#doctors">Doctors</a>
          <a href="#panels">Panels</a>
          <a href="#ai">AI Layer</a>
        </nav>

        <a className="primary-button nav-cta" href="#doctors">
          Explore doctors
        </a>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="hero-copy">
            <div className="eyebrow">Appointment booking platform for real hospital operations</div>
            <h1>
              Book smarter care journeys for <span>Hisar patients</span> with
              AI-assisted doctor discovery.
            </h1>
            <p className="hero-text">
              A modern MERN-ready frontend concept for O.P. Jindal-linked OPD
              discovery: dynamic doctor cards, real OPD day guidance, institute
              address clarity, and dedicated admin and doctor workflows.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#doctors">
                Book appointment
              </a>
              <a className="secondary-button" href="#panels">
                View panels
              </a>
            </div>

            <div className="quick-strip">
              {quickActions.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="hero-card">
            <div className="floating-badge">Live OPD discovery</div>
            <div className="hero-grid">
              {stats.map((stat) => (
                <article key={stat.label} className="stat-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>

            <div className="priority-card">
              <div>
                <p>Care concierge</p>
                <h3>Find the right doctor before the slot hunt begins</h3>
              </div>
              <div className="priority-list">
                <span>Symptoms</span>
                <span>Specialty match</span>
                <span>OPD day fit</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="section-heading">
            <span className="eyebrow">About the platform</span>
            <h2>Designed like a healthcare product, not a demo landing page</h2>
          </div>

          <div className="about-layout">
            <div className="about-story">
              <p>
                This concept focuses on real-world friction: patients often do
                not know which department to choose, OPD days vary by doctor,
                and hospitals need booking tools that work for both front-desk
                teams and clinicians.
              </p>
              <p>
                The UI below is structured so we can later connect it to a MERN
                backend with MongoDB doctor records, secure auth, booking APIs,
                admin analytics, doctor dashboards, and AI-assisted triage.
              </p>
            </div>

            <div className="about-sidecard">
              <h3>Institute contact anchor</h3>
              <ul>
                <li>{instituteDetails.name}</li>
                <li>{instituteDetails.location}</li>
                <li>Phone: {instituteDetails.phone}</li>
                <li>Reserve: {instituteDetails.reserveNumbers.join(" / ")}</li>
              </ul>
            </div>
          </div>

          <div className="highlight-grid">
            {careHighlights.map((item) => (
              <article key={item.title} className="highlight-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section doctors-section" id="doctors">
          <div className="section-heading split">
            <div>
              <span className="eyebrow">Doctors directory</span>
              <h2>Browse by specialty, OPD pattern, and real institute context</h2>
            </div>
            <p>
              Seeded with public NCJIMS department data so we can start from a
              realistic base instead of placeholder doctors.
            </p>
          </div>

          <div className="search-panel">
            <div className="search-box">
              <Icon path="M10 18a8 8 0 1 1 5.293-14.004A8 8 0 0 1 10 18Zm0-14a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm11.707 16.293-4.825-4.825-1.414 1.414 4.825 4.825 1.414-1.414Z" />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search doctor, specialty, OPD day, or need"
              />
            </div>

            <div className="chip-row">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  className={specialty === selectedSpecialty ? "chip active" : "chip"}
                  onClick={() => setSelectedSpecialty(specialty)}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>

          <div className="doctors-layout">
            <div className="doctor-grid">
              {filteredDoctors.map((doctor) => (
                <article
                  key={doctor.id}
                  className={
                    doctor.id === selectedDoctor.id ? "doctor-card active" : "doctor-card"
                  }
                  onClick={() => setSelectedDoctorId(doctor.id)}
                >
                  <div className="doctor-image-wrap">
                    <img src={doctor.image} alt={doctor.name} />
                  </div>
                  <div className="doctor-body">
                    <span className="availability-dot">OPD active</span>
                    <h3>{doctor.name}</h3>
                    <p>{doctor.specialty}</p>
                    <small>{doctor.opdDays}</small>
                  </div>
                </article>
              ))}
            </div>

            <aside className="doctor-detail">
              <div className="doctor-detail-top">
                <img src={selectedDoctor.image} alt={selectedDoctor.name} />
                <div>
                  <span className="detail-label">Selected doctor</span>
                  <h3>{selectedDoctor.name}</h3>
                  <p>
                    {selectedDoctor.qualification} • {selectedDoctor.department}
                  </p>
                </div>
              </div>

              <div className="detail-grid">
                <div>
                  <span>OPD days</span>
                  <strong>{selectedDoctor.opdDays}</strong>
                </div>
                <div>
                  <span>Best for</span>
                  <strong>{selectedDoctor.experience}</strong>
                </div>
              </div>

              <div className="tag-list">
                {selectedDoctor.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="detail-actions">
                <button className="primary-button">Request slot</button>
                <button className="secondary-button">Ask AI which doctor fits</button>
              </div>
            </aside>
          </div>
        </section>

        <section className="section panels-section" id="panels">
          <div className="section-heading">
            <span className="eyebrow">Operations</span>
            <h2>Two focused panels for the people who actually run the hospital flow</h2>
          </div>

          <div className="panel-switcher">
            <button
              className={activePanel === "admin" ? "panel-tab active" : "panel-tab"}
              onClick={() => setActivePanel("admin")}
            >
              Admin panel
            </button>
            <button
              className={activePanel === "doctor" ? "panel-tab active" : "panel-tab"}
              onClick={() => setActivePanel("doctor")}
            >
              Doctor panel
            </button>
          </div>

          <div className="panel-preview">
            <div className="panel-overview">
              <h3>{activePanel === "admin" ? "Admin command center" : "Doctor workflow console"}</h3>
              <p>
                {activePanel === "admin"
                  ? "Built for reception teams, hospital admins, and operations managers who need visibility across doctors, day-wise OPD demand, and slot utilization."
                  : "Built for clinicians who need today’s schedule, patient context, faster consult prep, and follow-up execution without admin clutter."}
              </p>

              <ul className="feature-list">
                {panelModules[activePanel].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="panel-mockup">
              <div className="mockup-header">
                <span />
                <span />
                <span />
              </div>
              <div className="mockup-content">
                <div className="mock-metric">
                  <strong>{activePanel === "admin" ? "184" : "12"}</strong>
                  <span>{activePanel === "admin" ? "Appointments today" : "Patients queued"}</span>
                </div>
                <div className="mock-metric">
                  <strong>{activePanel === "admin" ? "23" : "4"}</strong>
                  <span>{activePanel === "admin" ? "Doctors available" : "High-priority follow-ups"}</span>
                </div>
                <div className="mock-table">
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section ai-section" id="ai">
          <div className="section-heading split">
            <div>
              <span className="eyebrow">AI integration</span>
              <h2>Use AI where it reduces confusion and operational delay</h2>
            </div>
            <p>
              The goal is not just chatbot decoration. The AI layer should
              improve routing, booking decisions, and follow-up consistency.
            </p>
          </div>

          <div className="ai-grid">
            {aiFlows.map((flow) => (
              <article key={flow.title} className="ai-card">
                <h3>{flow.title}</h3>
                <p>{flow.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section contact-section">
          <div className="contact-card">
            <div>
              <span className="eyebrow">Institute reference</span>
              <h2>Grounded in the O.P. Jindal / NCJIMS care ecosystem in Hisar</h2>
              <p>
                This frontend uses public institute information as a starting
                dataset. Before production launch, doctor timings and roster
                rules should be synced from an internal admin source of truth.
              </p>
            </div>

            <div className="contact-details">
              <div>
                <span>Address</span>
                <strong>{instituteDetails.location}</strong>
              </div>
              <div>
                <span>Main contact</span>
                <strong>{instituteDetails.phone}</strong>
              </div>
              <div>
                <span>WhatsApp-ready number</span>
                <strong>{instituteDetails.whatsapp}</strong>
              </div>
            </div>
          </div>

          <div className="map-frame">
            <iframe
              title="Jindal Institute of Medical Sciences map"
              src={instituteDetails.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>{instituteDetails.sourceNote}</p>
        <p>
          Next backend step: connect this UI to MongoDB doctor records, patient
          auth, appointment slots, notifications, and AI service endpoints.
        </p>
      </footer>
    </div>
  );
}

export default App;
