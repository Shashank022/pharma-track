import React from 'react';

interface ProductProps {
    productNdc?: string[];
    substanceName?: string[];
    pharmClassEpc?: string[];
}

const Products: React.FC<ProductProps> = ({ productNdc, substanceName, pharmClassEpc }) => {
    return (
        <div className="products-container">
            <h4>Products</h4>
            <p><strong>Product NDC:</strong> {productNdc?.join(', ') || 'N/A'}</p>
            <p><strong>Substance Name:</strong> {substanceName?.join(', ') || 'N/A'}</p>
            <p><strong>Pharmaceutical Class EPC:</strong> {pharmClassEpc?.join(', ') || 'N/A'}</p>
        </div>
    );
};

export default Products;