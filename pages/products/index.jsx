import { useState, useEffect } from 'react';

import { Link } from '../../components';
import { productService } from '../../services/product.service';

export default Index;

function Index() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        productService.getAll().then(x => setProducts(x));
    }, []);

    function deleteProduct(id) {
        setProducts(products.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        customerService.delete(id).then(() => {
            setProducts(customers => customers.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Produtos</h1>
            <Link href="/products/add" className="btn btn-sm btn-success mb-2">Adicionar Produto</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Categoria</th>
                        <th style={{ width: '30%' }}>Tipo</th>
                        <th style={{ width: '30%' }}>Folhas</th>
                        <th style={{ width: '30%' }}>Largura</th>
                        <th style={{ width: '30%' }}>Altura</th>
                        <th style={{ width: '30%' }}>Cor</th>
                        <th style={{ width: '30%' }}>Medida</th>
                        <th style={{ width: '30%' }}>Custo</th>
                        <th style={{ width: '30%' }}>Lucro</th>
                        <th style={{ width: '30%' }}>Kit</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map(product =>
                        <tr key={product.id}>
                            <td>{product.category}</td>
                            <td>{product.type}</td>
                            <td>{product.sheets}</td>
                            <td>{product.width+'cm'}</td>
                            <td>{product.height+'cm'}</td>
                            <td>{product.color}</td>
                            <td>{product.measure}</td>
                            <td>{'R$ '+product.cost}</td>
                            <td>{'R$ '+product.profit}</td>
                            <td>{product.kit}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                {/* <Link href={`/product/edit/${product.id}`} className="btn btn-sm btn-primary mr-1">Editar</Link>
                                <button onClick={() => deleteProduct(product.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={product.isDeleting}>
                                    {product.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Deletar</span>
                                    }
                                </button> */}
                            </td>
                        </tr>
                    )}
                    {!products &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {products && !products.length &&
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