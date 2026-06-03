import { Link } from "react-router-dom";
import cartoonPhoto from "../assets/Cartoon.jpg";

type FunFact = {
  title: string;
  description: string;
};

const funFacts: FunFact[] = [
  {
    title: "Art",
    description:
      "I create colorful acrylic paintings through Light in Progress Studios.",
  },
  {
    title: "Coding",
    description:
      "I am learning software development and building projects with React and TypeScript.",
  },
  {
    title: "Nashville",
    description:
      "I am a local Nashvillian growing as both an artist and developer.",
  },
];

function Home() {
  return (
    <section className="home-page">
      <div className="hero">
        <div className="hero-content">
          <p className="eyebrow">Artist + Software Developer</p>

          <h1>Jon Adam Gilliam</h1>

          <p className="tagline">
            Turning creativity, color, and code into meaningful work through
            Light in Progress Studios.
          </p>

          <Link to="/about" className="main-button">
            Learn More About Me
          </Link>
        </div>

        <div className="hero-image-card">
          <img
            src={cartoonPhoto}
            alt="Cartoon portrait of Jon Adam Gilliam"
            className="hero-photo"
          />
        </div>
      </div>

      <section className="facts-section">
        <h2>Fun Facts & Interests</h2>

        <div className="fact-grid">
          {funFacts.map((fact) => (
            <div className="fact-card" key={fact.title}>
              <h3>{fact.title}</h3>
              <p>{fact.description}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default Home;