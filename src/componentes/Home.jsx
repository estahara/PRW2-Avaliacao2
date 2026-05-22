import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API_URL from '../api';

function Home() {

    const [filmes, setFilmes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(API_URL)
            .then(res => setFilmes(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className='d-flex flex-column justify-content-center
                        align-items-center bg-light min-vh-100 py-4'>

            <h1 className='mb-4'>🎬 Catálogo de Filmes</h1>

            <div className='w-75 rounded bg-white border shadow p-4'>

                <div className='d-flex justify-content-end gap-2 mb-3'>
                    <Link to='/create' className='btn btn-success'>+ Novo Filme</Link>
                    <Link to='/update' className='btn btn-primary'>✏️ Alterar</Link>
                    <Link to='/delete' className='btn btn-danger'>🗑️ Apagar</Link>
                </div>

                <table className='table table-striped table-hover'>
                    <thead className='table-dark'>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Ver detalhes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filmes.map((filme, i) => (
                            <tr key={i} style={{ cursor: 'pointer' }}>
                                <td>{filme.id}</td>
                                <td>{filme.nome}</td>
                                <td>
                                    <button
                                        onClick={() => navigate(`/read/${filme.id}`)}
                                        className='btn btn-sm btn-info'
                                    >
                                        Ver
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filmes.length === 0 && (
                            <tr>
                                <td colSpan={3} className='text-center text-muted'>
                                    Nenhum filme cadastrado ainda.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default Home;
