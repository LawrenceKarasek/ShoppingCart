import styled from 'styled-components'

const ArrowBarButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 8px;
  height: 1.8rem;

  &:hover {
    background: #f0f0f0;
  }
`

const Arrow = styled.span`
  font-size: 1.2rem;
  color: #bbb;
  font-family: inherit;
  margin-right: 3px;
`

const VerticalBar = styled.span`
  display: inline-block;
  width: 2px;
  height: 0.8em; /* Match the font-size of the arrow */
  background: #bbb;
  vertical-align: middle;
  /* Optional: center better with a transform */
  position: relative;
  top: 0.15em;
`

export type ArrowButtonProps = {
  onClick: () => void
}

const ArrowButton = ({ onClick }: ArrowButtonProps) => {
  return (
    <ArrowBarButton onClick={onClick}>
      <Arrow>&gt;</Arrow>
      <VerticalBar />
    </ArrowBarButton>
  )
}

export default ArrowButton
