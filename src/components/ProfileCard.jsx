import React from "react";
import styled from "styled-components";

const ProfileCard = ({ id, name, bio, questionCount, onClick }) => {
    return (
        <CardContainer onClick={onClick}>
            <Avatar src="/generic-avatar.svg" alt="User Avatar" />
            <UserInfo>
                <UserName>{name || "Unknown User"}</UserName>
                <UserBio>{bio || "No bio available"}</UserBio>
                <QuestionCount>
                    💡 받은 질문 {questionCount || 0}개
                </QuestionCount>
            </UserInfo>
        </CardContainer>
    );
};

export default ProfileCard;

// Styled Components
const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px 16px;
    border-radius: 16px;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s, background-color 0.3s;

    &:hover {
        transform: scale(1.05); /* 확대 효과 */
        transform-origin: center; /* 확대 중심 */
        background-color: #c2c5ff; /* 배경색 변경 */
    }

    &:hover h2, /* UserName */
    &:hover p { /* UserBio, QuestionCount */
        color: #ffffff; /* 텍스트 색상 변경 */
    }
`;

const Avatar = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const UserName = styled.h2`
    font-size: 20px;
    color: #333;
    margin: 0;
    transition: color 0.3s; /* 텍스트 색상 애니메이션 */
`;

const UserBio = styled.p`
    font-size: 14px;
    color: #666;
    margin: 10px 0;
    transition: color 0.3s; /* 텍스트 색상 애니메이션 */
`;

const QuestionCount = styled.p`
    font-size: 14px;
    color: #999;
    transition: color 0.3s; /* 텍스트 색상 애니메이션 */
`;