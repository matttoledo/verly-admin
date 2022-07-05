import { useState, useEffect } from 'react';

import { Link } from '../../components';
import { customerService } from '../../services';

export default Index;

function Index() {
    const [customers, setCustomers, searchTerm, setSearchTerm] = useState(null);

   


    useEffect(() => {
        customerService.getAll().then(x => setCustomers(x));
    }, []);



    function deleteUser(id) {
        setCustomers(customers.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        customerService.delete(id).then(() => {
            setCustomers(customers => customers.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Clientes</h1>
            <Link href="/customers/add" className="btn btn-sm btn-success mb-2">Adicionar Cliente</Link>
        
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Nome</th>
                        <th style={{ width: '30%' }}>Telefones</th>
                        <th style={{ width: '50%' }}>Endereço</th>
                    </tr>
                </thead>
                <tbody>
                    {customers && customers.map(user =>
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.phone.one} | {user.phone.two}</td>
                            <td>{user.address.logradouro}, {user.address.complemento}, {user.address.bairro}, {user.address.localidade}.</td>
                            <td>{user.defaulter}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/customers/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Editar</Link>
                                <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Deletar</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!customers &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {customers && !customers.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">Nenhum cliente encontrado</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}