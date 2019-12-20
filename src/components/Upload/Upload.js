import React, { useState } from 'react'
import { api, Table } from '../'
import xlsx from 'xlsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './upload.module.css'

export default function Upload() {

  const [file, setFile] = useState();
  const [htmlTable, setHtmlTable] = useState();

  const handleSubmit = async () => {

    const data = new FormData();
    data.append('table', file);

    try {
      await api.post('/upload', data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = e => {
    if (!e.target.files[0]) return;

    setFile(e.target.files[0]);
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);

    reader.onload = e => {
      const data = new Uint8Array(reader.result);
      const wb = xlsx.read(data, { type: 'array' });

      const htmlstr = xlsx.write(wb, { type: 'binary', bookType: 'html' });
      setHtmlTable(htmlstr);

      handleSubmit();

    }
  }

  return (
    <div className={styles.container}>
      <form>
        <div className="custom-file form-control">
          <input type="file" className="custom-file-input" id="customFile" onChange={e => handleChange(e)} />
          <label className="custom-file-label" htmlFor="customFile">Escolha um arquivo</label>
        </div>
      </form>

      <Table htmlContent={htmlTable} />
    </div>
  )
}
