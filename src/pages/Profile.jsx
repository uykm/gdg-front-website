import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProfile } from "../apis/user";
import styled from "styled-components";
import QuestionSection from "../components/QNA/QuestionSection";
import AnswerSection from "../components/QNA/AnswerSection";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [activeMenu, setActiveMenu] = useState("질문");

    useEffect(() => {
        async function fetchData() {
            try {
                const profile = await getProfile();
                setProfile(profile);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <Wrapper>
                <UserProfile>
                    <Avatar src="/generic-avatar.svg" alt="User Avatar" />
                    <UserName>{profile?.username || "Unknown User"}</UserName>
                    <UserBio>{profile?.bio || "No bio available"}</UserBio>
                </UserProfile>
                <QNAContainer>
                    <Menu>
                        <MenuButton
                            active={activeMenu === "질문"}
                            onClick={() => setActiveMenu("질문")}
                        >
                            질문
                        </MenuButton>
                        <MenuButton
                            active={activeMenu === "답변"}
                            onClick={() => setActiveMenu("답변")}
                        >
                            답변
                        </MenuButton>
                    </Menu>
                    {activeMenu === "질문" ? (
                        <QuestionSection />
                    ) : (
                        <AnswerSection />
                    )}
                </QNAContainer>
            </Wrapper>
        </>
    );
}

export default Profile;

// Styled Components
const QNAContainer = styled.div``;

const Menu = styled.div`
    display: flex;
    justify-content: start;
    margin-bottom: 57px;
    gap: 16px;
`;

const MenuButton = styled.button`
    background-color: transparent;
    border: none;
    padding: 0 10px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    border-bottom: 2px solid transparent;

    ${(props) =>
        props.active && "color: #8F94FF; border-bottom: 2px solid #8F94FF;"}
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px 120px;
`;

const Avatar = styled.img`
    width: 129px;
    height: 129px;
    border-radius: 50%;
    margin-bottom: 15px;
`;

const UserName = styled.h2`
    font-size: 24px;
    color: #333;
`;

const UserBio = styled.p`
    font-size: 20px;
    color: #666;
`;

const UserProfile = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-bottom: 84px;
`;