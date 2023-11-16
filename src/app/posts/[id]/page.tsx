'use client'
import React from 'react'
import { FC } from 'react'
import { useEffect,useState,useRef } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
interface Props  {
    params:{id:string}
}


const page:FC<Props> = ({params}) => {
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
  useEffect(() => {
  
    // Debounce Effect
    // Code within the setTimeout runs every 0.5 seconds
    const timer = setTimeout(() => {
  
      // 1. The conditional checks the input's current value
      // 2. It compares it against the userSearch state
      // 3. If they match then the user has stopped typing and the API is ready to be called 
  
        const query = `http://localhost:10004/wp-json/wp/v2/posts/${params.id}`;
  
        axios.get(query)
          .then((response)=> {
            const post = response.data
            setData(post)
            console.log(post)
            if(data === undefined){
              return console.log('nothing finded')
            }
            else{
            return console.log('Content is null ')
            }
            // Execute next steps
          })
    }, )
    // Clean up effect
  },[])
  return (
<main className='w-full h-96  flex   items-center   justify-center  bg-[url("../images&svg/nero.jpg")]  '>
   { 
        data == null?null : 
        <div key={data.id}  className="w-2/3 rounded-lg h-full border-4 bg-gradient-to-b from-blue-500 to-teal-500 overflow-y-scroll"> 
        <h1 className=' font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-900 font-sans text-lg '> Проект № {data.id}</h1> 
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
  )
}
export default page