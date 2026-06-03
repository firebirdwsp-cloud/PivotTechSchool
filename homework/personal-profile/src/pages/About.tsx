import aboutPhoto1 from "../assets/AboutPhoto/AboutPhoto1.jpg";
import aboutPhoto2 from "../assets/AboutPhoto/AboutPhoto2.png";
import aboutPhoto3 from "../assets/AboutPhoto/AboutPhoto3.png";

type AboutItem = {
  title: string;
  description: string;
};

type AboutPhoto = {
  src: string;
  alt: string;
};

type SocialLink = {
  name: string;
  url: string;
};

const aboutItems: AboutItem[] = [
  {
    title: "Skills",
    description:
      "HTML, CSS, JavaScript, TypeScript, React, design, painting, and creative problem-solving.",
  },
  {
    title: "Goals",
    description:
      "Grow Light in Progress Studios, keep improving as a developer, and build meaningful creative projects.",
  },
  {
    title: "Interests",
    description:
      "Art, coding, Nashville, personal growth, music, sports, and building a creative life.",
  },
];

const aboutPhotos: AboutPhoto[] = [
  {
    src: aboutPhoto1,
    alt: "Light in Progress Studios artwork",
  },
  {
    src: aboutPhoto2,
    alt: "Creative work by Jon Adam Gilliam",
  },
  {
    src: aboutPhoto3,
    alt: "Colorful artwork from Light in Progress Studios",
  },
];

const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/lipstudioart/",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/lipstudio",
  },
  {
    name: "Portfolio",
    url: "https://www.lightinprogress.com/",
  },
];

function About() {
  return (
    <section className="about-page">
      <div className="about-card">
        <h1>About Me</h1>

        <p>
          Hi, I’m Jon Adam Gilliam. I’m an artist and software development
          student with a passion for creativity, growth, and building things
          that feel personal.
        </p>

        <p>
          Through Light in Progress Studios, I create vibrant acrylic paintings
          that are bold, colorful, and meaningful. My work is inspired by
          transformation and the idea that even in dark places, light can still
          be in progress.
        </p>

        <p>
          I’m also learning web development and using code as another creative
          tool. This site is a mini version of my personal brand, combining art,
          design, and technology.
        </p>
      </div>

      <section className="about-photo-section">
        <h2>A Glimpse Into My Work</h2>

        <div className="about-photo-grid">
          {aboutPhotos.map((photo) => (
            <img
              key={photo.alt}
              src={photo.src}
              alt={photo.alt}
              className="about-photo"
            />
          ))}
        </div>
      </section>

      <div className="about-grid">
        {aboutItems.map((item) => (
          <div className="about-box" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      <section className="social-section">
        <h2>Connect With Me</h2>

        <p>
          Follow my work, check out my projects, or connect with Light in
          Progress Studios online.
        </p>

        <div className="social-links">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              {link.name}
            </a>
          ))}
        </div>
      </section>
    </section>
  );
}

export default About;