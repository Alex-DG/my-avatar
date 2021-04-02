import useStore from '@/helpers/store'
// import { Badge } from '@pmndrs/branding'
import * as ga from '../../helpers/ga'
import Head from 'next/head'

const Header = () => {
  const title = useStore((s) => s.title)
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}
const Dom = ({ dom }) => {
  const events = useStore((s) => s.events)

  return (
    <div className='absolute top-0 left-0 right-0 z-20 dom' {...events}>
      <Header />
      {dom}

      <h1 className='w-full mt-16 tracking-widest text-center top-1/2 sm:subpixel-antialiased md:antialiased'>
        {`BONJOUR IT'S ME, `}
        <a
          className='hover:text-react-blue hover:line-through'
          href='https://www.alexdiguida.com/'
          rel='noopener noreferrer'
          target='_blank'
          onClick={() =>
            ga.event({
              action: 'onClick link!',
              params: {},
            })
          }
        >
          @Alex
        </a>
        {' 🥖'}
      </h1>

      {/* <div className='absolute bottom-4 right-4 z-index-30'>
        <Badge url='https://github.com/Alex-DG' />
      </div> */}
    </div>
  )
}

export default Dom
