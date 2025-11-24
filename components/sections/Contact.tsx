import AnimatedElement from "@/components/animations/animated-element"
import { Text } from "@/components/globals/text"
import { config } from "@/utils/config"
import Link from "next/link"
import { SiGithub, SiLinkedin } from "react-icons/si"
import { HiDownload } from "react-icons/hi"

const Contact = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12 relative">

      <AnimatedElement className="flex flex-col items-center gap-6 text-center relative">
        <Text size="huge-2" weight="bold">
          Get in Touch
        </Text>
        
        <Text size="lg" className="text-muted-foreground max-w-2xl">
          Have a project in mind or just want to say hello? Feel free to reach out.
        </Text>

        {/* Email com frame decorativo */}
        <div className="relative group mt-4">
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <Link href={config.links.contact}>
            <Text
              size="xl"
              weight="bold"
              className="inline-block px-8 py-4 border border-primary/30 text-primary hover:bg-primary/5 transition-all"
            >
              jonasmessias30@gmail.com
            </Text>
          </Link>
        </div>
      </AnimatedElement>

      {/* Links sociais */}
      <AnimatedElement delay={0.2} className="flex justify-center gap-8 mt-12 relative">
        <Link 
          href={config.links.github} 
          target="_blank"
          className="group relative p-4 border border-border/50 hover:border-primary transition-all"
        >
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <SiGithub className="text-4xl text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all" />
        </Link>
        
        <Link 
          href={config.links.linkedin} 
          target="_blank"
          className="group relative p-4 border border-border/50 hover:border-primary transition-all"
        >
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <SiLinkedin className="text-4xl text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all" />
        </Link>
      </AnimatedElement>

      {/* Download CV Button */}
      <AnimatedElement delay={0.3} className="flex justify-center mt-12">
        <a 
          href="/cv.pdf"
          download="Jonas_Messias_CV.pdf"
          className="group relative inline-flex items-center gap-3 px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-black transition-all"
        >
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary group-hover:border-black transition-colors"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary group-hover:border-black transition-colors"></div>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary group-hover:border-black transition-colors"></div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary group-hover:border-black transition-colors"></div>
          
          <HiDownload className="text-xl group-hover:scale-110 transition-transform" />
          <Text size="lg" weight="bold">
            Download CV
          </Text>
        </a>
      </AnimatedElement>
    </section>
  )
}

export default Contact
