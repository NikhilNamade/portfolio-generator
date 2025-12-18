import React, { useEffect, useContext } from "react";
import emailjs from "@emailjs/browser";
import Datacontext from "../context/data/Datacontext";
import demo from "./demo.jpg";
import { useParams } from "react-router-dom";
import "./portfolio4.css";

const PortfolioNo4 = () => {
  const { fetchdata, userdata } = useContext(Datacontext);
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      fetchdata(userId);
    }
  }, [userId]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    });
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

    const handleMove = (e, el) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      el.style.background = `radial-gradient(circle at ${x * 100}% ${
        y * 100
      }%, #d5e8ff, #ffffff)`;
    };

    const home = document.getElementById("home");
    const contact = document.getElementById("contact");
    if (home) home.addEventListener("mousemove", (e) => handleMove(e, home));
    if (contact)
      contact.addEventListener("mousemove", (e) => handleMove(e, contact));

    return () => {
      if (home)
        home.removeEventListener("mousemove", (e) => handleMove(e, home));
      if (contact)
        contact.removeEventListener("mousemove", (e) => handleMove(e, contact));
    };
  }, []);

  if (!userdata?.user) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>
    );
  }

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_ap3xoxr",
        "template_vj3rpmy",
        e.target,
        "gTxw6jLYP9gq03_Y_"
      )
      .then(() => alert("Message sent successfully!"))
      .catch(() => alert("FAILED to send message."));
    e.target.reset();
  };

  return (
    <div className="portfolio-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="navbar-title">
            {userdata.user.name || "Nikhil's Portfolio"}
          </h1>
          <ul className="navbar-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="home-section fade-in">
        <img
          src={userdata.user.image || demo}
          alt="Profile"
          className="profile-img"
        />
        <h1>{userdata.user.name || "Your Name"}</h1>
        <p>
          {userdata.user.Domain
            ? `${userdata.user.Domain} | ${userdata.user.university} | ${
                userdata.user.education
              } | Experience of ${userdata.user.experience || 1} ${
                userdata.user.experience > 1 ? "Years" : "Year"
              }`
            : "Engineering Student | Full Stack Developer"}
        </p>
      </section>

      {/* About Section */}
      <section id="about" className="section fade-in">
        <div className="section-content">
          <h2 className="section-title">About Me</h2>
          <p>
            {userdata.user.aboutyou ||
              "I'm a passionate developer specializing in building modern web applications."}
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section fade-in">
        <div className="section-content">
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            {userdata.user.Skills?.length > 0 ? (
              userdata.user.Skills.map((skill, index) => (
                <div key={index} className="skill-card">
                  {skill.toUpperCase()}
                </div>
              ))
            ) : (
              <p>Skills Required</p>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section fade-in">
        <div className="section-content">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            {userdata.user.project?.length > 0 ? (
              userdata.user.project.map((proj, index) => (
                <div key={index} className="project-card">
                  <h3>{proj.title}</h3>
                  <p>{proj.description}</p>
                  <a
                    href={proj.Projectlink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View More →
                  </a>
                </div>
              ))
            ) : (
              <div className="project-card">
                <p>No projects available</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section fade-in">
        <div className="section-content">
          <h2 className="section-title">Contact Me</h2>

          <form
            className="contact-form"
            onSubmit={sendEmail}
            style={{ padding: "5vmin" }}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="contact-input"
              required
            />
            <input
              type="email"
              name="from_email"
              placeholder="Your Email"
              className="contact-input"
              required
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              className="contact-textarea"
              required
            />
            <button type="submit" className="contact-button">
              Send Message
            </button>
          </form>

          <div className="mt-6">
            <a href={userdata.user.LinkedinURL || "#"} target="_blank">
              LinkedIn
            </a>
            <a href={userdata.user.GithubURL || "#"} target="_blank">
              GitHub
            </a>
            <a
              href={userdata.user.resume || demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioNo4;
