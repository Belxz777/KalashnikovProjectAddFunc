'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState,useCallback } from 'react'
import burgerImage from '../images&svg/2023-10-28_19-48-16.png'
import BurgerMenuIcon from '@/reusable/BurgerMenuLogo'
import CrossMenu from '@/reusable/Cross'
import Menu from '@/reusable/Menu'
import useKeenSlider from 'keen-slider'
import Carousel from 'embla-carousel'
import useEmblaCarousel, { EmblaOptionsType,EmblaCarouselType } from "embla-carousel-react";
import { useEffect } from 'react'
import axios from 'axios'
import { DotButton,PrevButton,NextButton } from '@/reusable/Dots&Arrows'
interface IUser {
  userId: number,
  id:number,
  title: string,
  body:string
}
export default function Home() {
  const [animate, setanimate] = useState(false)
  const [slides, setSlides] = useState<any[]>([]) 
  const [blocks, setBlocks] = useState<any[]>([])
  const [dataSearched, setdataSearched] = useState<IUser>()
  const [search, setsearch] = useState('')
  const [prevBtnDisabled, setprevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setnextBtnDisabled] = useState(true)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        setSlides(response.data.slice(-3));
        console.log(response.data.slice(-90))
      });
  }, []);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        setBlocks(response.data.slice(-6));
        console.log(response.data.slice(-90))
      });
  }, []);
  const searchIt= () =>{
    axios
    .get(`https://jsonplaceholder.typicode.com/posts/${search}`)
    .then((response) => {
     setdataSearched(response.data)
     console.log(response.data)
    });
  }
  const options: EmblaOptionsType = { align:'start', containScroll: false }
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setprevBtnDisabled(!emblaApi.canScrollPrev())
    setnextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

//завтра реализвать https://jsonplaceholder.typicode.com/posts
  return (
    <>
<header className=' bg-white w-full  h-24 flex justify-start   border-b-4 border-blue-600'>
<Image
alt= ' '
width= {90}
height={40}
 src='https://i.pinimg.com/originals/7b/07/62/7b0762f25df8d3cf66c8c1c21b0c712c.png'
 className=' pl-1 pt-1 select-none'>

</Image>
<h1  className=' text-xl text-blue-600 pt-5 font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900 font-sans'>академия <br/> калашников </h1>
<button onClick={()=>{setanimate(!animate)}} className= ' pl-pl-35 sm:pl-pl-40  lg:pl-pl-60  xl:pl-pl-70  md:pl-pl-70   '>{animate===true ? <CrossMenu/>  : <BurgerMenuIcon/>}</button>
</header>
<section className=' w-full'>
<motion.div
    className="  absolute z-50 w-72  top-30 right-2"
    initial={{ scale: 0 }}
    animate={animate===true ?{  scale: 1 } : ''}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20
    }}
  >
    <Menu />
  </motion.div>

    <div className='text-center'>
      Лучшие проекты
    </div>
    {/*начало блоков карусели */}
  <div className='w-screen bg-orange-600 pb-6 pt-6'>
  <div ref={emblaRef} className='l'>
    <div  className="flex  gap-x-1  " >
  {slides.map((slide) => (
  <div key={slide.id}  className=" w-3/4 h-64 bg-gray-700  rounded-2xl ">
    <Image src= {slide.url} alt='' width={130} height={20}  className=' pl-2 pt-2 ' />
    <h1  className=" text-red-950   w-56 ">{slide.title} </h1>
    </div>
        ))}
           <div className="  absolute flex items-center z-50">
          <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
          <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
        </div>
        <div className="">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => scrollTo(index)}
            className={'embla__dot'.concat(
              index === selectedIndex ? ' embla__dot--selected' : ''
            )}
          />
        ))}
      </div>
            </div>
  </div>
  </div>
</section>


<section className='w-full h-96 bg-gradient-to-r from-blue-500 to-blue-900 to-white items-center '>
<h1 className=' text-center  font-extrabold text-black text-xl	'> Найди конкретный проект нужный именно тебе </h1>
<input  className='  ml-14 w-80 rounded-lg  h-8 bg- text-center  sm:ml-20 md:ml-64 max-w-sm:ml-40 min[200]:ml-0 min-[400]:ml-8 lg:ml-96  max-[300]:ml-2 ' placeholder='Введите название проекта' value={search}  onChange={(e)=>{setsearch(e.target.value)
   searchIt()}}/>
{
dataSearched == null ? <h1 className=' text-center  font-extrabold text-black text-xl'>Пока ничего не найдено</h1> :
  <div key={dataSearched.id}  className="  w-2/3 rounded-lg h-64 border-4 bg-gradient-to-r from-blue-500 to-blue-900 ">
    <h1>{dataSearched.userId}</h1>
    <h1  className=" text-red-950  w-32 ">{dataSearched.title} </h1>
    <p >{dataSearched.body}</p>
    </div>
}
</section>
<section>
  <div className='w-screen bg-orange-600 '>
    <div   className='l'>
      <div  className="flex gap-x-1 pb-6 pt-6 ">
        {blocks.map((block) => (
        <div className="w-3/4 h-64 bg-gray-700  rounded-2xl  ">
          <Image src= {block.url} alt='' width={130} height={20}  className=' pl-2 pt-2 '  />
          <h1  className=" text-red-950   w-56 ">{block.title} </h1>
        </div>
              ))}
                  
          
      </div>
    </div>
  </div>
</section>
   <div className='bg-gray-100 w-screen'>
        <div className="grid grid-rows-2 grid-flow-col gap-4  place-content-around  h-48 bg-gray-100 w-screen">
          <div>Мероприятия</div>
          <div>Блог</div>
          <div>Об академии</div>
          <div>Направления</div>
          <div>Контакты</div>
          <div>Лицензионное соглашение</div>
        </div>
    </div>
</>
  )
}
