import styled from "styled-components";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const QNACard = ({ userId, username, content, received, answer, questionId }) => {
    const navigate = useNavigate();

    const handleAnswer = () => {
        navigate("/answer", {
            state: { user: { id: userId }, questionId: questionId },
        });
    };

    return (
        <CardContainer>
            <UserInfo>
                <Avatar src="/generic-avatar.svg" alt="User Avatar" />
                <CardUserName>{username || "Unknown User"}</CardUserName>
            </UserInfo>
            <RightSection>
                <CardContent>{content}</CardContent>
                {answer === null && received && (
                    <Button onClick={handleAnswer}>답변하기</Button>
                )}
            </RightSection>
        </CardContainer>
    );
};

export default QNACard;

// Styled Components
const CardContainer = styled.div`
    display: flex;
    padding: 15px 16px;
    border-radius: 16px;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Avatar = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
`;

const CardContent = styled.div`
    margin-left: 40px;
    font-size: 20px;
    color: #454545;
    font-weight: 300;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`;

const CardUserName = styled.h3`
    font-size: 20px;
`;

const RightSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    width: 100%;
`;