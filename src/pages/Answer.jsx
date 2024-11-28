import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { createAnswer } from "../apis/qna";
import { getUser } from "../apis/user";

function Answer() {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, questionId } = location.state || {};
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await getUser(user.id);
                setUserInfo(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserInfo();
    }, [user.id]);

    const [content, setContent] = useState("");

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    if (!user) {
        return <div>유저 정보가 없습니다.</div>;
    }

    const handleSubmit = async () => {
        try {
            console.log(questionId, content);

            await createAnswer({ questionId, content });
            alert("답변을 성공적으로 작성했습니다.");
            navigate("/");
        } catch {
            alert("답변을 작성하는 데 실패했습니다.");
        }
    };

    return (
        <>
            <Navbar />
            <Wrapper>
                <TitleContainer>
                    <Icon src="/reply-icon.svg" alt="Question Icon" />
                    <Title>답변할게요!</Title>
                </TitleContainer>
                <CardContainer>
                    <Avatar src="/generic-avatar.svg" alt="User Avatar" />
                    <UserInfo>
                        <UserName>{userInfo.username || "Unknown User"}</UserName>
                        <UserBio>{userInfo.bio || "No bio available"}</UserBio>
                    </UserInfo>
                </CardContainer>
                <QuestionArea onChange={(e) => setContent(e.target.value)} />
                <Button
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    답변하기
                </Button>
            </Wrapper>
        </>
    );
}

export default Answer;

// Styled Components
const Wrapper = styled.div`
    display: flex;
    padding: 50px 85px;
    flex-direction: column;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Title = styled.div`
    font-size: 32px;
    color: #454545;
    font-weight: 700;
`;

const Icon = styled.img`
    width: 40px;
    height: 40px;
`;


const CardContainer = styled.div`
    display: flex;
    padding: 15px 16px;
    border-radius: 16px;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    margin-top: 42px;
    margin-bottom: 26px;
`;

const Avatar = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
`;

const UserName = styled.h2`
    font-size: 20px;
    color: #333;
`;

const UserBio = styled.p`
    font-size: 14px;
    color: #666;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    justify-content: center;
    gap: 5px;
`;

const QuestionArea = styled.textarea`
    resize: none;
    border-radius: 16px;
    height: 309px;
    border: 1px solid #a0a0a0;
    padding: 31px 27px;
    margin-bottom: 42px;

    &:focus {
        outline: none;
    }
`;