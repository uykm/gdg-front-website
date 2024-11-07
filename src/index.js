import React from "react";
import ReactDOM from "react-dom/client"; // "react-dom/client"에서 createRoot 가져오기
import "./index.css"; // 전역 스타일
import App from "./App";

// createRoot를 사용하여 앱 렌더링
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App /> {/* App 컴포넌트를 기본으로 렌더링 */}
  </React.StrictMode>
);