import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'

const Avatar = dynamic(() => import('@/components/canvas/Avatar'), {
  ssr: false,
})

const Page = () => {
  useStore.setState({ title: '👋 Hi!' })

  return (
    <>
      <Avatar r3f />
    </>
  )
}

export default Page
