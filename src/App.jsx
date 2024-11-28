import "./App.css";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import ProfileCard from "./components/ProfileCard";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllUsers } from "./apis/user";

const Wrapper = styled.div`
    display: flex;
    padding: 50px 85px;
    flex-direction: column;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px; /* 텍스트와 아이콘 간격 */
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

const MypageButton = styled.button`
    display: flex; /* 아이콘과 텍스트를 나란히 배치 */
    align-items: center; /* 세로 가운데 정렬 */
    gap: 10px; /* 아이콘과 텍스트 간 간격 */
    padding: 10px 20px;
    background-color: #E8E9FF;
    color: #fff;
    font-size: 20px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-left: auto; /* 오른쪽 정렬 */
    &:hover {
        background-color: #BDC0FF;
    }
`;

const AvatarIcon = styled.img`
    width: 24px; /* 아이콘 크기 */
    height: 24px;
    border-radius: 50%; /* 원형으로 표시 */
`;

const TextWithBorder = styled.span`
    text-shadow: 
        -1px -1px 0 #BDAFFF,  /* 왼쪽 위 */
        1px -1px 0 #BDAFFF,   /* 오른쪽 위 */
        -1px 1px 0 #BDAFFF,   /* 왼쪽 아래 */
        1px 1px 0 #BDAFFF;    /* 오른쪽 아래 */
    color: #fff; /* 글자 색상 */
    font-weight: bold; /* 글자 굵기 */
    font-size: 20px; /* 글자 크기 */
`;

const SearchContainer = styled.div`
    position: relative;
    width: 100%;
    margin-top: 20px;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 10px 15px 10px 40px; /* 왼쪽 여백을 아이콘 공간만큼 확보 */
    font-size: 16px;
    border: 3px solid #ddd;
    border-radius: 25px;
    outline: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    &:focus {
        border-color: #8F94FF;
    }
`;

const SearchIcon = styled.img`
    position: absolute;
    left: 12px; /* 아이콘의 위치 조정 */
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    pointer-events: none; /* 아이콘이 클릭되지 않도록 설정 */
`;

const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    margin-top: 30px;
`;

function App() {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getAllUsers();
                setProfiles(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const filteredProfiles = profiles.filter((profile) =>
        profile.username.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <>
            <Navbar />
            <Wrapper>
                <TitleContainer>
                    <Icon src="/question-icon.svg" alt="Question Icon" />
                    <Title>누구에게 질문할까요?</Title>
                    <MypageButton onClick={() => navigate("/mypage")}>
                        <AvatarIcon src="/generic-avatar.svg" alt="Avatar Icon" />
                        <TextWithBorder>내 프로필</TextWithBorder>
                    </MypageButton>
                </TitleContainer>
                <SearchContainer>
                    <SearchIcon src="/search-icon.svg" alt="Search Icon" />
                    <SearchInput
                        type="text"
                        placeholder="이름을 입력해주세요."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </SearchContainer>
                <CardWrapper>
                    {filteredProfiles.map((profile) => (
                        <ProfileCard
                            key={profile.id}
                            id={profile.id}
                            name={profile.username}
                            bio={profile.bio}
                            questionCount={profile.receivedQuestionCount}
                            onClick={() =>
                                navigate("/question", {
                                    state: { user: profile },
                                })
                            }
                        />
                    ))}
                </CardWrapper>
            </Wrapper>
        </>
    );
}

export default App;