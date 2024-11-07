// src/components/MainPage.js
import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import "../styles/MainPage.css"; // 스타일 파일 import

function MainPage() {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // JSON 데이터를 가져오는 함수
  // MainPage.js
  useEffect(() => {
    fetch("https://api-test-gdsc-22b48e20369e.herokuapp.com/api/data")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Failed to load user data:", error));
  }, []);

  // 필터링된 유저 목록
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="main-container">
      <header>
        <div className="section-top">
          <div className="top-text">GDG COMMUNITY</div>
        </div>
      </header>
      <main>
        <section className="question-section">
          <div className="section-header">
            <h2>🙋🏻 누구에게 질문할까요?</h2>
            <div className="right-section">
              <button
                className="my-page-button"
                onClick={() => (window.location.href = "mypage.html")}
              >
                <img
                  src="/assets/images/Generic avatar.svg"
                  alt="Avatar"
                  className="avatar"
                />
                <h3 className="highlighted-text">
                  <span>MY PAGE</span>
                </h3>
              </button>
              <div className="input-container">
                <img
                  src="/assets/images/search-icon.svg"
                  alt="Search Icon"
                  className="search-icon"
                />
                <input
                  type="text"
                  className="search-input"
                  placeholder="이름을 입력해주세요."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="user-list">
            {filteredUsers.map((user) => (
              <UserCard key={user.name} user={user} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default MainPage;