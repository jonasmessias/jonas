"use client"

import { Header } from "@/components/globals/header"
import Line from "@/components/globals/line"
import Preloader from "@/components/globals/preloader"
import Contact from "@/components/sections/Contact"
import Experience from "@/components/sections/Experience"
import Presentation from "@/components/sections/Presentation"
import Projects from "@/components/sections/Projects"
import Technologies from "@/components/sections/Technologies"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Home() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Verifica se o preloader já foi exibido nesta sessão
    const hasSeenPreloader = sessionStorage.getItem('hasSeenPreloader')
    
    if (!hasSeenPreloader) {
      setLoading(true)
      const timer = setTimeout(() => {
        setLoading(false)
        sessionStorage.setItem('hasSeenPreloader', 'true')
      }, 10000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const handlePreloaderComplete = () => {
    setLoading(false)
    sessionStorage.setItem('hasSeenPreloader', 'true')
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      <motion.main
        initial={{ 
          opacity: 0,
        }}
        animate={{ 
          opacity: 1,
        }}
        transition={{ 
          duration: 0.8,
          delay: loading ? 10.5 : 0.5, 
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="min-h-screen w-full bg-background relative z-10"
      >
        <Header />
        <Line audioSrc="/sounds/3-oct-e.wav" volume={0.3} />
        <div className="flex flex-col gap-24 pt-12">
          <Presentation />
          <Line audioSrc="/sounds/2-oct-c.wav" volume={0.3} />
          <Technologies />
          <Line audioSrc="/sounds/3-oct-e.wav" volume={0.3} />
          <Experience />
          <Line audioSrc="/sounds/2-oct-c.wav" volume={0.3} />
          <Projects />
          <Line audioSrc="/sounds/3-oct-e.wav" volume={0.3} />
          <Contact />
        </div>
      </motion.main>
    </>
  )
}
