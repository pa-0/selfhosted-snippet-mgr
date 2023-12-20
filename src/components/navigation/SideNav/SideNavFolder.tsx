import { P } from '@components/Typography'
import IconButton from '@components/input/IconButton'
import DropdownModal from '@components/input/modals/DropdownModal'
import { Category, ModalOption } from '@utils/types'
import { Folder, PlusCircle } from 'iconoir-react'
import { FC, HTMLAttributes, useState } from 'react'
import TextInputModal from '@components/input/modals/TextInputModal'
import useStorage from '@hooks/useStorage'
import { cn } from '@utils/functions'

interface SideNavFolderProps extends HTMLAttributes<HTMLDivElement> {
  category: Category
  setCategories: (categories: Category[]) => void
}

const SideNavFolder: FC<SideNavFolderProps> = ({
  category,
  setCategories,
  className,
  ...props
}) => {
  const { createSubCategory, createSnippet } = useStorage()

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false)

  const createNewSubCategory = (name: string) => {
    const updatedCategories = createSubCategory(name, category.name)
    setCategories(updatedCategories) // TODO: Turn setCategories into a context instead of prop drilling it from SideNav.
  }

  const createNewSnippet = (targetCategory: string) => {
    const updatedCategories = createSnippet(targetCategory)
    setCategories(updatedCategories)
    setModalOpen(false)
  }

  const modalOptions: ModalOption[] = [
    {
      name: 'Create Sub-Category',
      onClick: () => {
        setCategoryModalOpen(true)
        setModalOpen(false)
      },
    },
    {
      name: 'Create Snippet',
      onClick: (selection) => createNewSnippet(selection),
    },
  ]

  return (
    <>
      <TextInputModal
        title='New Sub-Category'
        description='What do you want to call your new sub-category?'
        isOpen={categoryModalOpen}
        setOpen={setCategoryModalOpen}
        actionString='Create'
        action={createNewSubCategory}
      />

      <div
        className={cn(
          'group flex items-center justify-between py-2 hover:bg-bg-light-dark hover:bg-opacity-25',
          className
        )}
        {...props}
      >
        <div className='flex items-center gap-2'>
          <Folder width='22px' />
          <P>{category.name}</P>
        </div>
        <div className='relative'>
          <IconButton
            icon={<PlusCircle />}
            className='hidden group-hover:inline-block'
            onClick={() => setModalOpen(true)}
          />
          <DropdownModal
            isOpen={modalOpen}
            close={() => setModalOpen(false)}
            options={modalOptions}
            category={category.name}
          />
        </div>
      </div>
    </>
  )
}

export default SideNavFolder
