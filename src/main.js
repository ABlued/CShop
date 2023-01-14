//JSON 파일에 있는 데이터를 받아오는 함수
const container = document.querySelector('.items');
function loadItems() {
  return fetch('data/data.json') //이 경로안에 있는 데이터를 받아온다
    .then((response) => response.json()) //패치가 완료되면 response라는 객체를 전달받게 되고 json으로 변환.
    .then((json) => json.items); //json안에 있는 items를 반환받는다.
}
//JSON에서 받아온 데이터를 출력하는 함수
function displayItems(items) {
  const container = document.querySelector('.items');
  // container.innerHTML = itmes.map(item => createHTMLString(item)).join('');       //받아온 것들을 문자열로 만들고 join으로 나눈다
  while (container.hasChildNodes()) {
    // 이미 화면에 나타난 상품이 있을 경우
    container.removeChild(container.firstChild); // 첫번째 자식을 지워 삭제한다
  }
  items.map((item) => createHTMLElement(item)); // 모두 삭제한 후 조건에 맞는 상품들을 다시 표시한다.
  container.addEventListener('mouseover', displayDetail);
  container.addEventListener('mouseout', hiddenDetail);
}
function displayDetail(event) {
  const li = event.target.closest('li');
  if (!li) return;
  if (!container.contains(li)) return;
  const target = li.children[2];
  target.style.display = 'block';
}
function hiddenDetail(event) {
  const li = event.target.closest('li');
  if (!li) return;
  if (!container.contains(li)) return;
  const target = li.children[2];
  target.style.display = 'none';
}

//JSON에서 받아온 데이터를 기반으로 HTMLElement를 생성하는 함수
function createHTMLElement(item) {
  const parentElement = document.querySelector('.items');
  const li = document.createElement('li');
  li.setAttribute('class', 'item');

  const img = document.createElement('img');
  img.src = `${item.image}`;
  img.alt = `${item.type}`;
  img.setAttribute('class', 'item__thumbnail');

  const span = document.createElement('span');
  span.setAttribute('class', 'item__description');
  span.innerText = `${item.gender}` + ', ' + `${item.size}`;

  const div = document.createElement('div');
  div.setAttribute('class', 'item__detail');
  div.style.display = 'none';

  const spanInDiv1 = document.createElement('span');
  spanInDiv1.setAttribute('class', 'item__detail__element');
  spanInDiv1.innerText =
    '길이 : ' +
    `${item.length}` +
    ' 소재 : ' +
    `${item.Material}` +
    ' 별점 : ' +
    `${item.TotalScore}`;

  div.appendChild(spanInDiv1);

  li.appendChild(img);
  li.appendChild(span);
  li.appendChild(div);
  parentElement.appendChild(li);
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', (event) => onButtonClick(event, items));
}

function onButtonClick(event, items) {
  const dataSet = event.target.dataset;
  const key = dataSet.key;
  const value = dataSet.value;

  if (key == null || value == null) {
    return;
  }

  displayItems(items.filter((item) => item[key] === value));
}

loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
