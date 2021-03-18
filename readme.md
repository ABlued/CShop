# C(clothes)Shop 미니 프로젝트

##### 안녕하세요 웹뿌링클치킨이 아니라 웹뿌론트엔드가 되고싶은 삐약삐약 주니어치킨개발자 ABlued입니다!

html, css, 바닐라JS로 만든 미니 프로젝트 CShop에 대해 소개해드리겠습니다.
  
  
프로젝트 개요
---

프로젝트 목적 : css, js에서 새롭게 배운 개념들을 활용하고 JSON 파일 데이터를 비동기적으로 받아오기  
참여자 : ABlued  
사용 스택 : HTML, CSS, JavaScript  
작업 환경 : VSCode  
  
    
주로 쓰인 개념들 
---

+ CSS
    + var 변수 활용, hover&transform, flex

+ JavaScript
    + DOM, Promise, Json 데이터 받아오기




### 중요 코드 로직

##### JSON 데이터 수신 함수 구현부
```
//JSON 파일에 있는 데이터를 받아오는 함수
function loadItems(){
    return fetch('data/data.json')     //이 경로안에 있는 데이터를 받아온다
    .then(response => response.json())        //패치가 완료되면 response라는 객체를 전달받게 되고 json으로 변환.
    .then(json => json.items);          //json안에 있는 items를 반환받는다.
}
//JSON에서 받아온 데이터를 출력하는 함수
function displayItems(itmes){
    const container = document.querySelector('.items');
    // container.innerHTML = itmes.map(item => createHTMLString(item)).join('');       //받아온 것들을 문자열로 만들고 join으로 나눈다
    while(container.hasChildNodes()){       // 이미 화면에 나타난 상품이 있을 경우
        container.removeChild(container.firstChild);        // 첫번째 자식을 지워 삭제한다
    }
    itmes.map(item => createHTMLElement(item));     // 모두 삭제한 후 조건에 맞는 상품들을 다시 표시한다.

```

##### JSON 데이터 수신 함수 선언부
```
loadItems()
.then(items => {
    displayItems(items);
    setEventListeners(items)
})
.catch(console.log);
```
  
작동 방식
---

