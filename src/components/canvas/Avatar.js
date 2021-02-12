import { Suspense, useEffect } from 'react'
import { Environment } from '@react-three/drei'
import { spring, value } from 'popmotion'
import { useGLTF, Text, PerspectiveCamera } from '@react-three/drei'
import { useThree, useFrame } from 'react-three-fiber'

const AvatarComponent = () => {
  const { scene, camera } = useThree()

  const Model = () => {
    const data = useGLTF(`/glb/avatar.glb`)

    return <primitive object={data.scene} position={[0, -1.65, 0.5]} />
  }

  const Loading = () => <Text>Loading...</Text>

  const Camera = () => {
    return (
      <PerspectiveCamera
        args={[45, window.innerWidth / window.innerHeight, 0.5, 2.2]}
      />
    )
  }

  useFrame(() => {
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 1
  })

  // Handle mouse move animation
  useEffect(() => {
    let listenerMouseMove
    let rotationSpring
    let rotationSpringValue

    const onMouseMove = (event) => {
      const { rotation } = scene
      const { innerWidth, innerHeight } = window

      const position = {
        x: (event.clientX - innerWidth / 2) / innerWidth,
        y: (event.clientY - innerHeight / 2) / innerHeight,
      }

      if (!rotationSpringValue) {
        rotationSpringValue = value(
          { x: rotation.x, y: rotation.y },
          ({ x, y }) => {
            rotation.set(x, y, rotation.z)
          }
        )
      }

      rotationSpring = spring({
        from: rotationSpringValue.get(),
        to: { x: position.y / 5, y: position.x / 3 },
        stiffness: 40,
        damping: 40,
        velocity: rotationSpringValue.getVelocity(),
        restSpeed: 0.00001,
        mass: 1.4,
      }).start(rotationSpringValue)
    }

    if (!listenerMouseMove && scene) {
      listenerMouseMove = window.addEventListener('mousemove', onMouseMove)
    }

    return () => {
      listenerMouseMove &&
        listenerMouseMove.removeEventListener('mousemove', onMouseMove)

      rotationSpring?.stop()
    }
  }, [scene])

  return (
    <Suspense fallback={<Loading />}>
      <ambientLight intensity={0.5} />
      <Model />
      <Camera />
      <Environment preset={'studio'} />
    </Suspense>
  )
}

export default AvatarComponent
