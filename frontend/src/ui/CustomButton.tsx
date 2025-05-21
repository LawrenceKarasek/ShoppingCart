import styled from 'styled-components'

const CustomButtonDiv = styled.button`
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 2px;
  padding: 8px 20px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-family: 'Dosis', 'Nunito', sans-serif;

  &:hover {
    background: #1565c0;
  }
`

const CancelButtonDiv = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 1rem;
  cursor: pointer;
  padding: 8px 16px;
  &:hover {
    text-decoration: underline;
  }
`

export type CustomButtonProps = {
  onClick?: () => void
  isSubmit?: boolean
  text: string
  isCancel?: boolean
}

const CustomButton = ({
  isCancel,
  text,
  isSubmit,
  onClick,
}: CustomButtonProps) => {
  return (
    <>
      {isCancel ? (
        <CancelButtonDiv onClick={onClick}>{text}</CancelButtonDiv>
      ) : (
        <CustomButtonDiv
          type={isSubmit ? 'submit' : 'button'}
          onClick={onClick}
        >
          {text}
        </CustomButtonDiv>
      )}
    </>
  )
}

export default CustomButton
