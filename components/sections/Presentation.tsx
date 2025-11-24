import AnimatedElement from "@/components/animations/animated-element";
import AnimatedText from "@/components/animations/animated-text";
import { Text } from "@/components/globals/text";
import Image from "next/image";
import { HiDownload } from "react-icons/hi";

const Presentation = () => {
    return (
        <section className="max-w-5xl mx-auto px-4 relative">
            {/* Grid decorativo de linhas */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                {/* Linhas verticais */}
                <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent"></div>
                <div className="absolute left-2/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent"></div>
                <div className="absolute left-3/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent"></div>
                
                {/* Linhas horizontais */}
                <div className="absolute top-1/4 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                <div className="absolute top-3/4 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
                {/* Coluna de texto */}
                <div className="flex flex-col gap-6 relative">
                    {/* Borda decorativa esquerda */}
                    <div className="absolute -left-4 top-0 w-1 h-24 bg-primary"></div>
                    
                    <AnimatedElement>
                        <Text
                            size="huge-3"
                            weight="bold"
                            className="leading-tight"
                        >
                            <AnimatedText variant="letter" text="Developer" />
                            <br />
                            <AnimatedText variant="letter" text="Front-end" />
                        </Text>
                    </AnimatedElement>
                    
                    <AnimatedElement delay={0.2}>
                        <Text
                            size="lg"
                            className="text-muted-foreground border-l-2 border-primary/30 pl-4"
                        >
                            Dedicated to building scalable, high-performance, and well-architected applications with React, Next.js, and TypeScript.
                        </Text>
                    </AnimatedElement>

                    {/* Download CV Button */}
                    <AnimatedElement delay={0.3}>
                        <a 
                            href="/cv.pdf"
                            download="Jonas_Messias_CV.pdf"
                            className="group relative inline-flex items-center gap-3 px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-black transition-all w-fit"
                        >
                            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-primary group-hover:border-black transition-colors"></div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-primary group-hover:border-black transition-colors"></div>
                            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-primary group-hover:border-black transition-colors"></div>
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-primary group-hover:border-black transition-colors"></div>
                            
                            <HiDownload className="text-xl group-hover:scale-110 transition-transform" />
                            <Text size="md" weight="bold">
                                Download CV
                            </Text>
                        </a>
                    </AnimatedElement>
                </div>

                {/* Coluna da imagem */}
                <AnimatedElement delay={0.4} className="flex justify-center md:justify-end relative">
                    {/* Frame decorativo com linhas retas */}
                    <div className="relative group">
                        {/* Cantos decorativos */}
                        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary"></div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-primary"></div>
                        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-primary"></div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary"></div>
                        
                        {/* Container da imagem */}
                        <div className="w-72 h-72 relative overflow-hidden">
                            <Image
                                src="/me.jpeg"
                                alt="Jonas Messias"
                                fill
                                sizes="(max-width: 768px) 100vw, 288px"
                                priority
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                            />
                            
                            {/* Overlay sutil */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent group-hover:opacity-0 transition-opacity duration-500"></div>
                        </div>
                    </div>
                </AnimatedElement>
            </div>
        </section>
    );
};

export default Presentation;
