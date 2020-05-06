const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');
let login = localStorage.getItem('gloDelivery');


function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth() {
modalAuth.classList.toggle('is-open');
}

function authorized() {
  function logOut() {
    login = '';
    localStorage.removeItem('gloDelivery');
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    checkAuth();


  }
  console.log('Авторизован');

  userName.textContent = login;

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';
  buttonOut.addEventListener('click', logOut);

}

function notAuthorized() {
  console.log('Не авторизован');

  function logIn(event) {
    event.preventDefault();
    if (loginInput.value !== '') {
      login = loginInput.value;

      localStorage.setItem('gloDelivery', login);


      toggleModalAuth();
      buttonAuth.removeEventListener('click', toggleModalAuth);
      closeAuth.removeEventListener('click', toggleModalAuth);
      logInForm.removeEventListener('submit', logIn)
      logInForm.reset();
      checkAuth();
    } else {
      alert('Введите логин');
    }
  }

  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn)
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

function createCardRestaurant() {
const card = `
<a class="card card-restaurant">
\t\t\t\t\t\t<img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
\t\t\t\t\t\t<div class="card-text">
\t\t\t\t\t\t\t<div class="card-heading">
\t\t\t\t\t\t\t\t<h3 class="card-title">Тануки</h3>
\t\t\t\t\t\t\t\t<span class="card-tag tag">60 мин</span>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="card-info">
\t\t\t\t\t\t\t\t<div class="rating">
\t\t\t\t\t\t\t\t\t4.5
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div class="price">От 1 200 ₽</div>
\t\t\t\t\t\t\t\t<div class="category">Суши, роллы</div>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t</div>
\t\t\t\t\t</a>
`;

cardsRestaurants.insertAdjacentHTML('beforeend', card);

}

function createCardGood() {
  const card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML('beforeend',`
\t\t\t\t\t\t<img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
\t\t\t\t\t\t<div class="card-text">
\t\t\t\t\t\t\t<div class="card-heading">
\t\t\t\t\t\t\t\t<h3 class="card-title card-title-reg">Пицца Классика</h3>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="card-info">
\t\t\t\t\t\t\t\t<div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
\t\t\t\t\t\t\t\t\tгрибы.
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="card-buttons">
\t\t\t\t\t\t\t\t<button class="button button-primary button-add-cart">
\t\t\t\t\t\t\t\t\t<span class="button-card-text">В корзину</span>
\t\t\t\t\t\t\t\t\t<span class="button-cart-svg"></span>
\t\t\t\t\t\t\t\t</button>
\t\t\t\t\t\t\t\t<strong class="card-price-bold">510 ₽</strong>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t</div>
  `);

  cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event) {
  const target = event.target;

  const restaurant = target.closest('.card-restaurant');

  if (restaurant) {
    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');

    cardsMenu.textContent = '';

  createCardGood();
  createCardGood();
  createCardGood();

  }

}


cardsRestaurants.addEventListener('click', openGoods);

logo.addEventListener('click', function() {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
});

cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);


checkAuth();

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();