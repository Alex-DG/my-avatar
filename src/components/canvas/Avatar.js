import { Suspense } from 'react'
import { Environment } from '@react-three/drei'

import { useGLTF, Text } from '@react-three/drei'

const AvatarComponent = () => {
  const Model = () => {
    const data = useGLTF(`/glb/avatar.glb`)
    return <primitive object={data.scene} position={[0, -1.7, 4.1]} />
  }

  const Loading = () => (
    <Text
      color='white' // default
    >
      Loading...
    </Text>
  )

  return (
    <Suspense fallback={<Loading />}>
      <ambientLight intensity={0.5} />
      <Model />
      <Environment preset={'studio'} />
    </Suspense>
  )
}

export default AvatarComponent
