import React, {useState} from 'react';

const UserForm = (props)=>{
    const initialUserState = {
        id:null,
        nombre:  "",
        apellido:  "",
        direccion:  "",
        edad:  "",
        sexo: ""

    };

    const [formState, setFormState] = useState(initialUserState);

    React.useEffect(()=>{
        setFormState(props.user);
    },[props.user])

    const handleInputChange = (ev)=>{
        ev.preventDefault();
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        setFormState({...formState, [name]:value})
    }

    const handleSubmit = (ev)=>{
        ev.preventDefault();
        if(props.user && formState.id !== null){
            props.edit(formState)
        }else{
            props.add(formState);
        }

        setFormState(initialUserState);
    }


    return (<form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input type="text" className="form-control" id="nombre" name="nombre" value={formState.nombre} onChange={handleInputChange}/>
        </div>
        <div className="col-md-6">
            <label htmlFor ="apellido" className="form-label">Apellido</label>
            <input type="text" className="form-control" id="apellido" name="apellido" value={formState.apellido} onChange={handleInputChange}/>
        </div>
        <div className="col-12">
            <label htmlFor="direccion" className="form-label">Dirección</label>
            <input type="text" className="form-control" id="direccion" name="direccion" value={formState.direccion} onChange={handleInputChange}/>
        </div>

        <div className="col-md-6">
            <label htmlFor="inputCity" className="form-label">Edad</label>
            <input type="text" className="form-control" id="edad" name="edad" value={formState.edad} onChange={handleInputChange}/>
        </div>
        <div className="col-md-4">
            <label htmlFor="sexo" className="form-label">Sexo</label>
            <select id="sexo" name="sexo" className="form-select" value={formState.sexo} onChange={handleInputChange}>
                <option >Selecciona una opción...</option>
                <option value="mujer">Mujer</option>
                <option value="hombre">Hombre</option>
            </select>
        </div>

        <div className="col-12">
            <button type="submit" className="btn btn-primary">Agregar</button>
        </div>
    </form>);
}

export default UserForm;