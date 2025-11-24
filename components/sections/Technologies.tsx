import AnimatedElement from "@/components/animations/animated-element";
import { Text } from "@/components/globals/text";
import {
    SiGit,
    SiJest,
    SiNextdotjs,
    SiNodedotjs,
    SiReact,
    SiTailwindcss,
    SiTypescript,
    SiVite,
} from "react-icons/si";

const technologies = [
    { icon: SiReact, name: "React" },
    { icon: SiTypescript, name: "TypeScript" },
    { icon: SiNextdotjs, name: "Next.js" },
    { icon: SiVite, name: "Vite" },
    { icon: SiJest, name: "Jest" },
    { icon: SiTailwindcss, name: "Tailwind CSS" },
    { icon: SiNodedotjs, name: "Node.js" },
    { icon: SiGit, name: "Git" },
];

const Technologies = () => {
    return (
        <section className="max-w-5xl mx-auto px-4 relative">
            {/* Título */}
            <AnimatedElement className="flex flex-col items-center gap-4 mb-12">
                <Text size="huge-2" weight="bold">
                    Tech Stack
                </Text>
                <Text className="text-muted-foreground max-w-2xl text-center" size="lg">
                    Modern technologies for building fast, reliable, and scalable web applications.
                </Text>
            </AnimatedElement>

            {/* Grid de tecnologias */}
            <AnimatedElement delay={0.2}>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {technologies.map((tech, index) => (
                        <div
                            key={index}
                            className="group relative flex cursor-pointer flex-col items-center gap-4 border border-border/50 p-6 transition-all hover:border-primary hover:bg-primary/5"
                        >
                            {/* Cantos decorativos */}
                            <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <tech.icon className="text-primary text-5xl group-hover:scale-110 transition-transform" />
                            <Text size="md" weight="semibold" className="text-center">
                                {tech.name}
                            </Text>
                        </div>
                    ))}
                </div>
            </AnimatedElement>
        </section>
    );
};

export default Technologies;
