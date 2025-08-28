import { product } from '@/data/product';
import ProdutctCard from './ProductCart';

const ProductList = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {product.map((item) => (
                <ProdutctCard key={item.id} product={item}/>
            ))}
        </div>
    )
}

export default ProductList