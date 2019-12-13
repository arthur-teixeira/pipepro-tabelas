import React from 'react';

const Table = props => {

  const createTable = () => {
    return { __html: props.htmlContent }
  }

  return (
    <div dangerouslySetInnerHTML={createTable()}>

    </div>
  );
}

export default Table;
