import styled from 'styled-components'

const CheckboxWrapper = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 8px;
  width: 18px;
  height: 18px;
  accent-color: #1976d2;
  display: inline-block;
`

const LabelText = styled.span`
  user-select: none;
  color: #888;
  font-size: 0.97rem;
`

export type CustomCheckboxProps<T extends boolean | number> = {
  labelText: string
  checked: boolean
  onCheckboxSelect: (value: T) => void
  setCheckedValue: T
}

export function CustomCheckbox<T extends boolean | number>({
  labelText,
  checked,
  onCheckboxSelect,
  setCheckedValue,
}: CustomCheckboxProps<T>) {
  return (
    <CheckboxWrapper>
      <Checkbox
        checked={checked}
        onChange={() => onCheckboxSelect(setCheckedValue)}
      />
      <LabelText>{labelText}</LabelText>
    </CheckboxWrapper>
  )
}

export default CustomCheckbox
