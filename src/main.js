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
}
//JSON에서 받아온 데이터를 문자열로 변환하는 함수
// function createHTMLString(item){
    //     return `
    //     <li onclick="displayDetail()" onmouseout="hiddenDetail()" class="item">
    //     <img src="${item.image}" alt="${item.type}" class="item__thumbnail"/>
    //     <span class="item__description">${item.gender}, ${item.size}</span>
    //     <div class="item__detail" style="display: none;">
    //         <span class="item__detail__element">길이 : ${item.length} 소재 : ${item.Material} 별점: ${item.TotalScore}</span>
    //         <span class="item__detail__element">설명 : ${item.comment}</span>
    //     </div>
    //   </li>
    //   `;// onmouseenter="displayDetail()" onmouseout="hiddenDetail()"
// }

//JSON에서 받아온 데이터를 기반으로 HTMLElement를 생성하는 함수
function createHTMLElement(item){
  const parentElement = document.querySelector('.items');
  const li = document.createElement("li");
  li.addEventListener("click",displayDetail);
  li.addEventListener("mouseout",hiddenDetail);
  li.setAttribute("class","item");

  const img = document.createElement("img");
  img.src = `${item.image}`;
  img.alt = `${item.type}`;
  img.setAttribute("class","item__thumbnail");

  const span = document.createElement("span");
  span.setAttribute("class", "item__description");
  span.innerText = `${item.gender}` + ", " + `${item.size}`;

  const div = document.createElement("div");
  div.setAttribute("class","item__detail");
  div.style.display = "none";

  const spanInDiv1 = document.createElement("span");
  spanInDiv1.setAttribute("class","item__detail__element")
  spanInDiv1.innerText = "길이 : " + `${item.length}` + " 소재 : " + `${item.Material}` + " 별점 : " + `${item.TotalScore}`;
  const spanInDiv2 = document.createElement("span");
  spanInDiv2.setAttribute("class","item__detail__element")
  spanInDiv2.innerText = "설명 : " + `${item.comment}`;

  div.appendChild(spanInDiv1);
  div.appendChild(spanInDiv2);
  
  li.appendChild(img);
  li.appendChild(span);
  li.appendChild(div);
  parentElement.appendChild(li);
}

// 해당 상품을 클릭 시 상세정보를 보여주는 함수
function displayDetail(event){
    const target = event.target.children[2];
    console.log(target);
    target.style.display = "block";
    // const item__detail = document.querySelector('.item__detail');
    // item__detail.style.display = "block";
}

// 해당 상품에서 마우스포인터가 빠져나올시 상세정보를 감추는 함수
function hiddenDetail(event){
    const target = event.target.children[2];
    console.log(target);
    target.style.display = "none";
    // const item__detail = document.querySelector('.item__detail');
    // item__detail.style.display = "none";
}

function setEventListeners(items){
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click',event => onButtonClick(event, items));
}

function onButtonClick(event, items){
    const dataSet = event.target.dataset;
    const key = dataSet.key;
    const value = dataSet.value;
    
    if(key == null || value == null){
        return;
    }

    displayItems(items.filter(item => item[key] === value));
}

loadItems()
.then(items => {
    displayItems(items);
    setEventListeners(items)
})
.catch(console.log);