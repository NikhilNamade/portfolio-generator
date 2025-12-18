import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Datacontext from "../context/data/Datacontext";
import demo from "./demo.jpg";
import "./portfolio1.css";
import { useState } from "react";
const Portfolio1 = () => {
  const { fetchdata, userdata } = useContext(Datacontext);
  const { userId } = useParams();
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchdata(userId);
    }
  }, [userId]);

  if (!userdata.user) {
    return <div>Loading profile...</div>;
  }
  const resumeUrl = userdata?.user?.resume?.replace(
    "/upload/",
    "/upload/fl_attachment:false/"
  );
  return (
    <>
      {userId ? (
        <div className="portfolio1-container">
          <header>
            <img src={userdata?.user?.image || demo} alt="Profile" />
            <h1>{userdata?.user?.name || "Your Name"}</h1>
            <p>
              {userdata?.user?.Domain
                ? `${userdata.user.Domain} | ${userdata.user.university} | ${
                    userdata.user.education
                  } | Experience of ${userdata.user.experience} ${
                    userdata.user.experience > 1 ? "Years" : "Year"
                  }`
                : "Frontend Developer | Problem Solver"}
            </p>
          </header>
          <nav>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
          <section id="skills">
            <h2>Skills</h2>
            <ul>
              {userdata?.user?.Skills
                ? userdata.user.Skills.map((skill, index) => (
                    <li key={index}>{skill.toUpperCase()}</li>
                  ))
                : "Skills Required"}
            </ul>
          </section>
          <section id="projects">
            <h2>Projects</h2>
            <ul>
              {userdata?.user?.project ? (
                userdata.user.project.map((proj, index) => (
                  <li key={index}>
                    <p>
                      <a href={proj.Projectlink}>{proj.title}</a> -{" "}
                      {proj.description}
                    </p>
                  </li>
                ))
              ) : (
                <p>No projects found</p>
              )}
            </ul>
          </section>
          <section id="contact">
            <h2>Contact</h2>
            <p style={{ color: "#0D6EFD" }}>Email : {userdata.user.email}</p>
            <p>
              <a
                href={
                  userdata?.user?.LinkedinURL ||
                  "https://linkedin.com/in/yourusername"
                }
              >
                LinkedIn
              </a>
            </p>
            <p>
              <a
                href={
                  userdata?.user?.GithubURL || "https://github.com/yourusername"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </p>
            <p>
              <a onClick={()=>setShowResume(true)}>
                Resume
              </a>
            </p>
          </section>
        </div>
      ) : (
        <div>Data not found</div>
      )}
      {showResume && (
        <div className="resume-overlay">
          <div className="resume-modal">
            <button className="close-btn" onClick={() => setShowResume(false)}>
              ✕
            </button>

            <iframe
              src={resumeUrl}
              title="Resume"
              width="100%"
              height="100%"
              frameBorder="0"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio1;
