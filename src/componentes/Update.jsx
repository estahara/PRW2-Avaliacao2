import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API_URL from '../api';

function Update() {

    const [idBusca, setIdBusca] = useState('');

    const [values, setValues] = useState({
        nome:   '',
        genero: '',
        ano:    ''
    });

    const [etapa, setEtapa] = useState('busca');

    const navigate = useNavigate();

    const handleProcurar = () => {
        if (!idBusca) return;

        axios.get(`${API_URL}/${idBusca}`)
            .then(res => {
                setValues(res.data);
                setEtapa('formulario');
            })
            .catch(err => {
                console.log(err);
                setEtapa('naoAchou');
            });
    };

    const handleAlterar = (event) => {
        event.preventDefault();
        axios.put(`${API_URL}/${idBusca}`, values)
            .then(res => {
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    if (etapa === 'busca') {
        return (
            <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
                <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>

                    <h2 className='mb-4'>✏️ Alterar Filme</h2>
                    <p className='text-muted'>Digite o ID do filme que deseja alterar:</p>

                    <div className='mb-4'>
                        <label htmlFor='idBusca'>ID do Filme:</label>
                        <input
                            type='text'
                            id='idBusca'
                            className='form-control'
                            placeholder='Ex: 1'
                            value={idBusca}
                            onChange={e => setIdBusca(e.target.value)}
                        />
                    </div>

                    <button onClick={handleProcurar} className='btn btn-primary'>Procurar</button>
                    <Link to='/' className='btn btn-secondary ms-3'>Cancelar</Link>

                </div>
            </div>
        );
    }

    if (etapa === 'naoAchou') {
        return (
            <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
                <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded text-center'>

                    <h2 className='mb-3'>✏️ Alterar Filme</h2>
                    <div className='alert alert-warning'>
                        ⚠️ Filme com ID <strong>{idBusca}</strong> não encontrado.
                    </div>

                    <button onClick={() => setEtapa('busca')} className='btn btn-secondary'>
                        Voltar
                    </button>

                </div>
            </div>
        );
    }

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>

                <h2 className='mb-4'>✏️ Alterar Filme — ID: {idBusca}</h2>

                <form onSubmit={handleAlterar}>

                    <div className='mb-2'>
                        <label htmlFor='nome'>Nome:</label>
                        <input
                            type='text'
                            id='nome'
                            className='form-control'
                            value={values.nome}
                            onChange={e => setValues({ ...values, nome: e.target.value })}
                        />
                    </div>

                    <div className='mb-2'>
                        <label htmlFor='genero'>Gênero:</label>
                        <input
                            type='text'
                            id='genero'
                            className='form-control'
                            value={values.genero}
                            onChange={e => setValues({ ...values, genero: e.target.value })}
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='ano'>Ano:</label>
                        <input
                            type='text'
                            id='ano'
                            className='form-control'
                            value={values.ano}
                            onChange={e => setValues({ ...values, ano: e.target.value })}
                        />
                    </div>

                    <button type='submit' className='btn btn-primary'>Alterar</button>

                    <Link to='/' className='btn btn-secondary ms-3'>Cancelar</Link>

                </form>
            </div>
        </div>
    );
}

export default Update;
