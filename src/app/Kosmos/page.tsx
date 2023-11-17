'use client'
import React, { useState } from 'react'
import {Canvas} from '@react-three/fiber'
import { Loader } from '../Loader'
import { OrbitControls, Plane } from '@react-three/drei'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'
import Image from 'next/image'
import CrossMenu  from '@/reusable/Cross'
import BurgerMenuIcon from '@/reusable/BurgerMenuLogo'
import{ AiOutlineReddit} from 'react-icons/ai'
import Link from 'next/link'
import TypeWriter from 'typewriter-effect'
import { delay } from 'framer-motion'
import { useRef } from 'react'
import {motion} from 'framer-motion'
import Menu from '@/reusable/Menu'
type Props = {}

const page = (props: Props) => {
  const typeRef = useRef()
  const [opened, setopened] = useState(false)
  const open = ()=>{
setopened(true)
  }
  const [animate, setanimate] = useState(false)
  return (
    <>
    <header className=' bg-white w-full  h-24 flex justify-start   border-b-4    ' >
<Image
alt= ' '
width= {90}
height={40}
 src='https://i.pinimg.com/originals/7b/07/62/7b0762f25df8d3cf66c8c1c21b0c712c.png'
 className=' pl-1 pt-1 select-none '>

</Image>
<Link   href= '/'className=' text-xl pt-5 font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900 font-sans'>академия <br/> калашников </Link><button onClick={()=>{setanimate(!animate)}} className= ' pl-pl-35 sm:pl-pl-40  lg:pl-pl-60  xl:pl-pl-70  md:pl-pl-70   '>{animate===true ? <CrossMenu/>  : <BurgerMenuIcon/>}</button>
</header>
    <section className='flex '>
    <motion.div
    className="  absolute z-20 w-72  top-30  -right-48 bg-white rounded-md  border-4 border-blue-950 "
    initial={{ x: 100 }}
    animate={animate===true ?{  x: -100 } : ''}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20
    }}
  >
    <Menu />
  </motion.div>
        <div className='h-screen w-1/2  bg-gradient-to-l  from-slate-500   to-neutral-200 '>
          <p  className=' ml-10  text-4xl pt-5 font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-black to-blue-900 font-sans '>
          Направление Космос  в Академии Калашников это:
          </p>
          <ul className=''>
          <li  className=' ml-10  text-xl pt-5 font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-900 to-black font-sans '> 
            Огромные возможности для будущего развития
          </li>
          <li className=' ml-12  text-xl pt-5 font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-900 to-black font-sans  '>
         Прекрасные преподаватели 
          </li>
          <li className=' ml-10  text-xl pt-5 font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-900 to-black font-sans '>
            Интересная , позновательная программа для всех
          </li>
        </ul>
        <button onClick={open} className=' ml-12  text-xl pt-5 font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-900 to-black font-sans'>Подробнее</button>
        {
          opened ? <p className=' ml-10  text-xl pt-5 font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-900 to-black font-sans'><TypeWriter
          onInit={(typewriter:any) => {
            typewriter.typeString("Наша программа расчитана на любого ребенка с 7-11 класс , каждый получит незабываемый опыт и знания , а также приобретет новых друзей. ")
              .callFunction(() => {
                console.log('String typed out!');
              })
              .pauseFor(25000)
              .callFunction(() => {
                console.log('All strings were deleted');
              })
              .start();
          }}


          options={
         {   delay:60,
          cursor:'|'
        }
          }
        />
        </p>
        : null
        }
        <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ml-10 mt-4'>
        <Link href="https://kalashnikov.academy/events?skill=303" passHref>Записаться на Космос</Link></button>
        </div>
        <div className='h-screen w-1/2 bg-gradient-to-r   from-slate-500    to-neutral-200 '>
        <Canvas camera={{ position: [10,0,0], fov: 20  }}className=' '>
    <directionalLight  />
    <OrbitControls/>
<Loader name={'TelescopeM'} />
<planeGeometry args={[50, 50]} />
        <meshStandardMaterial color={'black'} /> 
</Canvas>
</div>
</section>
</>
  )
}
//довести до ума
export default page