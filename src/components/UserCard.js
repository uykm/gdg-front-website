// src/components/UserCard.js
import React from "react";
import "../styles/UserCard.css"; // 스타일 파일 import

function UserCard({ user }) {
  return (
    <article
      className="user-card"
      onClick={() => (window.location.href = "ask_question.html")}
    >
      <img src="/assets/images/Generic avatar.svg" alt="user-profile" />
      <div className="user-description">
        <h1 className="name">{user.name}</h1>
        <span className="introduction">{user.introduction}</span>
      </div>
      <div className="question-info">
        <span>💡 받은 질문</span>
        <span>{`${user.questionCount}개`}</span>
      </div>
    </article>
  );
}

export default UserCard;