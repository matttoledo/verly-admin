import { React, useState, useEffect } from 'react';
import { Link } from '../../components';
import Select from 'react-select'
import { productService } from '../../services/product.service';
import { useForm, Controller } from "react-hook-form";


export default Index;

function Index() { 
    const [products, setProducts] = useState(null);
    const [option, setOption] = useState({});
    
    const productTypeOptions = [
        { value: 'BOX', label: 'Box' },
        { value: 'JANELA', label: 'Janela' },
        { value: 'PORTA', label: 'Porta' },
        { value: 'BASCULA', label: 'Bascula' }

      ]

    useEffect(() => {
        productService.getAll().then(x => setProducts(x));
        setOption(productTypeOptions[0].value);
        console.log(products)
        
    }, []);


    function handleChange(e){
        setOption(e.value);
      };



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
            <Select className='d-inline-flex p-2' options={productTypeOptions} defaultValue={productTypeOptions[0].value} placeholder={"Filtrar Produto"} onChange={handleChange}/> 
        <div className="table-responsive-xl">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Categoria</th>
                            <th>Tipo</th>
                            <th>Folhas</th>
                            <th>Largura</th>
                            <th>Altura</th>
                            <th>Cor</th>
                            <th>Medida</th>
                            <th>Custo</th>
                            <th>Lucro</th>
                            <th>Kit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products
                        .filter((product)=> product?.type == option)
                        .map(product =>
                            <tr key={product.id}>
                                <td>{product.category}</td>
                                <td>{product.type}</td>
                                <td>{product.sheets}</td>
                                <td>{product.width+'cm'}</td>
                                <td>{product.height+'cm'}</td>
                                <td>{product.color}</td>
                                <td>{product.measure+'m²'}</td>
                                <td>{'R$ '+product.cost}</td>
                                <td>{'R$ '+product.profit}</td>
                                <td>{product.kit}</td>
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
                                    <div className="p-2">Nenhum produto encontrado</div>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}