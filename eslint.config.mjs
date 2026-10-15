import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// eslint-config-next 15 ainda é eslintrc; o FlatCompat o traz para o formato flat.
const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) })

const config = [
  { ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts', 'curriculo/**'] },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
]

export default config
