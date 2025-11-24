"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

type AnimatedTextProps = {
  text: string | string[]
  variant?: "typewriter" | "fadeIn" | "slideUp" | "letter"
  className?: string
  staggerDelay?: number
  once?: boolean
}

const AnimatedText = ({
  text,
  variant = "fadeIn",
  className,
  staggerDelay = 0.05,
  once = true,
}: AnimatedTextProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.5, once })

  const textArray = Array.isArray(text) ? text : [text]

  const variants = {
    hidden: { opacity: 0, y: variant === "slideUp" ? 20 : 0 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * staggerDelay,
      },
    }),
  }

  const renderText = () => {
    const textToRender = textArray.join(" ")
    const splitBy = variant === "letter" ? "" : " "

    return (
      <motion.span
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={className}
      >
        {textToRender.split(splitBy).map((char, i) => (
          <motion.span
            key={i}
            variants={variants}
            custom={i}
            className={`inline-block ${splitBy === " " ? "mr-2" : ""}`}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    )
  }

  return renderText()
}

export default AnimatedText