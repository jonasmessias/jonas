import { Text } from '@/components/globals/text'
import { DecorativeCorners } from '@/components/ui/decorative-corners'
import { IconType } from 'react-icons'

interface TechnologyCardProps {
  icon: IconType
  name: string
}

export const TechnologyCard = ({ icon: Icon, name }: TechnologyCardProps) => {
  return (
    <div className="group relative flex cursor-pointer flex-col items-center gap-3 sm:gap-4 border border-border/50 p-4 sm:p-5 md:p-6 transition-all hover:border-primary hover:bg-primary/5">
      <DecorativeCorners size="sm" variant="hover" />
      <Icon className="text-primary text-3xl sm:text-4xl md:text-5xl group-hover:scale-110 transition-transform" />
      <Text
        size="md"
        weight="semibold"
        className="text-center text-xs sm:text-sm md:text-base"
      >
        {name}
      </Text>
    </div>
  )
}
