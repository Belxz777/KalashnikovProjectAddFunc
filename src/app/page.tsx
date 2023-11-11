'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState,useCallback,useEffect,useRef } from 'react'
import BurgerMenuIcon from '@/reusable/BurgerMenuLogo'
import CrossMenu from '@/reusable/Cross'
import Menu from '@/reusable/Menu'
import Carousel from 'embla-carousel'
import useEmblaCarousel, { EmblaOptionsType,EmblaCarouselType } from "embla-carousel-react";
import axios from 'axios'
import verf from '../images&svg/pngwing.com (4).png'
import izmashlogo from '../images&svg/2197058.png'
import kalashLogo from '../images&svg/kalashLogo.png'
import nintynine from '../images&svg/99png.png'
import ytlogo from '../images&svg/pngwing.com.png'
import vklogo from '../images&svg/pngwing.com (1).png'
import Logo from '@/reusable/Logo'
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
  const [load, setload] = useState(true)
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        //setSlides(response.data.slice(-80));
        setload(true)
        console.log(response.data.slice(-90))
      });
  }, []);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        setSlides(response.data.slice(-80));

        console.log(response.data.slice(-90))
      });
  }, []);
  const [userSearch, setUserSearch] = useState("");
  const [image, setimage] = useState(null)
  type Post = { 
    id: number; 
    title: { 
      rendered: string; 
    }; 
    content: { 
      rendered: string; 
    }; 
  }; 
  const [data,setData] = useState<Post>() 
  // Holds a reference the current input field value 
  const inputRef = useRef(null);
  
    // Holds a reference the current input field value
    
    // Makes an API request whenever the search state is updated
    useEffect(() => {
    
      // Debounce Effect
      // Code within the setTimeout runs every 0.5 seconds
      const timer = setTimeout(() => {
    
        // 1. The conditional checks the input's current value
        // 2. It compares it against the userSearch state
        // 3. If they match then the user has stopped typing and the API is ready to be called 
    
        if(userSearch ) {
          const query = `http://localhost:10004/wp-json/wp/v2/posts?search=${userSearch}`;
    
          axios.get(query)
            .then((response)=> {
              if(response.data !== null){
              const post = response.data[0]
        console.log(response.data)
              console.log(data)
              setData(post)
              const content = post.content.rendered
              const imageUrlMatch = content.match(/src="([^"]+)"/); // Находим URL изображения
              const imageUrl = imageUrlMatch ? imageUrlMatch[1] : null; // Получаем URL изображения (если оно было найдено)
              setimage(imageUrl )
              // Удаляем HTML-теги, кроме <p>
              const strippedContent = content.replace(/(<(?!p\b)[^>]+>)|(\n)/g, '');
          
              console.log('URL изображения:', imageUrl);
  
            // alert(imageUrl)
              //alert(strippedContent)
              console.log('Текст без тегов:', strippedContent);
              // Execute next steps
              }
            })
        }
      }, 500)
    
      // Every time the useEffect runs it creates a new setTimeout function
      // Returning this cleanup function will run before each new render and remove the old timer
      return () => {
        clearTimeout(timer)
      }  
    
    }, [userSearch, inputRef]);
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
    < >
<header className=' bg-white w-full  h-24 flex justify-start   border-b-4    ' >
<Image
alt= ' '
width= {90}
height={40}
 src='https://i.pinimg.com/originals/7b/07/62/7b0762f25df8d3cf66c8c1c21b0c712c.png'
 className=' pl-1 pt-1 select-none '>

</Image>
<h1  className=' text-xl pt-5 font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900 font-sans'>академия <br/> калашников </h1>
<button onClick={()=>{setanimate(!animate)}} className= ' pl-pl-35 sm:pl-pl-40  lg:pl-pl-60  xl:pl-pl-70  md:pl-pl-70   '>{animate===true ? <CrossMenu/>  : <BurgerMenuIcon/>}</button>
</header>
<section className=' w-full  bg-[url("../images&svg/nero.jpg")]   overflow-hidden'> 
<motion.div
    className="  absolute z-20 w-72 h-80  top-30  -right-48 bg-white rounded-md  border-4 border-blue-950 "
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

    <div className='text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900 font-sans '>
      Лучшие проекты
    </div>
    <div className='w-screen  pb-6 pt-6'>
    {/*начало блоков карусели */}
    {load ?

  <div ref={emblaRef} className='l'>
    <div  className="flex  gap-x-3 transform  rotate-x-45  rotate-y-45    " >
  {slides.map((slide) => (
  <div key={slide.id}  className=" w-3/4 h-64 bg-white hover:bg-slate-300  rounded-lg   shadow-xl ">
    <Image src= {slide.url} alt='' width={100} height={20}  className=' pl-2 pt-2 ' />
    <h1  className=" font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900 font-sans w-80 ">{slide.title} </h1>
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

  :
  <motion.div
    className=" w-52 h-52 bg-slate-950 "
    initial={{ scale: 0 }}
    animate={{ scale: [1, 2, 2, 1, 1],
      rotate: [0, 0, 180, 180, 0],
      borderRadius: ["0%", "0%", "50%", "50%", "0%"]}}
    transition={{
      duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1
    }}
  ></motion.div>}
  </div>
</section>

<main className='w-full h-96  flex   items-center   justify-center  bg-[url("../images&svg/nero.jpg")]  '>
  <div className='flex flex-wrap flex-col'>
<h1 className=' text-center  font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900 font-sans text-xl	'> Найди конкретный проект нужный именно тебе </h1>
  <input
   className='  mx-8 w-80 rounded-lg  h-8  text-center  ' placeholder='Введите название проекта' type='search ' name='search' id='search'
  value={userSearch}  onChange={(e)=>{setUserSearch(e.target.value)
  }}
  ref={inputRef} // <--- ref grabs the input element 
/>
   </div>
   { 
        data == null ? null : 
        <div key={data.id}  className="w-2/4  h-full bg-white hover:bg-slate-300  rounded-lg   shadow-xl  ml-10"> 
        {
          data.content.rendered
        }
        <h1 className=' ml-ml-40'> Проект № {data.id}</h1> 
        <h1 className="text-red-950  text-center">{data.title.rendered}</h1> {/* Обратитесь к title как к строке, не как к элементу массива */} 
        <p className=' text-blue-600'>{data.content.rendered.replace(/(<(?!p\b)[^>]+>)|(\n)/g, '')}</p> 
      </div> 
        } 
        </main> 
   <footer className='w-full h-80  sm:block md:block '>
    <div className='w-full h-3/4  lg:flex xl:flex 2xl:flex'>
    <div className='   font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900 font-sans bg-stone-500 w-full  h-0.5/6   lg:w-1/3 lg:h-3/4 2xl:w-1/3 2xl:h-3/4 xl:w-1/3 xl:h-3/4  border-b-2 border-black'>
      <ul>
        <li className='text-2xl  px-10 2xl:text-center 2xl:px-0' >
          Мероприятия 
        </li>
        <li className='text-2xl  px-10  2xl:text-center 2xl:px-0' >
          Блог
        </li>
        <li className='text-2xl px-10 2xl:text-center 2xl:px-0' >
          Контакты
        </li>
      </ul>
    </div>
    <div className='  font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900 font-sans  bg-stone-500  w-full h-4.5/6   lg:w-1/3 lg:h-4/4 2xl:w-1/3 2xl:h-4/4 xl:w-1/3 xl:h-4/4 px-10 border-l-2 border-l-black border-4  border-r-2 border-r-black '>
      <h2 className=' text-2xl '>Об Академии </h2>
      <ul >
        <li >
        Достижения 
        </li>
        <li>
       Как поступить
        </li>
        <li>
          Сведения
        </li>
      </ul>
      <h2 className=' text-2xl'>Направления</h2>
      <ul >
        <li >
        Детско-Юношеский Технопарк
        </li>
        <li>
        Профессиональное обучение взрослых
        </li>
        <li>
        Дополнительное образование взрослых
        </li>
      </ul>
    </div>
    <div className='  bg-stone-500 w-full h-3.5/6   lg:w-1/3 lg:h-3/4 2xl:w-1/3 2xl:h-3/4 xl:w-1/3 xl:h-3/4   font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900 font-sans  pl-7 border-b-2 border-black '>
<h2 className=' text-2xl'>Приемная коммисия</h2>
<p className=''> 8 982 124 97 32</p>
<p className=' '> romanbelyh436@gmail.com</p>
<div className='flex pr-14 pb-4'>
  <Image src={ytlogo} width={50 } height={30} alt='youtube' >

  </Image>
  <Image src={vklogo} width={50 } height={30} alt='youtube' className='ml-2'>

</Image>
</div>
    </div>
    </div>
    <div className=' mx-0 inline-flex  mt-72 2xl:mt-5 xl:mt-5  sm:mt-56 lg:mt-12 md:mt-72 '>
    <Image src={kalashLogo} width={130 } height={10} alt='youtube' className='mr-mr-25'>

</Image>
<Image src={nintynine} width={100 } height={10} alt='youtube' className='mx-mx-25'>

</Image>
<Image src={izmashlogo} width={130 } height={10} alt='youtube' className=' mx-mx-25'>

</Image>
<Image src={verf} width={100 } height={30} alt='youtube' className=' mx-mx-25'>

</Image>


    </div>
   </footer>
</>
  )
}
