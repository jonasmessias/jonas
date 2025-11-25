import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const contentDirectory = path.join(process.cwd(), 'content')

export interface MarkdownFile {
  slug: string
  content: string
  data: {
    [key: string]: any
  }
}

/**
 * Get all markdown files from a specific folder
 * @param folder - The folder name inside /content (e.g., 'projects', 'experiences', 'posts')
 */
export function getMarkdownFiles(folder: string): MarkdownFile[] {
  const folderPath = path.join(contentDirectory, folder)
  
  // Check if folder exists
  if (!fs.existsSync(folderPath)) {
    return []
  }

  const fileNames = fs.readdirSync(folderPath)
  
  const markdownFiles = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(folderPath, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug,
        content,
        data
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
 * @param slug - The file name without .md extension
 */
export function getMarkdownFile(folder: string, slug: string): MarkdownFile | null {
  const fullPath = path.join(contentDirectory, folder, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    slug,
    content,
    data
  }
}

/**
 * Get all projects
 */
export function getProjects() {
  return getMarkdownFiles('projects')
}

/**
 * Get all experiences
 */
export function getExperiences() {
  return getMarkdownFiles('experiences')
}

/**
 * Get all blog posts
 */
export function getPosts() {
  return getMarkdownFiles('posts')
}
