import React, { useState, useEffect } from 'react'
import { Product } from '../types/product'
import { getAllProduct } from '../api/product'
import styled from 'styled-components'
import ErrorDisplay from './ErrorDisplay'

export type ProductSelectProps = {
  currentProductId?: number
  onProductSelect: (product: Product) => void
}

const Select = styled.select`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 12px;
  color: #888;
  font-size: 0.97rem;
  background: #fafbfc;
  outline: none;
  transition: border-color 0.2s;
  &:focus {
    border-color: #1976d2;
  }
`

const ProductSelect = ({
  currentProductId,
  onProductSelect,
}: ProductSelectProps) => {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      const result = await getAllProduct()
      if (result) {
        setProducts(result)
      }
    } catch (e) {
      console.error('fetchProducts error: ' + e)
      setError('An error occurred getting the data.')
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = parseInt(e.target.value, 10)

    const product = products?.find((p) => p.id === productId)
    if (product) {
      onProductSelect(product)
    }
  }

  return (
    <div>
      {error && <ErrorDisplay text={error} />}
      <Select value={currentProductId} onChange={handleSelect}>
        <option value="0" disabled>
          Item Name
        </option>
        {products &&
          products.map((products) => (
            <option key={products.id} value={products.id}>
              {products.name}
            </option>
          ))}
      </Select>
    </div>
  )
}

export default ProductSelect
