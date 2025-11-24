import AnimatedElement from "@/components/animations/animated-element";
import { Text } from "@/components/globals/text";

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: "Full-stack Developer",
    company: "Agio™",
    location: "Hybrid - Caratinga, MG",
    period: "January 2025 - September 2025",
    description: [
      "Led end-to-end development of 2 projects, autonomously managing their 3 repositories while actively contributing to new features for 5 other team projects.",
      "Implemented high-performance interfaces for web, PWA, and native applications, achieving 99% fidelity to Figma prototypes and improving user experience.",
      "Worked across all stages of the product lifecycle, applying agile methodologies (Scrum and Kanban) to ensure deliveries aligned with client expectations."
    ],
    technologies: ["React", "Next.js", "React Native", "Expo", "TailwindCSS", "Shadcn UI", "Zustand", "Zod", "React Query", "PostgreSQL", "Git", "CI/CD"]
  },
  {
    role: "Software Developer (Freelance)",
    company: "Self-employed",
    location: "Remote",
    period: "March 2023 - Present",
    description: [
      "Developed and delivered over 100 projects as a freelancer for a diverse base of international clients, acting as a technology partner for creating dApps, landing pages, and interactive web applications.",
      "Specialized in delivering complete solutions for NFT collection launches, including minting dApps (with direct smart contract interaction), engagement tools like PFP generators, and project landing pages.",
      "Differentiated projects through rich and memorable user interfaces, using animation libraries like Framer Motion and GSAP to build high-performance and visually impactful experiences."
    ],
    technologies: ["React", "Next.js", "Vite", "Tailwind CSS", "Framer Motion", "GSAP", "Web3", "MetaMask", "Coinbase", "Git"]
  },
  {
    role: "Systems Development Analyst",
    company: "Versatec Tecnologia para Gestão Pública LTDA",
    location: "Caratinga, MG",
    period: "2022 - March 2023",
    description: [
      "Managed end-to-end development of over 10 institutional WordPress websites, collaborating directly with clients to translate their requirements into a functional and professional online presence.",
      "Implemented custom functionalities and third-party system integrations via plugins and PHP code, optimizing business processes and improving end-user experience.",
      "Implemented a Virtual Learning Environment (VLE) for the internal health team, centralizing courses and training materials about the 'Versa Saúde' app to optimize employee training and onboarding.",
      "Responsible for continuous maintenance and security of the website base, applying updates and best practices to protect systems against vulnerabilities."
    ],
    technologies: ["WordPress", "PHP", "JavaScript", "jQuery", "CSS", "HTML", "MySQL"]
  }
];

const Experience = () => {
  return (
    <section className="max-w-5xl mx-auto px-4">
      <AnimatedElement>
        <Text size="huge-2" weight="bold" className="mb-12">
          Experience
        </Text>
      </AnimatedElement>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <AnimatedElement key={index} delay={0.1 * (index + 1)}>
            <div className="group relative p-6 border border-border hover:border-primary/50 transition-colors">
              {/* Cantos decorativos */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                <div>
                  <Text size="xl" weight="bold" className="mb-1">
                    {exp.role}
                  </Text>
                  <Text size="lg" className="text-muted-foreground">
                    {exp.company}
                  </Text>
                  <Text size="sm" className="text-muted-foreground">
                    {exp.location}
                  </Text>
                </div>
                <Text size="md" className="text-muted-foreground md:text-right whitespace-nowrap">
                  {exp.period}
                </Text>
              </div>

              <ul className="space-y-2 mb-4 list-none">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary mt-1.5">●</span>
                    <Text size="md" className="text-muted-foreground flex-1">
                      {item}
                    </Text>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm border border-primary/30 text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </section>
  );
};

export default Experience;
