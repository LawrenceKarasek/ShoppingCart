import styled from 'styled-components'

export const ErrorMessage = styled.div`
  color: #d32f2f; /* Material red or use 'red' */
  font-size: 1rem;
  margin: 8px 0;
  font-family: 'Dosis', 'Nunito', sans-serif;
`

export type ErrorDisplayProps = {
  text: string
}

const ErrorDisplay = ({ text }: ErrorDisplayProps) => {
  return <ErrorMessage>{text}</ErrorMessage>
}
export default ErrorDisplay
