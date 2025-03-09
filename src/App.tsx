import { useState, useEffect } from 'react'
import ProjectCard from './components/card'
import './App.css'


interface Card {
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  imageUrl: string
}


export default function App () {
  const [loading, setLoading] = useState(false)
  const [send, setSend] = useState(false)
  const [card, setCard] = useState<Card[]>([])
  const [needData, setNeedData] = useState('')

  //Todo esto de aqui es para el forms que tenemos
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technologiesString, settechnologiesString] = useState('');
  const [technologies, settechnologies] = useState<string[]>([]);
  const [githubUrl, setGithubUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/cards')
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (Array.isArray(json)) {
          setCard(json); 
        } else {
          setCard([json]); 
        }
      })
      .catch(error => console.error("Error al cargar datos:", error))
      .finally(() => setLoading(false)); 
  }, [loading, send]);

  const sendData = async () => {
    if (title === '' || description === '' || technologiesString === '' || githubUrl === '' || imageUrl === '') {
      console.log('Faltan datos');
      setNeedData('Faltan datos');
      return;
    }
  
    const technologiesArray = technologiesString.split(',').map(item => item.trim());
    settechnologies(technologiesArray);
  
    const rawResponse = await fetch('http://localhost:3000/cards', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, technologies: technologiesArray, githubUrl, imageUrl })
    });
  
    const content = await rawResponse.json();
    console.log(content);
    setSend(!send);
  };

  useEffect(() => {
    console.log(technologies)
  }, [technologies])


  return (
    <>
      <div className='flex flex-col items-center justify-center py-2'>
        <div className='flex flex-row flex-wrap w-5/5 justify-center items-center bg'>
          {card.map((item, index) => {
            return (
              <ProjectCard
                key={index}
                title={item.title}
                description={item.description}
                technologies={item.technologies}
                githubUrl={item.githubUrl}
                imageUrl={item.imageUrl}
                >
              </ProjectCard>
            )
          }
        )}
        </div>
          {/* <button className=' rounded-xl bg-amber-400 p-4 mt-10 text-black font-semibold' onClick={() => setChangeData(!changeData)}>
              Cambiar Datos
          </button> */}
          <div className='mt-10'>
            <p className='text-xl font-semibold'>
              Enviar nuevos datos
            </p>
          </div>
          <div>
            <p className='text-sm font-semibold text-red-500'>
              {needData}
            </p>
          </div>
          <div className=' space-y-5 flex flex-col mt-5'>
            <input 
              className=' bg-white rounded-md text-black' 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Title"
            />
            <input 
              className=' bg-white rounded-md text-black' 
              type="text" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Description"
            />
            <input 
              className=' bg-white rounded-md text-black' 
              type="text" 
              value={technologiesString} 
              onChange={(e) => settechnologiesString(e.target.value)} 
              placeholder="Technologies"
            />
            <input 
              className=' bg-white rounded-md text-black' 
              type="text" 
              value={githubUrl} 
              onChange={(e) => setGithubUrl(e.target.value)} 
              placeholder="GitHub URL"
            />
            <input 
              className=' bg-white rounded-md text-black' 
              type="text" 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)} 
              placeholder="Image URL"
            />
          </div>
        <button className=' rounded-xl bg-amber-400 p-4 mt-10 text-black font-semibold' onClick={() => sendData()}>
            Enviar Datos
        </button>
    
       </div>
    </>
  )
}
