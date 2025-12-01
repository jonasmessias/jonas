'use client'
import { Text } from '@/components/globals/text'
import { HiChevronDown } from 'react-icons/hi'

const ScrollIndicator = () => {
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.scrollY + window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <div className="pb-6 sm:pb-8">
      <button
        onClick={scrollToNextSection}
        className="mx-auto cursor-pointer flex flex-col items-center gap-1.5 sm:gap-2 text-primary hover:text-primary/80 transition-colors group"
        aria-label="Scroll to next section"
      >
        <Text
          size="sm"
          className="opacity-70 group-hover:opacity-100 transition-opacity text-xs sm:text-sm"
        >
          Scroll down
        </Text>
        <HiChevronDown className="text-xl sm:text-2xl animate-bounce" />
      </button>
    </div>
  )
}

export default ScrollIndicator
