import { H2 } from '@components/Typography'
import DropdownModal from '@components/input/modals/DropdownModal'
import IconButton from '@components/input/IconButton'
import { Category, ModalOption, Snippet } from '@utils/types'
import { PlusCircle } from 'iconoir-react'
import { FC, useEffect, useState } from 'react'
import TextInputModal from '@components/input/modals/TextInputModal'
import { useActiveSnippet } from '@contexts/activeSnippetContext'
import useDebounce from '@hooks/useDebounce'
import useStorage from '@hooks/useStorage'
import RenderCategory from './RenderCategory'

interface SideNavProps {
  className?: string
}

const SideNav: FC<SideNavProps> = ({ className }) => {
  const { getCategories, createCategory } = useStorage()
  const { activeSnippet } = useActiveSnippet()

  const [categories, setCategories] = useState<Category[]>(getCategories())
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [categoryInputModalOpen, setCategoryInputModalOpen] =
    useState<boolean>(false)

  const createNewCategory = (name: string) => {
    setCategories(createCategory(name))
  }

  const createOptions: ModalOption[] = [
    {
      name: 'Create Category',
      onClick: () => {
        setCategoryInputModalOpen(true)
        setCreateModalOpen(false)
      },
    },
  ]

  useEffect(() => {
    setCategories(getCategories())
  }, [])

  // We have to do all this because we the 'categories' state we use
  // in this component does not update when 'activeSnippet' is updated.
  // TODO: Find a better way to do this.
  useEffect(
    useDebounce({
      func: () => {
        if (!activeSnippet) return
        // Update 'categories' with the updated snippet.
        for (const category of categories) {
          if (category.name === activeSnippet.category) {
            for (const snippet of category.snippets) {
              if (snippet.id === activeSnippet.id) {
                // Update the snippets of the category.
                const updatedSnippets: Snippet[] = [...category.snippets]
                // Get the snippet with the same id as the activeSnippet.
                let currentSnippet = updatedSnippets.find(
                  (snippet) => snippet.id === activeSnippet.id
                )
                if (!currentSnippet) throw new Error('Snippet not found.')
                currentSnippet.name = activeSnippet.name
                currentSnippet.content = activeSnippet.content

                // Update the category with the snippets
                const updatedCategory: Category = {
                  ...category,
                  snippets: updatedSnippets,
                }
                // Replace the old category with the updated one.
                const updatedCategories: Category[] = [...categories]
                updatedCategories.forEach((category) => {
                  if (category.name === updatedCategory.name) {
                    category = updatedCategory
                  }
                })

                // Set the updated categories.
                setCategories(updatedCategories)
              }
            }
          }
        }
      },
      timeout: 1000,
    }),
    [activeSnippet?.name, activeSnippet?.content]
  )

  return (
    <>
      <TextInputModal
        title='New Category'
        description='What do you want to call your new category?'
        isOpen={categoryInputModalOpen}
        setOpen={setCategoryInputModalOpen}
        actionString='Create'
        action={createNewCategory}
      />

      <nav className={className}>
        <header className='m-4 flex items-center justify-between'>
          <H2>SNIPPETS</H2>
          <div className='relative'>
            <IconButton
              icon={<PlusCircle />}
              onClick={() => setCreateModalOpen(true)}
            />
            <DropdownModal
              isOpen={createModalOpen}
              close={() => setCreateModalOpen(false)}
              options={createOptions}
              category={null}
            />
          </div>
        </header>

        <ul className='mt-4'>
          {categories.map((category) => (
            <RenderCategory
              key={category.name}
              category={category}
              setCategories={setCategories}
              depth={1}
            />
          ))}
        </ul>
      </nav>
    </>
  )
}

export default SideNav
