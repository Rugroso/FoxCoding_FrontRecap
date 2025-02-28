interface exampleComponentProps {
  Title: string
  Description: string
}
export default function ExampleComponent({ Title, Description }: exampleComponentProps) {
  return (
    <>
      <div className='flex flex-col items-center justify-center py-2'>
        <h1>{Title}</h1>
        <p>{Description}</p>
       </div>
    </>
  )
}

