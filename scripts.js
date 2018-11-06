const ENTER_KEYCODE = 13;

/* this eventlistener waits for the DOM to load (all the content in the browser) before it initializes the application.
We dont want things happen in the javascript before the content is loaded because then youll get undefined objects/errors */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form'); /* defining global variables */
  const items = document.querySelector('.items');
  /* initializes tha application, text is the variable object and its value is a function */
  text.init(form, items);
});
/* this defines the application,  */
const text = (() => {
  let itemText, itemList, items; /*local scope to the variable text only and children */

  function init(_form, _items) {
    items = _items; /* assigning value to items */
    itemList = _items.querySelectorAll(".item");
    console.log(_form, _items, itemList);

    _form.addEventListener('submit', formHandler); /* assigning functionalitity to the specific object we're targeting */

    for (var i = 0; i < itemList.length; i++) {
      console.log("LIST ITEM:", itemList[i]);
      itemList[i].querySelector('.item__checkbox').addEventListener('click', finish);
      itemList[i].querySelector('.item__text').addEventListener('click', edit);
      itemList[i].querySelector('.item__button').addEventListener('click', deleteItem);
    }
  }
  /* formhandler validates to make sure the form is not empty and calls to add function to add to-do items */
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
    let container = e.target.parentElement;
    let theText = e.target.textContent;
    let editable;
    if (e.target.parentElement.classList.contains('item--done') === true) {
      return;
    }
    editable = el("input", "item__edit", false);
    editable.addEventListener("blur", commit);
    editable.value = theText;
    container.insertBefore(editable, e.target.nextSibling);
    e.target.remove();
    editable.focus();
    editable.addEventListener("keypress", function onPress(e) {
      if (e.keyCode === ENTER_KEYCODE) {
        console.log("Enter Key Pressed While Editing");
        return editable.blur();
      }
    });
    console.log("Edit Me", e, container, theText);
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    let container = e.target.parentElement;
    let theText = e.target.value;
    let notEditable;
    if (theText === "") {
      e.target.focus();
      return;
    };
    notEditable = el("span", "item__text", edit);
    notEditable.textContent = theText;
    container.insertBefore(notEditable, e.target.nextSibling);
    e.target.remove();
    console.log("Commit Me", e);
  }

  /* creating and formatting a new to-do item and inserts it into the DOM */
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

    items.appendChild(newListItem); /*takes everything we have created and inserts into the ul*/
    return console.log("Add Me", value);
  }

  function deleteItem(e) {
    e.target.parentElement.remove();
    return console.log("Delete Me", e);
  }

  /* Creates a single DOM element */
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
