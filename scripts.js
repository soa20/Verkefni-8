const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let itemText, itemList, items;

  function init(_form, _items) {
    items = _items;
    itemList = _items.querySelectorAll(".item");
    console.log(_form, _items, itemList);

    _form.addEventListener('submit', formHandler);

    for (var i = 0; i < itemList.length; i++) {
      console.log("LIST ITEM:", itemList[i]);
      itemList[i].querySelector('.item__checkbox').addEventListener('click', finish);
      itemList[i].querySelector('.item__text').addEventListener('click', edit);
      itemList[i].querySelector('.item__button').addEventListener('click', deleteItem);
    }
  }

  function formHandler(e) {
    let isValid = false;
    let newToDo = document.querySelector('.form__input');
    e.preventDefault();
    if (newToDo.value != "") {
      console.log(newToDo.value);
      isValid = true;
      add(newToDo.value);
      newToDo.value = "";
    } else {
      alert("Bættu við verkefni fyrir lista");
    }
    return console.log("Form Submitted", isValid);
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    e.target.parentElement.classList.toggle("item--done");
    return console.log("Finish Me", e);
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    console.log("Edit Me", e);
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    console.log("Commit Me", e);

  }

  // fall sem sér um að bæta við nýju item
  /* hit add: create the whole list item, with input[checkbox], span, button */
  function add(value) {
    let newListItem,
      newInput,
      newSpan,
      newButton;
    newListItem = el("li", "item", false);

    newInput = el("input", "item__checkbox", finish);
    newListItem.appendChild(newInput);

    newSpan = el("span", "item__text", edit);
    newSpan.appendChild(document.createTextNode(value));
    newListItem.appendChild(newSpan);

    newButton = el("button", "item__button", deleteItem);
    newButton.appendChild(document.createTextNode("Eyða"));
    newListItem.appendChild(newButton);

    items.appendChild(newListItem);
    return console.log("Add Me", value);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    e.target.parentElement.remove();
    return console.log("Delete Me", e);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const newEl = document.createElement(type);
    let isCreated = false;
    if (typeof type !== "undefined") {
      if (type === "input" && className === "item__checkbox") {
        newEl.setAttribute('type', 'checkbox');
      } else if (type === "input" && className === "item__edit") {
        newEl.setAttribute('type', 'text');
      }
      if (typeof className !== "undefined") {
        newEl.setAttribute('class', className);
      }
      if (typeof clickHandler !== "undefined" && clickHandler) {
        newEl.addEventListener('click', clickHandler);
      }
      isCreated = true;
    }

    console.log("Create Me", type, className, clickHandler);
    return newEl;
  }

  return {
    init: init
  }
})();
