'use client'
import React from 'react'
import axios from 'axios'
import { useState,useEffect,useRef } from 'react'
import { data } from 'autoprefixer'
type Props = {}
interface UserData {
userSearch:string
}
const page = (props: Props) => {
  const [userSearch, setUserSearch] = useState("");

  // Holds a reference the current input field value
  const inputRef = useRef<HTMLInputElement>(null);
  
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
          .then((response):any=> {
            const post = response.data[0]
      console.log(response.data)
            console.log(data)
            const content = post.content.rendered;
            const imageUrlMatch = content.match(/src="([^"]+)"/); // Находим URL изображения
            const imageUrl = imageUrlMatch ? imageUrlMatch[1] : null; // Получаем URL изображения (если оно было найдено)
            
            // Удаляем HTML-теги, кроме <p>
            const strippedContent = content.replace(/(<(?!p\b)[^>]+>)|(\n)/g, '');
        
            console.log('URL изображения:', imageUrl);

            alert(imageUrl)
            alert(strippedContent)
            console.log('Текст без тегов:', strippedContent);
            // Execute next steps
          })
      }
    }, 500)
  
    // Every time the useEffect runs it creates a new setTimeout function
    // Returning this cleanup function will run before each new render and remove the old timer
    return () => {
      clearTimeout(timer)
    }  
  
  }, [userSearch, inputRef]);
  const getData = () =>{

  }
    const dataSearched = {
        userId: 32,
        id: 30,
       title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      body:' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, unde blanditiis dolor earum exercitationem commodi reprehenderit, consequuntur officia veritatis itaque quam beatae. Fuga deleniti asperiores dignissimos? Iusto animi nulla quibusdam?'
    }
  return (
    <>
    <main className='w-full h-96  flex   items-center   justify-center  bg-[url("../images&svg/nero.jpg")]  '>
  <div className='flex flex-wrap flex-col'>
<h1 className=' text-center  font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900 font-sans text-xl	'> Найди конкретный проект нужный именно тебе </h1>
  <input
   className='  mx-8 w-80 rounded-lg  h-8  text-center  ' placeholder='Введите название проекта' type='search ' name='search' id='search'
  value={userSearch}  onChange={(e)=>{setUserSearch(e.target.value)
  }}
  ref={inputRef} // <--- ref grabs the input element 
/>
<button onClick={getData}></button>
  

   </div>
    {
        dataSearched == null ? null :
          <div key={dataSearched.id}  className="  w-2/3 rounded-lg h-64 border-4 bg-gradient-to-r from-blue-500 to-blue-900 ">
            <h1>{dataSearched.userId}</h1>
            <h1  className=" text-red-950  w-32 ">{dataSearched.title} </h1>
            <p >{dataSearched.body}</p>
            </div>
        }
        </main>
        </>
  )
}

export default page