import { Category, Snippet } from '@utils/types'
import SideNavFolder from './SideNavFolder'
import { FC, HTMLAttributes } from 'react'
import { P } from '@components/Typography'
import { useActiveSnippet } from '@contexts/activeSnippetContext'
import { cn } from '@utils/functions'
import { Trash } from 'iconoir-react'
import useStorage from '@hooks/useStorage'

interface RenderCategoryProps extends HTMLAttributes<HTMLLIElement> {
  category: Category
  setCategories: (categories: Category[]) => void
  depth: number
}

const RenderCategory: FC<RenderCategoryProps> = ({
  category,
  setCategories,
  depth,
  className,
  ...props
}) => {
  const { setActiveSnippet } = useActiveSnippet()
  const { deleteSnippet } = useStorage()

  const deleteThisSnippet = (snippet: Snippet) => {
    const updatedCategories = deleteSnippet(snippet)
    setCategories(updatedCategories)
    setActiveSnippet(null)
  }

  // TODO: Handle indentations better. This feels messy.

  const folderPL = 25 * depth
  const snippetPL = 25 * (depth + 1)

  return (
    <li key={category.name} className={cn('mb-4', className)} {...props}>
      <SideNavFolder
        category={category}
        style={{ paddingLeft: `${folderPL}px`, paddingRight: '15px' }}
        setCategories={setCategories}
      />
      <ul>
        {category.snippets.map((snippet) => (
          <li
            key={snippet.id}
            className={`group flex items-center justify-between py-2 cursor-pointer hover:bg-bg-light-dark hover:bg-opacity-25`}
            style={{ paddingLeft: `${snippetPL}px` }}
            onClick={() => setActiveSnippet(snippet)}
          >
            <div className='flex items-center'>
              <span className='w-[22px]'>•</span>
              <P>{snippet.name}</P>
            </div>
            <span
              className={`hidden group-hover:block p-2 mr-[11px] hover:bg-lightred rounded-lg`}
              onClick={() => deleteThisSnippet(snippet)}
            >
              <Trash />
            </span>
          </li>
        ))}
      </ul>
      <ul>
        {category.categories.map((subCategory) => (
          <RenderCategory
            key={subCategory.name + Math.random()}
            setCategories={setCategories}
            category={subCategory}
            depth={depth + 1}
          />
        ))}
      </ul>
    </li>
  )
}

export default RenderCategory
