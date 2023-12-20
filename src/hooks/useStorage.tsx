import { Category, Snippet } from '@utils/types'
import { v4 as uuidv4 } from 'uuid'

export default () => {
  const getCategories = (): Category[] => {
    const categoriesString = localStorage.getItem('categories') || '[]'
    try {
      return JSON.parse(categoriesString)
    } catch (err) {
      console.error(err) // TODO: Handle error.
      return []
    }
  }

  const getCategory = (targetCategory: string): Category[] => {
    const categories = getCategories()
    return categories.filter(
      (category: Category) => category.name === targetCategory
    )
  }

  const createCategory = (name: string): Category[] => {
    const categories = getCategories()
    const newCategory: Category = { name: name, snippets: [], categories: [] }
    categories.push(newCategory)
    localStorage.setItem('categories', JSON.stringify(categories, null, 0))
    return categories
  }

  const createSubCategory = (
    name: string,
    targetCategory: string
  ): Category[] => {
    const categories = getCategories()
    const newCategory: Category = {
      name: name,
      snippets: [],
      categories: [],
    }
    categories.forEach((category: Category) => {
      if (category.name === targetCategory) {
        category.categories.push(newCategory)
      }
    })
    localStorage.setItem('categories', JSON.stringify(categories))
    return categories
  }

  const createSnippet = (targetCategory: string): Category[] => {
    const categories = getCategories()
    const newSnippet: Snippet = {
      id: uuidv4(),
      category: targetCategory,
      name: 'Untitled',
      content: '',
    }
    addSnippetToCategory(categories, targetCategory, newSnippet)
    localStorage.setItem('categories', JSON.stringify(categories))
    return categories
  }

  const saveSnippet = (snippet: Snippet) => {
    const startTime = Date.now()
    const categories = getCategories()
    const updatedCategories = findSnippet(
      categories,
      snippet,
      (snippetToUpdate) => {
        snippetToUpdate.name = snippet.name
        snippetToUpdate.content = snippet.content
      }
    )
    localStorage.setItem('categories', JSON.stringify(updatedCategories))
    const saveTime = new Date(startTime - Date.now()).getMilliseconds()
    console.log(`Saved in ${saveTime}ms.`)
  }

  const deleteSnippet = (snippet: Snippet): Category[] => {
    const categories = getCategories()
    const updatedCategories = findSnippet(
      categories,
      snippet,
      (snippetToUpdate, categoryToUpdate) => {
        categoryToUpdate.snippets = categoryToUpdate.snippets.filter(
          (snippetToCheck) => snippetToCheck.id !== snippetToUpdate.id
        )
      }
    )
    console.log(updatedCategories)
    localStorage.setItem('categories', JSON.stringify(updatedCategories))
    return updatedCategories
  }

  return {
    getCategories,
    getCategory,
    createCategory,
    createSubCategory,
    createSnippet,
    saveSnippet,
    deleteSnippet,
  }
}

const addSnippetToCategory = (
  categories: Category[],
  targetCategory: string,
  newSnippet: Snippet
) => {
  for (const category of categories) {
    if (category.name === targetCategory) {
      category.snippets.push(newSnippet)
      return
    }

    if (category.categories.length > 0) {
      addSnippetToCategory(category.categories, targetCategory, newSnippet)
    }
  }
}

const findSnippet = (
  categories: Category[],
  snippetToUpdate: Snippet,
  callback: (snippet: Snippet, category: Category) => void
): Category[] => {
  if (!snippetToUpdate) throw new Error('No snippet provided.')

  for (let category of categories) {
    for (let snippet of category.snippets) {
      if (snippet.id === snippetToUpdate.id) {
        callback(snippet, category)
        console.log('in main:', categories)
        return categories
      }
    }

    if (category.categories) {
      findSnippet(category.categories, snippetToUpdate, callback)
    }
  }

  return categories
}
