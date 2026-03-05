import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const contentDirectory = path.join(process.cwd(), 'content')

export interface MarkdownFile {
  slug: string // Base slug without locale suffix (e.g., 'agio' instead of 'agio.en')
  content: string
  locale?: string // The locale of this file (e.g., 'en', 'pt', 'es')
  data: {
    [key: string]: any
  }
}

/**
 * Get all markdown files from a specific folder
 * @param folder - The folder name inside /content (e.g., 'projects', 'experiences', 'posts')
 */
export function getMarkdownFiles(
  folder: string,
  locale?: string,
): MarkdownFile[] {
  const folderPath = path.join(contentDirectory, folder)

  // Check if folder exists
  if (!fs.existsSync(folderPath)) {
    return []
  }

  const fileNames = fs.readdirSync(folderPath)

  // Group files by base slug (e.g. 'agio' from 'agio.en.md' or 'agio.md')
  // Ignore template files and README
  const grouped: Record<string, string[]> = {}
  fileNames
    .filter(
      (f) => f.endsWith('.md') && !f.startsWith('_') && !f.startsWith('README'),
    )
    .forEach((fileName) => {
      const nameWithoutExt = fileName.replace(/\.md$/, '') // e.g. 'agio.en' or 'agio'
      const base = nameWithoutExt.replace(/\.[a-z]{2}$/, '') // remove locale suffix if present
      grouped[base] = grouped[base] || []
      grouped[base].push(fileName)
    })

  // For each base slug, pick the file that matches the locale if available,
  // otherwise pick the file without locale suffix (default), otherwise fallback to first.
  const chosenFiles: string[] = Object.values(grouped).map((group) => {
    if (locale) {
      const localeSuffix = `.${locale}.md`
      const matched = group.find((f) => f.endsWith(localeSuffix))
      if (matched) return matched
    }
    const defaultFile = group.find(
      (f) => !/\.[a-z]{2}\.md$/.test(f) && f.endsWith('.md'),
    )
    return defaultFile || group[0]
  })

  const markdownFiles = chosenFiles
    .map((fileName) => {
      const nameWithoutExt = fileName.replace(/\.md$/, '')
      const localeMatch = nameWithoutExt.match(/\.([a-z]{2})$/)
      const fileLocale = localeMatch ? localeMatch[1] : undefined
      const baseSlug = nameWithoutExt.replace(/\.[a-z]{2}$/, '') // Remove locale suffix for consistent slug

      const fullPath = path.join(folderPath, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug: baseSlug, // Use base slug without locale suffix
        content,
        locale: fileLocale,
        data,
      }
    })
    // Sort by order field if exists, otherwise by date
    .sort((a, b) => {
      if (a.data.order !== undefined && b.data.order !== undefined) {
        return a.data.order - b.data.order
      }
      if (a.data.date && b.data.date) {
        return new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
      }
      return 0
    })

  return markdownFiles
}

/**
 * Get a single markdown file by slug
 * @param folder - The folder name inside /content
 * @param slug - The file name without .md extension and locale suffix
 * @param locale - Optional locale to load specific language version
 */
export function getMarkdownFile(
  folder: string,
  slug: string,
  locale?: string,
): MarkdownFile | null {
  // Try to find locale-specific file first
  if (locale) {
    const localeFilePath = path.join(
      contentDirectory,
      folder,
      `${slug}.${locale}.md`,
    )
    if (fs.existsSync(localeFilePath)) {
      const fileContents = fs.readFileSync(localeFilePath, 'utf8')
      const { data, content } = matter(fileContents)
      return {
        slug,
        content,
        locale,
        data,
      }
    }
  }

  // Fallback to file without locale suffix
  const defaultFilePath = path.join(contentDirectory, folder, `${slug}.md`)
  if (fs.existsSync(defaultFilePath)) {
    const fileContents = fs.readFileSync(defaultFilePath, 'utf8')
    const { data, content } = matter(fileContents)
    return {
      slug,
      content,
      locale: undefined,
      data,
    }
  }

  return null
}

/**
 * Get all projects
 */
export function getProjects(locale?: string) {
  return getMarkdownFiles('projects', locale)
}

/**
 * Get all experiences
 */
export function getExperiences(locale?: string) {
  return getMarkdownFiles('experiences', locale)
}

/**
 * Get all blog posts
 */
export function getPosts(locale?: string) {
  return getMarkdownFiles('posts', locale)
}
