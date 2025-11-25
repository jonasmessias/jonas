import AnimatedElement from "@/components/animations/animated-element";
import { Text } from "@/components/globals/text";
import { MarkdownFile } from "@/lib/markdown";

interface ExperienceProps {
  experiences: MarkdownFile[]
}

const Experience = ({ experiences }: ExperienceProps) => {
  return (
    <section className="max-w-5xl mx-auto px-4">
      <AnimatedElement>
        <Text size="huge-2" weight="bold" className="mb-12">
          Experience
        </Text>
      </AnimatedElement>

      <div className="space-y-8">
        {experiences.map((exp, index) => {
          const description = exp.content.split('\n').filter(line => line.trim().startsWith('-')).map(line => line.trim().substring(1).trim());
          
          return (
          <AnimatedElement key={exp.slug} delay={0.1 * (index + 1)}>
            <div className="group relative p-6 border border-border hover:border-primary/50 transition-colors">
              {/* Cantos decorativos */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                <div>
                  <Text size="xl" weight="bold" className="mb-1">
                    {exp.data.role}
                  </Text>
                  <Text size="lg" className="text-muted-foreground">
                    {exp.data.company}
                  </Text>
                  <Text size="sm" className="text-muted-foreground">
                    {exp.data.location}
                  </Text>
                </div>
                <Text size="md" className="text-muted-foreground md:text-right whitespace-nowrap">
                  {exp.data.period}
                </Text>
              </div>

              <ul className="space-y-2 mb-4 list-none">
                {description.map((item: string, i: number) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary mt-1.5">●</span>
                    <Text size="md" className="text-muted-foreground flex-1">
                      {item}
                    </Text>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.data.technologies?.map((tech: string, i: number) => (
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
        )})}
      </div>
    </section>
  );
};

export default Experience;
