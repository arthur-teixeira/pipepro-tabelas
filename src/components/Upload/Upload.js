import React, { useState } from 'react'
import { api } from '../'
import xlsx from 'xlsx';

export default function Upload() {

  const [file, setFile] = useState();
  const [htmlTable, setHtmlTable] = useState();

  const handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();
    data.append('table', file);

    try {
      await api.post('/upload', data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = e => {
    setFile(e.target.files[0]);
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);

    reader.onload = e => {
      const data = new Uint8Array(reader.result);
      const wb = xlsx.read(data, { type: 'array' });

      const htmlstr = xlsx.write(wb, { type: 'binary', bookType: 'html' });
      setHtmlTable(htmlstr);

    }
  }

  const createTable = () => {
    return { __html: htmlTable }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" onChange={e => handleChange(e)} />
      <button type="submit">Enviar</button>
      <div dangerouslySetInnerHTML={createTable()}></div>
    </form>
  )
}
