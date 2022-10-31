import { useEffect, useState } from "react"


const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes == 0) return '0 Byte'
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}

export default () => {

  const [ files, setFiles ] = useState([])

  useEffect(() => {
    fetch('/api/v1/fs')
      .then(res => res.json())
      .then(data => setFiles(data))
  }, [])

  return (
    <main>
      <h1>Files</h1>
      <ul>
        {files.map(file => (
          <li key={file.name}>
            {file.name} {file.isDirectory ? " > " : bytesToSize(file.size)}
          </li>
        ))}
      </ul>
    </main>
  )
}