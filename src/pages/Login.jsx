import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { login } from "../apis/user";

function LoginPage() {
    const navigate = useNavigate();
    const { setLogin, isLoggedIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    const handleLogin = async (event) => {
        event.preventDefault(); // 기본 동작 방지
        try {
            await login(email, password);
            alert("로그인 성공");
            setLogin();
        } catch (error) {
            alert("로그인 실패: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <LoginContainer>
            <LeftWrap>
                <Logo src="/logo.svg" alt="" />
                Welcome <br />
                Back!
            </LeftWrap>
            <SectionRight>
                <Title>
                    <Line1>GDG on Campus: Seoultech</Line1>
                </Title>
                <CustomLine />
                <SubTitle>LOGIN PAGE</SubTitle>
                <Form>
                    <InputGroup>
                        <Input
                            type="text"
                            placeholder="ID"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </InputGroup>
                    <ButtonGroup>
                        <Button onClick={handleLogin}>LOGIN</Button>
                        <Button onClick={() => navigate("/signup")}>
                            SIGN UP
                        </Button>
                    </ButtonGroup>
                </Form>
            </SectionRight>
        </LoginContainer>
    );
}

export default LoginPage;

// Styled Components
const LoginContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
`;


const LeftWrap = styled.div`
    flex: 0.7;
    background: linear-gradient(to bottom, #bdc0ff, #6285dd);
    display: flex;
    align-items: center;
    padding-left: 65px;
    color: white;
    font-size: 64px;
    font-weight: 900;
    line-height: 1.2;
    position: relative;
`;

const Logo = styled.img`
    position: absolute;
    top: 47px;
`;

const SectionRight = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 50px; /* LeftWrap의 폰트 크기 */
    font-weight: 900; /* 굵기 */
    line-height: 1.2; /* 줄 간격 */
    color: white; /* 글자 색상 */

    -webkit-text-stroke: 2px #A1A4EF; /* 경계 두께 */
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`;

const Line1 = styled.span`
    display: block;
    text-align: left;
    margin-left: 15px;
`;

// const Line2 = styled.span`
//     display: block;
//     text-align: right;
// `;

const CustomLine = styled.hr`
    border: none;
    border-top: 8px solid #e8e9ff;
    margin: 10px 0;
    margin-top: 20px;
    margin-bottom: 30px;
`;

const SubTitle = styled.h2`
    font-size: 36px;
    font-weight: bold;
    margin-left: 10px;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Input = styled.input`
    height: 50px;
    border: none;
    border-radius: 10px;
    padding: 0 15px;
    background-color: #f5f5f5;
    font-size: 16px;

    &::placeholder {
        color: #a0a0a0;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
`;

const Button = styled.button`
    height: 50px;
    flex: 1;
    border: none;
    border-radius: 10px;
    background-color: #D9DBFF;
    font-size: 20px; /* 텍스트 크기 */
    font-weight: bold; /* 텍스트 굵기 */
    color: white; /* 텍스트 색상 */
    cursor: pointer;

    &:hover {
        background-color: #bdc0ff;
    }
`;