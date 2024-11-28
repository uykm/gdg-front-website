import styled from 'styled-components'

const StyledButton = styled.button`
  padding: 15px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: #D9DBFF;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #bdc0ff;
  }
`

// 태그 사이에 쓰는 내용을 children으로 받아올 수 있습니다.
function Button({ children, onClick }) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>
}

export default Button
