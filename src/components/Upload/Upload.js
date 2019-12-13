import React, { useState } from 'react'
import { api, Table } from '../'
import xlsx from 'xlsx';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="custom-file form-control">
          <input type="file" className="custom-file-input" id="customFile" onChange={e => handleChange(e)} />
          <label className="custom-file-label" for="customFile">Choose file</label>
        </div>

        <button type="submit">Enviar</button>
      </form>

      <Table htmlContent={htmlTable} />
    </div>
  )
}
