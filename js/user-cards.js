// 유저 카드를 생성하여 DOM에 추가하는 함수 (필터링 옵션 추가)
function renderUserCards(filteredUsers) {
    const userList = document.querySelector(".user-list");
    userList.innerHTML = ""; // user-list 초기화

    filteredUsers.forEach(user => {
        const userCard = document.createElement("article");
        userCard.className = "user-card";
        userCard.onclick = () => location.href = "ask_question.html";

        const userImage = document.createElement("img");
        userImage.src = "../assets/images/Generic avatar.svg";
        userImage.alt = "user-profile";
        userCard.appendChild(userImage);

        const userDescription = document.createElement("div");
        userDescription.className = "user-description";
        
        const userName = document.createElement("h1");
        userName.className = "name";
        userName.textContent = user.name;
        userDescription.appendChild(userName);

        const userIntro = document.createElement("span");
        userIntro.className = "introduction";
        userIntro.textContent = user.introduction;
        userDescription.appendChild(userIntro);

        userCard.appendChild(userDescription);

        const questionInfo = document.createElement("div");
        questionInfo.className = "question-info";
        
        const questionLabel = document.createElement("span");
        questionLabel.textContent = "💡 받은 질문";
        questionInfo.appendChild(questionLabel);

        const questionCount = document.createElement("span");
        questionCount.textContent = `${user.questionCount}개`;
        questionInfo.appendChild(questionCount);

        userCard.appendChild(questionInfo);

        userList.appendChild(userCard);
    });
}

// 이름 필터링 함수
function filterUsers(users) {
    const searchInput = document.querySelector(".search-input").value.toLowerCase();
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchInput));
    renderUserCards(filteredUsers);
}

// JSON 데이터를 가져와서 유저 목록 렌더링
function loadUserData() {
    fetch("../users.json")
        .then(response => response.json())
        .then(data => {
            renderUserCards(data); // 페이지 로드 시 전체 유저 목록 렌더링
            document.querySelector(".search-input").addEventListener("input", () => filterUsers(data)); // 검색 이벤트 추가
        })
        .catch(error => console.error("Failed to load user data:", error));
}

// 페이지 로드 시 JSON 데이터 불러오기
document.addEventListener("DOMContentLoaded", loadUserData);