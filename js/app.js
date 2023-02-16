'use strict';

window.onload = function() {
  addBurgerClickHandler();
  addLogoClickHandler();
  addMenuLinkClickHandler();
  outsideClickHandler();
  addFilterClickHandler();
  addAccordionClickHandler();
  addSelectClickHandler();
}

const burger = document.querySelector('#burger-menu');
const menu = document.querySelector('#menu');
const logo = document.querySelector('#logo');
const body = document.body;
const menuLink = document.querySelectorAll('.menu__link');

const removeClass = () => {
  if ( !burger.classList.contains('active') ) {
    return;
  }

  burger.classList.remove('active');
  menu.classList.remove('active');
  body.classList.remove('locked');
}

// Open and close burger menu
const addBurgerClickHandler = () => {
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('locked');
  })
}

// Close burger on click element
const addLogoClickHandler = () => {
  logo.addEventListener('click', removeClass);
}


const addMenuLinkClickHandler = () => {
  menuLink.forEach((link) => {
    link.addEventListener('click', removeClass)
  })
}

// click outside the element
const outsideClickHandler = () => {
  document.addEventListener( 'click', (e) => {
    if ( !burger.classList.contains('active') ) {
      return;
    }
  
    const withinBoundaries = e.composedPath().includes(menu) || e.composedPath().includes(burger);
   
    if ( !withinBoundaries ) {
      burger.classList.remove('active');
      menu.classList.remove('active');
      body.classList.remove('locked');
    }
  })
}

// Filter
const addFilterClickHandler = () => {
  document.querySelector('.service__filter').addEventListener('click', (e) => {
    if (e.target.classList.contains('service__filter-btn')) {
      let clickedBtn = e.target;

      addActiveBtn(clickedBtn);
      addFilteredCards(clickedBtn);
    }
  })
}

const addActiveBtn = (clickedBtn) => {
  if (clickedBtn.classList.contains('active')) {
    clickedBtn.classList.remove('active');
    return;
  }

  const filterBtns = document.querySelectorAll('.service__filter-btn');
  filterBtns.forEach(btn => {
    btn.classList.remove('active');
  })

  clickedBtn.classList.add('active');
}

const addFilteredCards = (clickedBtn) => {
  const dataId = clickedBtn.dataset.id;
  const cards = document.querySelectorAll('.service__gallery-item');

  cards.forEach(card => {
    if (dataId !== card.dataset.id && clickedBtn.classList.contains('active')) {
      card.classList.add('blur')
    } else {
      card.classList.remove('blur')
    }
  })
}

//accordion 
const addAccordionClickHandler = () => {
  document.querySelectorAll('.accordion__item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.innerText === 'Order') {
        return;
      }

      if (item.classList.contains('active')) {
        removeActiveAccordion();
      } else {
        removeActiveAccordion();
        item.classList.add('active');
      }
    })
  })
}

const removeActiveAccordion = () => {
  document.querySelectorAll('.accordion__item').forEach(item => {
    item.classList.remove("active");
  })
}

// Select 
const addSelectClickHandler = () => {
  document.querySelector('.contact__select').addEventListener('click', (e) => {
    const select = e.currentTarget
    const target = e.target;
    let selectItem = document.querySelector('.contact__select-item');
    const adressItems = document.querySelectorAll('.adress__item');
    const adress = document.querySelector('.adress');

    select.classList.toggle('opened')
    
    if (target.classList.contains('contact__select-subitem')) {
      selectItem.textContent = target.innerText;
      selectItem.style.background = '#C1E698';
      adressItems.forEach(adressItem => {
        if (window.matchMedia('(max-width: 767.98px)').matches && adressItem.dataset.city === target.dataset.city) {
          removeActiveAdressItem();
          document.querySelector('.contact__img').style.display = 'none';
          adress.classList.add('active');
          adressItem.classList.add('active');
          return;
        }

        if(adressItem.dataset.city === target.dataset.city) {
          removeActiveAdressItem();
          adress.classList.add('active');
          adressItem.classList.add('active');
        }
      })
    }
  })
}

const removeActiveAdressItem = () => {
  document.querySelectorAll('.adress__item').forEach(item => {
    item.classList.remove("active");
  })
}
