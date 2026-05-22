import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import API_URL from '../api';

function Read() {

    const [filme, setFilme] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${API_URL}/${id}`)
            .then(res => setFilme(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>

                <h3 className='mb-4'>🎬 Detalhes do Filme</h3>

                <div className='mb-2'>
                    <strong>ID:</strong> {filme.id}
                </div>
                <div className='mb-2'>
                    <strong>Nome:</strong> {filme.nome}
                </div>
                <div className='mb-2'>
                    <strong>Gênero:</strong> {filme.genero}
                </div>
                <div className='mb-4'>
                    <strong>Ano:</strong> {filme.ano}
                </div>

                <Link to='/' className='btn btn-secondary'>Cancelar</Link>

            </div>
        </div>
    );
}

export default Read;
