import AnimatedElement from "@/components/animations/animated-element";
import { Text } from "@/components/globals/text";
import { MarkdownFile } from "@/lib/markdown";
import Image from "next/image";
import Link from "next/link";

interface ProjectsProps {
  projects: MarkdownFile[]
}

const Projects = ({ projects }: ProjectsProps) => {
    return (
        <section className="max-w-5xl mx-auto px-4 relative">
            {/* Título */}
            <AnimatedElement className="flex flex-col items-center gap-4 mb-12">
                <Text size="huge-2" weight="bold">
                    Featured Projects
                </Text>
                <Text size="lg" className="text-muted-foreground text-center max-w-2xl">
                    A selection of projects showcasing frontend architecture, performance optimization, and modern development practices.
                </Text>
            </AnimatedElement>

            {/* Grid de projetos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.filter(p => p.data.featured).map((project, index) => (
                    <AnimatedElement key={project.slug} delay={0.2 + index * 0.1}>
                        <Link href={project.data.link || "#"} target="_blank" className="block h-full">
                            <div className="group relative border border-border/50 overflow-hidden hover:border-primary transition-all h-full flex flex-col">
                                {/* Cantos decorativos */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                                
                                {/* Imagem */}
                                <div className="relative h-48 w-full overflow-hidden bg-muted flex-shrink-0">
                                    <Image
                                        src={project.data.image}
                                        alt={project.data.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                                </div>

                                {/* Conteúdo */}
                                <div className="p-6 bg-background relative flex flex-col flex-grow">
                                    <div className="absolute top-0 left-0 w-full h-px bg-primary"></div>
                                    <Text size="xl" weight="bold" className="mb-2">
                                        {project.data.title}
                                    </Text>
                                    <Text size="md" className="text-muted-foreground mb-4 flex-grow">
                                        {project.data.description}
                                    </Text>
                                    
                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.data.tags?.map((tag: string, i: number) => (
                                            <span
                                                key={i}
                                                className="text-xs px-2 py-1 border border-primary/30 text-primary"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </AnimatedElement>
                ))}
            </div>
        </section>
    );
};

export default Projects;
