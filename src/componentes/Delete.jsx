import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API_URL from '../api';

function Delete() {

    const [idBusca, setIdBusca] = useState('');

    const [filme, setFilme] = useState({});

    const [etapa, setEtapa] = useState('busca');

    const navigate = useNavigate();

    const handleProcurar = () => {
        if (!idBusca) return;

        axios.get(`${API_URL}/${idBusca}`)
            .then(res => {
                setFilme(res.data);
                setEtapa('confirmar');
            })
            .catch(err => {
                console.log(err);
                setEtapa('naoAchou');
            });
    };

    const handleApagar = () => {
        axios.delete(`${API_URL}/${idBusca}`)
            .then(() => {
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    if (etapa === 'busca') {
        return (
            <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
                <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>

                    <h2 className='mb-4'>🗑️ Apagar Filme</h2>
                    <p className='text-muted'>Digite o ID do filme que deseja apagar:</p>

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

                    <button onClick={handleProcurar} className='btn btn-danger'>Procurar</button>
                    <Link to='/' className='btn btn-secondary ms-3'>Cancelar</Link>

                </div>
            </div>
        );
    }

    if (etapa === 'naoAchou') {
        return (
            <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
                <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded text-center'>

                    <h2 className='mb-3'>🗑️ Apagar Filme</h2>
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

                <h2 className='mb-4'>🗑️ Apagar Filme</h2>

                <div className='alert alert-danger'>
                    ⚠️ Tem certeza que deseja apagar o filme abaixo?
                </div>

                <div className='mb-2'><strong>ID:</strong> {filme.id}</div>
                <div className='mb-2'><strong>Nome:</strong> {filme.nome}</div>
                <div className='mb-2'><strong>Gênero:</strong> {filme.genero}</div>
                <div className='mb-4'><strong>Ano:</strong> {filme.ano}</div>

                <button onClick={handleApagar} className='btn btn-danger'>Apagar</button>

                <Link to='/' className='btn btn-secondary ms-3'>Cancelar</Link>

            </div>
        </div>
    );
}

export default Delete;
