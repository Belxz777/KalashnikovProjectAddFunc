import React from 'react'

type Props = {}

const page = (props: Props) => {
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
<input  className='  mx-8 w-80 rounded-lg  h-8  text-center  ' placeholder='Введите название проекта' type='search ' name='search' id='search'/>
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