const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');
  text.init(form, items);
});

const text = (() => {
  let itemText, itemList, items, newText;

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
    e.preventDefault();
    let isValid = false;
    let newToDo = document.querySelector('.form__input');
    newToDo.value = newToDo.value.trim();
    if (newToDo.value.length > 0) {
      isValid = true;
      add(newToDo.value);
      newToDo.value = "";
    } else {
      return;
    }
    return console.log("Form Submitted", isValid);
  }

  function finish(e) {
    e.target.parentElement.classList.toggle("item--done");
    return console.log("Finish Me", e);
  }

  function edit(e) {
    let container = e.target.parentElement;
    let theText = e.target.textContent;
    let editable;
    editable = el("input", "item__edit", false);
    editable.value = theText;
    editable.addEventListener("blur", commit);
    editable.addEventListener("input", function onInput(e) {
      text.newText = e.target.value.trim();
      console.log("onChange", text.newText);
    }, true);
    container.insertBefore(editable, e.target.nextSibling);
    editable.focus();

    e.target.setAttribute("style", "display:none;");

    editable.addEventListener("keypress", function onPress(e) {
      if (e.keyCode === ENTER_KEYCODE) {
        let theSpan = e.target.parentElement.querySelector(".item__text");
        if (text.newText !== undefined && text.newText.length > 0) {
          theSpan.textContent = text.newText;
        }
        console.log("Enter Key Pressed While Editing", theText, text.newText.length);
        return editable.blur();
      }
    });
    return console.log("Edit Me", e);
  }

  function commit(e) {
    let container = e.target.parentElement;
    let notEditable = e.target.parentElement.querySelector(".item__text");
    notEditable.setAttribute("style", "display:inline;");
    e.target.remove();
    text.newText = undefined;
    return console.log("Commit Me", e);
  }

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

  function deleteItem(e) {
    e.target.parentElement.remove();
    return console.log("Delete Me", e);
  }

  function el(type, className, clickHandler) {
    const newEl = document.createElement(type);
    let isCreated = false;

    try {
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

    } catch (e) {
      alert("ERROR:ElementCreation - The TODO list item was not created.");
      console.log("ERROR: function el()", e);
    }

    console.log("CREATE ELEMENT:", isCreated, type, className, clickHandler);
    return newEl;
  }
  return {
    init: init
  }
})();
