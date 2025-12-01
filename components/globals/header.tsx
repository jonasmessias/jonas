import Line from '@/components/globals/line'
import Magnetic from '@/components/globals/magnetic'
import { Text } from '@/components/globals/text'
import { ThemeToggleButton } from '@/components/theme/theme-toggle-button'
import { config } from '@/utils/config'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="py-3 sm:py-4 max-w-600 mx-auto">
        <div className="px-4 sm:px-6 flex justify-between items-center">
          <div className="flex gap-2">
            <Magnetic>
              <Link href="/">
                <Text
                  size="lg"
                  className="font-indie-flower text-base sm:text-lg"
                >
                  Jonas Messias
                </Text>
              </Link>
            </Magnetic>
          </div>
          <ul className="hidden md:flex gap-4 lg:gap-6">
            {Object.entries(config.links).map(([key, value]) => (
              <li key={key}>
                <Magnetic>
                  <Text size="lg" className="capitalize text-sm lg:text-base">
                    <Link href={value} target="_blank">
                      {key}
                    </Link>
                  </Text>
                </Magnetic>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 sm:gap-4 items-center">
            <Magnetic>
              <ThemeToggleButton variant="circle" start="center" blur />
            </Magnetic>
          </div>
        </div>
      </nav>
      <Line
        className="absolute -bottom-12 left-0 w-full h-12 opacity-50"
        animation={{ delay: 0.8, duration: 1.2, from: 'left' }}
      />
    </header>
  )
}
