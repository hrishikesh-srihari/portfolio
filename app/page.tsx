"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/navbar";
import ProjectCard, {
  ProjectCardProps,
} from "./components/project_card/project_card";
import {
  Github,
  ExternalLink,
  Mail,
  Linkedin,
  ChevronDown,
  Menu,
  Globe,
  X,
} from "lucide-react";

const GrainOverlay = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-50 pointer-events-none opacity-[0.15]">
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 2056 2056' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "contrast(120%) brightness(95%)",
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
};

type BlobPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

const GradientBlob = ({
  position = "top-right",
}: {
  position?: BlobPosition;
}) => {
  const positionClasses: Record<BlobPosition, string> = {
    "top-right": "top-0 right-0 translate-x-1/4 -translate-y-1/4",
    "top-left": "top-0 left-0 -translate-x-1/4 -translate-y-1/4",
    "bottom-right": "bottom-0 right-0 translate-x-1/4 translate-y-1/4",
    "bottom-left": "bottom-0 left-0 -translate-x-1/4 translate-y-1/4",
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} w-[500px] h-[500px] rounded-full opacity-30 blur-3xl pointer-events-none`}
      style={{
        background:
          "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0) 70%)",
      }}
    />
  );
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((position / height) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const experiences: Array<ProjectCardProps> = [
    {
      id: "01",
      title: "Opennote",
      subtitle: "CO-FOUNDER",
      period: "Feb. 2025 - Present",
      description:
        "The interactive AI tutor that knows you. Backed by YC and Afore Capital.",
      tags: ["Python", "React", "TypeScript", "ML/AI"],
      imageSrc: "/opennote.png",
      links: {
        live: "https://opennote.com",
      },
      metrics: {
        "users": "55,000+",
        "vc backing": "1.35M+",
      },
    },
    {
      id: "02",
      title: "Browserbase",
      subtitle: "SOFTWARE ENGINEER",
      period: "Mar. 2025 - May 2025",
      description:
        "Worked on Director :)",
      tags: ["Browser Agents"],
      imageSrc: "/browserbase.png",
      links: {
        // github: "#",
        live: "https://director.ai",
      },
      metrics: {
        // reliability: "+50%",
        // latency: "-27%",
        // "cognitive load": "-40%",
      },
    },
    {
      id: "03",
      title: "NASA SUITS",
      subtitle: "SOFTWARE ENGINEERING RESEARCH INTERN",
      period: "Sept. 2023 - May 2024",
      description:
        "Led Mission Control Console development. Worked with Artemis astronauts.",
      tags: ["Python", "Real-time Systems", "3D Mapping Algorithms"],
      imageSrc: "/nasa_suits.png",
      links: {
        github: "#",
      },
      metrics: {
        reliability: "+50%",
        latency: "-27%",
        "cognitive load": "-40%",
      },
    },
    {
      id: "04",
      title: "UC Irvine, Donald Bren School of ICS",
      subtitle: "TEACHING ASSISTANT",
      period: "Mar. 2024 - Present",
      description:
        "Undergraduate teaching assistant for discrete math and boolean logic.",
      tags: [
        "Boolean Logic",
        "Discrete Math",
        "Teaching",
        "Curriculum Development",
      ],
      imageSrc: "/uci.jpg",
      links: {
        company: "#",
      },
      metrics: {
        students: "400+",
        "increased office hour attendance": "40%",
      },
    },
  ];

  const projects: Array<ProjectCardProps> = [
    {
    id: "01",
    title: "Runway",
    subtitle: "VERCEL FOR AI MODELS",
    description:
        "Generate full LoRA datasets, train any model on H100 GPUs, and deploy—to our sandbox, an OpenAI API SDK endpoint to request, or download the weights to deploy yourself. All using natural language.",
    tags: ["Perplexity", "Websocket", "Browserbase/Stagehand", "ML/AI", "Next.js"],
    imageSrc: "/runway.png",
    links: {
        github: "https://github.com/abhi-arya1/runway",
        live: "https://runway0.vercel.app/",
    },
    metrics: {
        "audience reached": "10,000+",
    },
      },
    {
      id: "02",
      title: "Sift",
      subtitle: "SUPERCHARGED SEMANTIC SEARCH",
      description:
        "Simultaneously search files in your filesystem, GitHub, Notion, Slack, Discord, and the Google Suite, simply with natural language. ",
      tags: [
        "Tauri",
        "React",
        "Rust",
        "Multimodal Vector Embeddings",
        "Python",
      ],
      imageSrc: "/sift.png",
      links: {
        github: "https://github.com/abhi-arya1/sift",
      },
      metrics: {
        "supported document base": "200,000+",
        "search speed": "< 1s",
      },
    },
    {
      id: "03",
      title: "Coauthor",
      subtitle: "SFHACKS '24 WINNER",
      description:
        "RAG-based research collaboration platform with academic source searching, using cloud-based data management.",
      tags: ["TypeScript", "WebSocket", "Mistral AI", "GCP", "Selenium"],
      imageSrc: "/coauthor.png",
      links: {
        github: "https://github.com/abhi-arya1/coauthor",
        live: "https://coauthor.vercel.app/",
      },
      metrics: {
        "supported workspaces": "500+",
        "research project efficiency improvement": "60%",
      },
    },
    {
      id: "04",
      title: "ZotConnect",
      subtitle: "IRVINEHACKS '24 WINNER",
      description:
        "Academic networking platform with AI-powered resume optimization and job matching using Google Cloud Vertex API.",
      tags: ["Next.js", "React", "Google Cloud", "ML/AI", "TypeScript"],
      imageSrc: "/zotconnect.png",
      links: {
        github: "https://github.com/abhi-arya1/zotconnect",
        live: "https://zotconnect.vercel.app/",
      },
      metrics: {
        "supported concurrent users": "500+",
      },
    },
  ];

  const skills = [
    {
      category: "Frontend Development",
      items: [
        { name: "React/Next.js", level: "3-4 years" },
        { name: "TypeScript", level: "3 years" },
        { name: "Tailwind CSS", level: "3 years" },
        { name: "Tauri", level: "< 1 year" },
      ],
    },
    {
      category: "Backend Development",
      items: [
        { name: "Node.js", level: "4 years" },
        { name: "Python", level: "5 years" },
        { name: "PostgreSQL", level: "2 years" },
        { name: "SQL", level: "2 years" },
      ],
    },
    {
      category: "DevOps & Tools",
      items: [
        { name: "Docker", level: "1 year" },
        { name: "AWS", level: "1 year" },
        { name: "CI/CD", level: "4 years" },
        { name: "Git", level: "4+ years" },
      ],
    },
  ];

  return (
    <div className="relative min-h-screen bg-zinc-950 text-gray-100 overflow-hidden">
      <div
        className="fixed inset-0 z-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
          backgroundSize: "100% 100%",
        }}
      />

      <GrainOverlay />

      <Navbar />

      <div className="relative z-10 min-h-screen backdrop-contrast-110 backdrop-brightness-95">

        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(circle at 70% 30%, rgba(59,130,246,0.15) 0%, transparent 70%)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-7xl mx-auto px-4 py-32 z-20"
          >
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mono text-sm text-gray-500 mb-4 tracking-widest"
            >
              PUSHING THE BOUNDARIES OF DIGITAL EXPERIENCES
            </motion.div> */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-5xl md:text-7xl font-extralight mb-6 tracking-tight leading-tight"
            >
              Hey, I'm Rishi
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-gray-400 text-xl md:text-2xl max-w-2xl mb-8 font-light"
            >
              I like building cool stuff that people love to use
            </motion.p>
          </motion.div>
        </section>

        <section id="experience" className="relative min-h-screen py-32">
          <div className="max-w-7xl mx-auto px-4 z-20 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4 pb-4"
            >
              <div className="mono text-sm text-gray-500 mb-4 tracking-widest">
                PROFESSIONAL EXPERIENCE
              </div>
              <h2 className="text-4xl md:text-5xl font-extralight mb-16 tracking-tight">
                Where I've Worked
              </h2>
            </motion.div>

            <div className="space-y-32 md:ml-24">
              {experiences.map((experience) => (
                <ProjectCard key={experience.id} {...experience} />
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="relative min-h-screen py-32">
          <div className="max-w-7xl mx-auto px-4 z-20 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4 pb-4"
            >
              <div className="mono text-sm text-gray-500 mb-4 tracking-widest">
                PROJECTS
              </div>
              <h2 className="text-4xl md:text-5xl font-extralight mb-16 tracking-tight">
                What I've Built
              </h2>
            </motion.div>

            <div className="space-y-32 md:ml-24">
              {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="relative min-h-screen py-32">
          <GradientBlob position="bottom-right" />
          <div className="max-w-7xl mx-auto px-4 z-20 relative">
            <div className="mono text-sm text-gray-500 mb-4 tracking-widest">
              GET IN TOUCH
            </div>
            <h2 className="text-4xl md:text-5xl font-extralight mb-8 tracking-tight">
              Let's Connect
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mb-12">
              I'm always interested in hearing about new projects and
              opportunities. Whether you have a question or just want to say hi,
              I'll try my best to get back to you!
            </p>

            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="text-violet-400" size={24} />
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <a
                        href="mailto:rishi@opennote.me"
                        className="text-lg hover:text-slate-400 transition-colors"
                      >
                          rishi@opennote.me
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Globe className="text-violet-400" size={24} />
                    <div>
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="text-lg">San Francisco, CA</div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-6">
                  <a
                    href="https://github.com/hrishikesh-srihari"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <Github size={24} />
                  </a>
                  <a
                    href="https://linkedin.com/in/hrishikesh-srihari"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>

              <div className="bg-gray-900/30 backdrop-blur-md rounded-lg p-8 border border-gray-800/30">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm text-gray-400">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-gray-800/50 rounded-lg border border-gray-700/30 px-4 py-3 focus:outline-none focus:border-violet-400 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-gray-400">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-gray-800/50 rounded-lg border border-gray-700/30 px-4 py-3 focus:outline-none focus:border-violet-400 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm text-gray-400">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full bg-gray-800/50 rounded-lg border border-gray-700/30 px-4 py-3 focus:outline-none focus:border-violet-400 transition-colors"
                      placeholder="Your message"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-violet-400 hover:bg-violet-600 rounded-lg transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="relative min-h-screen py-32">
          <GradientBlob position="top-right" />
          <div className="max-w-7xl mx-auto px-4 z-20 relative">
            <div className="mono text-sm text-gray-500 mb-4 tracking-widest">
              A BIT ABOUT ME
            </div>
            <h2 className="text-4xl md:text-5xl font-extralight mb-16 tracking-tight">
              WHO I AM
            </h2>

            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-6">
                <p className="text-gray-400 text-lg">
                  I'm a full-stack developer with a drive for building
                  beautiful, functional, and scalable web applications. I love
                  to jump into projects and learn from those around me to refine
                  my skills as a student and developer.
                </p>
                <p className="text-gray-400 text-lg">
                  Apart from my work, I'm a huge runner and love to explore new
                  genres of music, so feel free to reach out and send me your
                  favorite songs or talk about running (check out my{" "}
                  <a
                    href="https://www.strava.com/athletes/rishi_srihari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center group text-violet-300 hover:text-white transition-colors relative px-1"
                  >
                    <span className="relative">
                      Strava
                      <span className="absolute -bottom-1 left-0 w-full h-px bg-violet-400 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
                    </span>
                  </a>{" "}
                  if you're curious)!
                </p>
                <div className="flex space-x-6 pt-4">
                  <a
                    href="#contact"
                    className="px-6 py-3 bg-violet-400 hover:bg-violet-600 rounded-lg transition-colors"
                  >
                    Get in Touch
                  </a>
                  {/* <a
                    href="/Rishi_Srihari_Resume.pdf"
                    className="px-6 py-3 border border-gray-700 hover:border-gray-600 rounded-lg transition-colors"
                  >
                    Download CV
                  </a> */}
                </div>
              </div>

              {/* <div className="space-y-12">
                {skills.map((skillGroup) => (
                  <div key={skillGroup.category} className="space-y-4">
                    <h3 className="text-xl font-light tracking-tight">
                      {skillGroup.category}
                    </h3>
                    <div className="space-y-4">
                      {skillGroup.items.map((skill) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">{skill.name}</span>
                            <span className="text-gray-500">{skill.level}</span>
                          </div>
                          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-violet-400 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </section>

        <footer className="border-t border-gray-800/20">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Rishi Srihari. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;
