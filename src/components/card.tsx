
interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  imageUrl: string;
}

export default function ProjectCard({title, description, technologies, githubUrl, imageUrl}: ProjectCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl">
      <img src={imageUrl} alt={title} className="w-full h-52 object-cover rounded-lg" />
      <h2 className="text-2xl font-bold mt-4 text-gray-800 text-center">{title}</h2>
      <p className="text-gray-600 mt-2 text-center">{description}</p>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700 text-center">Technologies:</h3>
        <div className="flex flex-wrap justify-center mt-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full m-1"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
}

