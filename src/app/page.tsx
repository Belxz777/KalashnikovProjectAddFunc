'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState,useCallback,useEffect,useRef } from 'react'
import BurgerMenuIcon from '@/reusable/BurgerMenuLogo'
import CrossMenu from '@/reusable/Cross'
import Menu from '@/reusable/Menu'
import useEmblaCarousel, { EmblaOptionsType,EmblaCarouselType } from "embla-carousel-react"
import axios from 'axios'
import verf from '../images&svg/verf.png'
import izhmashlogo from  '../images&svg/izhmash.png'
import kalashLogo from '../images&svg/kalashLogo.png'
import nintynine from '../images&svg/99png.png'
import ytlogo from '../images&svg/yt.png'
import vklogo from '../images&svg/vk.png'
import Logo from '@/reusable/Logo'
import { DotButton,PrevButton,NextButton } from '@/reusable/Dots&Arrows'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Link from 'next/link'
interface IUser {
  userId: number,
  id:number,
  title: string,
  body:string
}
export default function Home() {
  const [animate, setanimate] = useState(false)
  const [slides, setSlides] = useState<Data[] | null >(null) 
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
  interface Data {
    id:number;
    title: {
      rendered:string
    }
    content: {
      rendered: string;
    };
  }
  const [data,setData] = useState<Post>() // типизация для поста
  // Holds a reference the current input field value  ссылка реф крч
  const inputRef = useRef(null);
  
    // Holds a reference the current input field value
    
    
  const options: EmblaOptionsType = { align:'start', containScroll: false  }
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const extractDate = (html: string) => {

    const blockquoteRegex = /<blockquote.*?>\s*<p>(.*?)<\/p>\s*<cite>(.*?)<\/cite>\s*<\/blockquote>/;
    const blockquoteMatch = html.match(blockquoteRegex);

  const blockquoteContentDate= blockquoteMatch ? blockquoteMatch[2] : "";


    return blockquoteContentDate
  };
  
  const extractMade = (html: string) => {

    const blockquoteRegex = /<blockquote.*?>\s*<p>(.*?)<\/p>\s*<cite>(.*?)<\/cite>\s*<\/blockquote>/;
    const blockquoteMatch = html.match(blockquoteRegex);

  const blockquoteContentMade = blockquoteMatch ? blockquoteMatch[1] : "";


    return blockquoteContentMade;
  };
  const extractImage = (html: string)=> {
    const imgRegex = /<img[^>]+src="([^">]+)"/;
  
    const imgMatch = html.match(imgRegex);
  
    const imageUrl:string | StaticImport = imgMatch ? imgMatch[1] : '';
  
    return  imageUrl;
  };
  const extractText = (html: string)=> {
    const textRegex = /<p>(.*?)<\/p>/;
  
    const textMatch = html.match(textRegex);
    const text = textMatch ? textMatch[1] : '';
  
    return text ;
  };
  const getPosts= ()=>{
    const id  = 3
    const query = `http://localhost:10004/wp-json/wp/v2/posts?categories=${id}`;
  
    axios.get(query)
      .then((response)=> {
        const post = response.data
        console.log(post)
        setSlides(post)
        console.log(slides)
        if(data === undefined){
          return console.log('nothing finded')
        }
        else{
        return console.log('Content is null ')
        }
        // Execute next steps
      })
  }
  useEffect (()=>{
getPosts()
  },[])
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
            const post = response.data[0]
            setData(post)
            if(data === undefined){
              return console.log('nothing finded')
            }
            else{
            return console.log('Content is null ')
            }
            // Execute next steps
          })
      }
    }, 500)
    // Clean up effect
  },[userSearch])

//завтра реализвать https://jsonplaceholder.typicode.com/posts
  return (
    < >
<header className=' bg-white w-full  h-24 flex justify-start   border-b-4' >
<Image
alt= ' '
width= {90}
height={40}
 src='https://i.pinimg.com/originals/7b/07/62/7b0762f25df8d3cf66c8c1c21b0c712c.png'
 className=' pl-1 pt-1 select-none '>

</Image>
<Link   href= '/'className=' text-xl pt-5 font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900 font-sans'>академия <br/> калашников </Link>
<button onClick={()=>{setanimate(!animate)}} className= ' pl-pl-35 sm:pl-pl-40  lg:pl-pl-60  xl:pl-pl-70  md:pl-pl-70   '>{animate===true ? <CrossMenu/>  : <BurgerMenuIcon/>}</button>
</header>
<section className=' w-full  bg-[url("../images&svg/nero.jpg")]   '> 
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

    <div className='text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900 font-sans '>
      Лучшие проекты
    </div>
    <div className=' w-[150rem]  pb-6 pt-6 pr-6  pl-6'>
    {/*начало блоков карусели */}
    {slides === null ? null :
  <div ref={emblaRef} className='w-full '>
    <div  className=" gap-x-12 transform  rotate-x-45  rotate-y-45  pl-10   flex w-full" >
  {slides.map((slide) => (
  <div key={slide.id}  className= " w-full  h-64 bg-white hover:bg-slate-300  rounded-lg   shadow-xl  overflow-y-scroll">
    <Link href={`http://localhost:3000/projects/${ slide.id}`}  className='font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-900 font-sans text-xl' > Проект № {slide.id}</Link>
    <Link  href={'/posts/${ slide.id}'} className='font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-900 to-gray-900 font-sans text-xl'>{slide.title.rendered}</Link>
    <Image src={extractImage(slide.content.rendered)} alt='' width={100} height={30} className=' float-right  pt-2 pr-8  rounded-xl'/>
    <p>{extractText(slide.content.rendered)}</p>
    <blockquote  className='p-4 my-4  bg-gradient-to-t from-blue-500 to-teal-500  border-l-4  border-blue-900 '>
        <p className='text-white'>
          {extractMade(slide.content.rendered)}
        </p>
        <p className='text-white'>
          {extractDate(slide.content.rendered)}
        </p>
      </blockquote>
    </div>
        ))}
            </div>
  </div>

}
  </div>
</section>

<main className='w-full h-screen  flex-wrap overflow-hidden  items-center   justify-center  bg-[url("../images&svg/nero.jpg")] lg:flex xl:flex 2xl:flex   '>
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
        data == null?null : 
        <div key={data.id}  className="w-2/3 h-2/4  rounded-xl border-4 bg-gradient-to-b from-blue-500 to-teal-500 overflow-y-scroll items-center"> 
        <Link href={`http://localhost:3000/projects/${ data.id}`}  className=' font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-900 font-sans text-lg '> Проект № {data.id}</Link> 
        <Image src= {extractImage(data.content.rendered)} alt='' width={200} height={100}  className=' float-right  pt-2 pr-8  rounded-xl' />
        <h1 className='font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-900 font-sans text-xl'>{data.title.rendered}</h1> {/* Обратитесь к title как к строке, не как к элементу массива */} 
      <p className='text-white'> {extractText(data.content.rendered)}</p>
      <blockquote  className='p-4 my-4  bg-gradient-to-t from-blue-500 to-teal-500  border-l-4  border-blue-900 '>
        <p className='text-white'>
          {extractMade(data.content.rendered)}
        </p>
        <p className='text-white'>
          {extractDate(data.content.rendered)}
        </p>
      </blockquote>
      </div> 
        } 
        </main> 
   <footer className='w-full h-80  sm:block md:block  '>
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
    <div className=' mx-0 inline-flex  mt-72 2xl:mt-5 xl:mt-5  sm:mt-56 lg:mt-12 md:mt-72 w-full '>
    <Image src={kalashLogo} width={130 } height={10} alt='youtube' className='mr-mr-25'>

</Image>
<Image src={nintynine} width={100 } height={10} alt='youtube' className='mx-mx-25'>

</Image>
<Image src={izhmashlogo} width={130 } height={10} alt='youtube' className=' mx-mx-25'>

</Image>
<Image src={verf} width={100 } height={30} alt='youtube' className=' mx-mx-25'>

</Image>


    </div>
   </footer>
</>
  )
}
