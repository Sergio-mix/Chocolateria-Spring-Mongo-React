import React from 'react';

const Table = (props)=>{
  
    return (
        <table className="table">
    <thead>
       <tr>
        {props.columns.map((col, index)=>(
          <th key={index} scope="col" >{col.column}</th>
        ))}
        <th scope="col" >Opciones</th>
      </tr>
    </thead>
    <tbody>
       {
           props.data.length > 0 && props.data.map((item, index)=>(
            <tr key={index}>
              {props.columns.map((col, index)=>(
                <td key={index} >{item[col.value]}</td>
              ))}

              <td>  
              {props.onEdit && (<button onClick={ ev => props.onEdit(item)} className="btn btn-warning">Editar</button>)} 
              {props.onDelete && (<button onClick={ ev => props.onDelete(item)} className="btn btn-danger">Eliminar</button>)}
              </td>
            </tr>
           ))
       } 

    </tbody>
  </table>)
}

export default Table;