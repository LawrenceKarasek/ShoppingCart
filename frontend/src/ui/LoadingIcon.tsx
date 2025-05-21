import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  100% { transform: rotate(360deg); }
`

const SpinnerWrapper = styled.div`
  width: 100vw;
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Spinner = styled.div`
  border: 6px solid #e3eaf3;
  border-top: 6px solid #1976d2;
  border-radius: 50%;
  width: 54px;
  height: 54px;
  animation: ${spin} 1s linear infinite;
`

const LoadingIcon = () => {
  return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  )
}

export default LoadingIcon
