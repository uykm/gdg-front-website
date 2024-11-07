import React from "react";
import "../styles/LoginPage.css"; // LoginPage 관련 스타일을 연결

function LoginPage() {
  return (
    <div className="login-container">
      <div className="section-left">
        <div className="left-text">GDG COMMUNITY</div>
      </div>

      <div className="section-right">
        <h1 className="highlighted-title">
          <span className="line-1">GDG on Campus</span>
          <span className="line-2">: Seoultech</span>
        </h1>
        <hr className="custom-line" />

        <h2>LOGIN PAGE</h2>

        {/* 로그인 폼 */}
        <form action="main.html" method="get">
          <div className="input-group">
            <label className="sr-only" htmlFor="id"></label>
            <input type="text" id="id" name="id" placeholder="ID" required />

            <label className="sr-only" htmlFor="password"></label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>

          <div className="button-group">
            <button type="submit">로그인</button>
            <button
              type="button"
              onClick={() => (window.location.href = "signup.html")}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;