import { Button } from '@components/Button'
import { H1, P } from '@components/Typography'
import { Rocket } from 'iconoir-react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage: FC = () => {
  const navigate = useNavigate()

  const navigateToEditor = () => {
    navigate('editor')
  }

  return (
    <>
      <main className='h-screen max-w-xl px-4 mx-auto text-center flex flex-col items-center justify-center gap-6'>
        <H1 size='6xl'>The Easiest Code Snippet Manager</H1>
        <P variant='gray'>
          Open source. No payments, no login. Just start using it.
        </P>
        <Button
          size='lg'
          icon={<Rocket className='rotate-45' />}
          className='hover:bg-bg-light-darker hover:scale-110'
          onClick={navigateToEditor}
        >
          Launch App
        </Button>
      </main>

      <footer className='absolute bottom-5 w-full text-center'>
        <p>
          <span>
            <a
              href='https://github.com/reecehunter'
              target='_blank'
              rel='noreferrer'
              className='text-text-link hover:underline'
            >
              Open Source
            </a>
          </span>

          <span>{' - '}</span>

          <span>
            Made by{' '}
            <a
              href='https://github.com/reecehunter'
              target='_blank'
              rel='noreferrer'
              className='text-text-link hover:underline'
            >
              Reece
            </a>
          </span>
        </p>
      </footer>
    </>
  )
}

export default HomePage
