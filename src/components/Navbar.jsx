import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { logout } from "../apis/user";

const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #BDC0FF; /* 배경색을 BDC0FF로 변경 */
    color: #373737;
    box-shadow: 0 4px 6.6px rgba(0, 0, 0, 0.1);
`;

const Brand = styled.div`
    font-size: 1.5rem;
`;

const Menu = styled.ul`
    list-style: none;
    display: flex;
    gap: 40px;
`;

const MenuItem = styled.li`
    a {
        display: flex;
        align-items: center;
        color: #373737;
        font-weight: 1000;
        text-decoration: none;
        transition: color 0.3s;
        gap: 8px; /* 아이콘과 텍스트 간격 설정 */
        margin-right: 10px; /* 오른쪽 여백 추가 */
    }

    /* 로그아웃 아이콘 스타일 */
    .logout-icon {
        width: 30px; /* 로그아웃 아이콘 크기 */
        height: 24px;
    }

    &:not(:last-child) {
        margin-right: 10px; /* 각 버튼 사이 간격 */
    }
`;

function Navbar() {
    const { setLogout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            alert("로그아웃 성공");
        } catch (error) {
            alert("로그아웃 실패");
        }
        setLogout();
    };

    return (
        <NavbarContainer>
            <Brand>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                    <img src="/gdg-icon.svg" alt="GDG Icon" />
                </Link>
            </Brand>
            <Menu>
                <MenuItem>
                    <Link to="/login" onClick={handleLogout}>
                        <img
                            src="/logout-icon.svg"
                            alt="Logout Icon"
                            className="logout-icon"
                        />
                    </Link>
                </MenuItem>
            </Menu>
        </NavbarContainer>
    );
}

export default Navbar;
