import { useState, useEffect } from 'react'
import ProjectCard from './components/card'
import './App.css'

interface User {
  userId: number
  id: number
  title: string
  completed: boolean
}

interface Card {
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  imageUrl: string
}


export default function App () {
  const [estado, setEstado] = useState(0)
  const [loading, setLoading] = useState(false)
  const [respuesta, setRespuesta] = useState<User[]>([])
  const [changeData, setChangeData] = useState(false)

  const [card, setCard] = useState<Card>({
    title: 'Fantastic Project',
    description: 'Project that I made with React, TypeScript, Tailwind CSS, ESLint, and Prettier',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'ESLint', 'Prettier'],
    githubUrl: '',
    imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240307175325/React-Projects-with-Source-Code-%5B2024%5D.webp',
  })

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/')
      .then(response => response.json())
      .then(json => {
        console.log(json)
        setRespuesta(Array.isArray(json) ? json : [json])
        setLoading(false)
      })
  }, [loading])

  useEffect(() => {
    if (changeData) {
      setCard({
        title: 'Innovative Dashboard',
        description: 'A sleek and modern dashboard built with Next.js, TypeScript, Tailwind CSS, and Recharts for interactive data visualization.',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Node.js'],
        githubUrl: 'https://github.com/your-repo',
        imageUrl: 'https://www.interviewbit.com/blog/wp-content/uploads/2021/12/React-Projects.png',
      })
    } else{
      setCard({
        title: 'Fantastic Project',
        description: 'Project that I made with React, TypeScript, Tailwind CSS, ESLint, and Prettier',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'ESLint', 'Prettier'],
        githubUrl: '',
        imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240307175325/React-Projects-with-Source-Code-%5B2024%5D.webp',
      })
    }
    
  }, [changeData])

  return (
    <>
      <div className='flex flex-col items-center justify-center py-2'>
        <div>
          <ProjectCard 
            title={card.title}
            description={card.description}
            technologies={card.technologies}
            githubUrl={card.githubUrl}
            imageUrl={card.imageUrl}
          ></ProjectCard>
        </div>
          <button className=' rounded-xl bg-amber-400 p-4 mt-10 text-black font-semibold' onClick={() => setChangeData(!changeData)}>
              Cambiar Datos
          </button>
        {/* <p className='text-3xl'>Primera Prueba</p>
        <ExampleComponent Title='Fox Coding' Description='Así es chicos, estamos enviando props al componente de ejemplo :D' />
        <p className='text-3xl'>Segunda Prueba</p>
        <ExampleComponent Title='Fox Coding 2' Description='Tenemos una segunda prueba' /> */}
        {/* <div>
          <button className=' rounded-xl bg-amber-400 p-4' onClick={() => setEstado(estado + 1)}>
            <p className='text-xl text-black '>
              Si das clic aqui, el estado aumentará en 1
            </p>
          </button>
          <div className='mt-4'> 
            <p className='text-xl font-semibold'>El estado es: {estado}</p>
          </div>
          <div className='mt-4'> 
            <div className='text-xl font-semibold mb-6'>La respuesta es: {respuesta.map((item) => {
              return (
                <div key={item.id} className='border-2 border-black p-2 mt-2'>
                  <p>{item.userId}</p>
                  <p>{item.title}</p>
                  <p>{item.userId}</p>
                  <p>{item.id}</p>
                  <p>{item.completed ? 'Completado' : 'No completado'}</p>
                </div>
              )
            })}
            </div>
            <button className=' rounded-xl bg-amber-400 p-4' onClick={() => setLoading(!loading)}>
              <p className='text-xl text-black '>
                Recargar Datos
              </p>
            </button>
          </div>
        </div> */}
       </div>
    </>
  )
}
