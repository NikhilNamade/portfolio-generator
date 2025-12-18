import React, { useContext, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import demo from "./demo.jpg";
import Datacontext from "../context/data/Datacontext";
import { useParams } from "react-router-dom";
import "./portfolio3.css";
const Portfolio3 = () => {
  const form = useRef();
  const { fetchdata, userdata } = useContext(Datacontext);
  const { userId } = useParams();
  useEffect(() => {
    if (userId) {
      fetchdata(userId);
    }
  }, [userId]);

  if (!userdata?.user) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>
    );
  }

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_YOUR_SERVICE_ID,
        process.env.REACT_APP_YOUR_TEMPLATE_ID,
        form.current,
        {
          publicKey: process.env.REACT_APP_YOUR_USER_ID,
        }
      )
      .then(
        () => {
          alert("Email Send SUCCESSFULLY");
        },
        (error) => {
          alert("FAILED to send eamil");
        }
      );
  };
  return (
    <div className="portfolio3-container">
      <main className="split-layout">
        <section className="left-section">
          <div className="branding">
            <img src={userdata.user.image || demo} alt="Profile" />
            <h4>{userdata.user.name || "Your Name"}</h4>
            <p>{userdata.user.Domain || "Creative Developer"}</p>
          </div>

          <nav className="nav-link">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="social-links">
            <a
              href={userdata.user.GithubURL || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href={userdata.user.LinkedinURL || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href={userdata.user.resume || demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </div>
        </section>

        <section className="right-section">
          <div id="about" className="section-content">
            <h2>About Me</h2>
            <p>
              Hello!{" "}
              {userdata.user.aboutyou ||
                "I am a passionate software engineer specializing in web development."}{" "}
              and I have completed my {userdata.user.education || "B.E"} degree
              from {userdata.user.university || "Mumbai University"} and I have
              work experience of {userdata.user.experience || "1"}{" "}
              {userdata.user.experience > 1 ? "Years" : "Year"}.
            </p>
          </div>

          <div id="skills" className="section-content">
            <h2 style={{ textAlign: "center" }}>Skills</h2>
            <div className="skills-grid">
              {userdata.user.Skills?.length > 0 ? (
                userdata.user.Skills.map((skill, index) => (
                  <div key={index} className="skill-card">
                    <h5>{skill.toUpperCase()}</h5>
                  </div>
                ))
              ) : (
                <div className="skill-card">
                  <h3>Skills Required</h3>
                </div>
              )}
            </div>
          </div>

          <div id="work" className="section-content">
            <h2>Work</h2>
            <div className="projects">
              {userdata.user.project?.length > 0 ? (
                userdata.user.project.map((proj, index) => (
                  <div key={index} className="project-card">
                    <h3>{proj.title}</h3>
                    <p>{proj.description}</p>
                    <a
                      href={proj.Projectlink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                    >
                      View
                    </a>
                  </div>
                ))
              ) : (
                <div className="project-card">
                  <h3>Project A</h3>
                  <p>An innovative solution to an exciting problem.</p>
                </div>
              )}
            </div>
          </div>

          <div id="contact" className="section-content">
            <h2>Contact</h2>
            <p>Have a question or want to collaborate? Let's connect!</p>

            <form className="contact-form" ref={form} onSubmit={sendEmail}>
              <input
                type="hidden"
                name="to_email"
                value={userdata.user.email || ""}
              />
              <input
                type="hidden"
                name="to_name"
                value={userdata.user.name || ""}
              />

              <input
                type="text"
                placeholder="Your Name"
                name="from_name"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                name="from_email"
                required
              />
              <textarea placeholder="Your Message" name="message" required />
              <button type="submit" className="btn">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Portfolio3;
