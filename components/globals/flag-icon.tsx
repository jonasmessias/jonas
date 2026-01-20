import { type Locale } from '@/i18n/config'

interface FlagIconProps {
  locale: Locale
  className?: string
}

export function FlagIcon({ locale, className = 'w-5 h-5' }: FlagIconProps) {
  const flags = {
    en: (
      <svg
        className={className}
        viewBox="0 0 640 480"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="us-flag">
            <path d="M0 0h640v480H0z" />
          </clipPath>
        </defs>
        <g clipPath="url(#us-flag)">
          <path fill="#bd3d44" d="M0 0h640v480H0z" />
          <path
            stroke="#fff"
            strokeWidth="37"
            d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"
          />
          <path fill="#192f5d" d="M0 0h364.8v258.5H0z" />
          <g fill="#fff">
            <g id="us-star">
              <g id="us-star-4">
                <path
                  id="us-star-1"
                  d="m30.4 11 3.4 10.3h10.8l-8.7 6.4 3.3 10.3-8.8-6.3-8.7 6.3 3.3-10.3-8.7-6.4h10.8z"
                />
                <use xlinkHref="#us-star-1" y="48" />
                <use xlinkHref="#us-star-1" y="96" />
                <use xlinkHref="#us-star-1" y="144" />
                <use xlinkHref="#us-star-1" y="192" />
              </g>
              <use xlinkHref="#us-star-4" x="61" y="24" />
              <use xlinkHref="#us-star-4" x="122" />
              <use xlinkHref="#us-star-4" x="122" y="48" />
              <use xlinkHref="#us-star-4" x="183" y="24" />
              <use xlinkHref="#us-star-4" x="244" />
              <use xlinkHref="#us-star-4" x="244" y="48" />
              <use xlinkHref="#us-star-4" x="305" y="24" />
            </g>
          </g>
        </g>
      </svg>
    ),
    pt: (
      <svg
        className={className}
        viewBox="0 0 640 480"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g strokeWidth="1pt">
          <path fill="#229e45" d="M0 0h640v480H0z" />
          <path fill="#f8e509" d="M321.4 436 619.7 240 321.4 44 23 240z" />
          <path
            fill="#2b49a3"
            d="M452.8 240c0 70.3-57.1 127.3-127.6 127.3A127.4 127.4 0 1 1 452.8 240z"
          />
          <path
            fill="#ffffef"
            d="M283.3 316.3l-4-2.3-4 2.3 1-4.6-3.4-3.2 4.6-.7 2.2-4.2 2.1 4.2 4.6.7-3.4 3.2m86 26.3l-3.9-2.3-4 2.3 1-4.6-3.3-3.2 4.6-.7 2.1-4.2 2.2 4.2 4.6.7-3.4 3.2m-36.2-30l-3.4-2-3.5 2 .8-4-2.9-2.8 4-.6 1.8-3.6 1.8 3.7 4 .6-3 2.7m87-8.5l-3.4-2-3.5 2 .8-4-2.9-2.8 4-.6 1.8-3.6 1.9 3.7 4 .6-3 2.7m-87.3-22l-4-2.2-4 2.3 1-4.7-3.4-3.2 4.6-.6 2.2-4.2 2 4.2 4.7.6-3.4 3.2m-104.6-35.7l-4-2.2-4 2.2 1-4.6-3.4-3.2 4.6-.6 2.2-4.2 2.1 4.2 4.6.6-3.4 3.2m13.3 57.2l-4-2.3-4 2.3 1-4.6-3.4-3.2 4.6-.7 2.2-4.2 2.1 4.2 4.6.7-3.4 3.2m132-67.3l-3.6-2-3.6 2 1-4.2-3-2.8 4.1-.6 1.9-3.8 1.8 3.8 4.1.6-3 2.8m-6.7 38.3l-2.7-1.6-2.9 1.6.7-3.3-2.3-2.2 3.2-.5 1.5-3 1.4 3 3.2.5-2.4 2.2m-52.2 5l-2.7-1.5-2.8 1.5.7-3.3-2.3-2.2 3.2-.4 1.4-3 1.5 3 3.1.5-2.3 2.1m-28.4-8.4l-2.7-1.5-2.8 1.5.7-3.3-2.3-2.2 3.2-.4 1.4-3 1.5 3 3.1.5-2.3 2.1m8 33.5l-2.7-1.5-2.8 1.5.7-3.3-2.3-2.2 3.2-.4 1.4-3 1.5 3 3.1.5-2.3 2.1m8.8-39l-2.7-1.6-2.7 1.6.7-3.3-2.3-2.2 3.2-.5 1.4-3 1.5 3 3.1.5-2.3 2.2m84.5-9.5l-3.2-1.8-3.2 1.8.8-3.8-2.7-2.6 3.7-.5 1.7-3.5 1.6 3.5 3.7.5-2.7 2.6"
          />
          <path
            fill="#ffffef"
            d="M283.3 316.3l-4-2.3-4 2.3 1-4.6-3.4-3.2 4.6-.7 2.2-4.2 2.1 4.2 4.6.7-3.4 3.2m86 26.3l-3.9-2.3-4 2.3 1-4.6-3.3-3.2 4.6-.7 2.1-4.2 2.2 4.2 4.6.7-3.4 3.2m-36.2-30l-3.4-2-3.5 2 .8-4-2.9-2.8 4-.6 1.8-3.6 1.8 3.7 4 .6-3 2.7m87-8.5l-3.4-2-3.5 2 .8-4-2.9-2.8 4-.6 1.8-3.6 1.9 3.7 4 .6-3 2.7m-87.3-22l-4-2.2-4 2.3 1-4.7-3.4-3.2 4.6-.6 2.2-4.2 2 4.2 4.7.6-3.4 3.2"
          />
        </g>
      </svg>
    ),
    es: (
      <svg
        className={className}
        viewBox="0 0 640 480"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="#c60b1e" d="M0 0h640v480H0z" />
        <path fill="#ffc400" d="M0 120h640v240H0z" />
      </svg>
    ),
  }

  return flags[locale] || flags.en
}
