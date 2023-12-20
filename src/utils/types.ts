export type Snippet = {
  id: string
  name: string
  category: string
  content: string
}

export type Category = {
  name: string
  snippets: Snippet[]
  categories: Category[]
}

export type ModalOption = {
  name: string
  onClick: (selection: string) => void
}
