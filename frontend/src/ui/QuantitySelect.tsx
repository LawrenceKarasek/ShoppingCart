import React from 'react'
import styled from 'styled-components'

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

export type QuantitySelectProps = {
  totalDefault?: number
  currentQuantity?: number
  onQuantitySelect: (quantity: number) => void
  disabled?: boolean
}

const QuantitySelect = ({
  totalDefault = 3,
  currentQuantity = 0,
  onQuantitySelect,
  disabled = true,
}: QuantitySelectProps) => {
  const options = []
  for (let i = 1; i <= totalDefault; i++) {
    options.push({
      key: i,
      value: i,
      name: `${i}`,
    })
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = parseInt(e.target.value, 10)
    onQuantitySelect(quantity)
  }

  return (
    <Select onChange={handleSelect} disabled={disabled} value={currentQuantity}>
      <option value="0" disabled>
        How many?
      </option>
      {options.map((option) => (
        <option key={option.key} value={option.value}>
          {option.name}
        </option>
      ))}
    </Select>
  )
}

export default QuantitySelect
