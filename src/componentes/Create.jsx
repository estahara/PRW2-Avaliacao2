import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API_URL from '../api';

function Create() {

    const [values, setValues] = useState({
        nome:   '',
        genero: '',
        ano:    ''
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(API_URL, values)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>

                <h2 className='mb-4'>🎬 Adicionar Filme</h2>

                <form onSubmit={handleSubmit}>

                    <div className='mb-2'>
                        <label htmlFor='nome'>Nome:</label>
                        <input
                            type='text'
                            id='nome'
                            className='form-control'
                            placeholder='Digite o nome do filme'
                            onChange={e => setValues({ ...values, nome: e.target.value })}
                        />
                    </div>

                    <div className='mb-2'>
                        <label htmlFor='genero'>Gênero:</label>
                        <input
                            type='text'
                            id='genero'
                            className='form-control'
                            placeholder='Ex: Ação, Comédia, Drama...'
                            onChange={e => setValues({ ...values, genero: e.target.value })}
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='ano'>Ano:</label>
                        <input
                            type='text'
                            id='ano'
                            className='form-control'
                            placeholder='Ex: 2024'
                            onChange={e => setValues({ ...values, ano: e.target.value })}
                        />
                    </div>

                    <button type='submit' className='btn btn-success'>Criar</button>

                    <Link to='/' className='btn btn-secondary ms-3'>Cancelar</Link>

                </form>
            </div>
        </div>
    );
}

export default Create;
