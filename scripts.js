const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let itemText, itemList, items;
    function init(_form, _items){
      items = _items;
      itemList = _items.querySelectorAll(".item");
      console.log(_form, _items, itemList);

      _form.addEventListener('submit', formHandler);

      for(var i = 0; i < itemList.length; i++){
        console.log("LIST ITEM:" , itemList[i]);
        itemList[i].querySelector('.item__checkbox').addEventListener('click', finish);
        itemList[i].querySelector('.item__text').addEventListener('click', edit);
        itemList[i].querySelector('.item__button').addEventListener('click', deleteItem);
      }
    }

  function formHandler(e) {
    e.preventDefault();

    console.log('halló heimur');
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    console.log("Delete Me",e);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
  }

  return {
    init: init
  }
})();
