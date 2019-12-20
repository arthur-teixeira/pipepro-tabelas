import React from 'react';
import styles from './table.module.css'

const Table = props => {

  const createTable = () => {
    return { __html: props.htmlContent }
  }

  return (
    <div dangerouslySetInnerHTML={createTable()} className={styles.tableParent} />
  );
}

export default Table;
