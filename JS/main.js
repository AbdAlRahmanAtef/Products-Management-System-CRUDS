let title = document.querySelector(".title input");
let price = document.querySelector(".price .main-price");
let taxes = document.querySelector(".price .taxes ");
let ads = document.querySelector(".price .ads ");
let discount = document.querySelector(".price .discount ");
let total = document.querySelector(".price .total span");
let category = document.querySelector(".cat");
let count = document.querySelector(".count");
let create = document.querySelector(".submit");
let search = document.querySelector(".search");
let index;
let mood = "create";

// Focus On Title Input
window.onload = () => {
  title.focus();
};
// // Get Total Cost
document.querySelectorAll(".price input").forEach((input) => {
  input.oninput = getTotal;
});
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
  }
}

// Show Data
let products = [];
if (localStorage.getItem("product")) {
  products = JSON.parse(localStorage.getItem("product"));
  showData();
}
// Create Product Object
create.onclick = newProduct;
// Clear inputs
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
// Show Data
function showData() {
  let table = "";
  for (let i = 0; i < products.length; i++) {
    products[i].id = i;
    table += `<tr><td class="id">${products[i].id + 1}</td>
    <td>${products[i].title}</td>
    <td>${products[i].price}</td>
    <td>${products[i].taxes}</td>
    <td>${products[i].ads}</td>
    <td>${products[i].discount}</td>
    <td>${products[i].total}</td>
    <td>${products[i].cagegory}</td>
    <td onclick ="update(${i})"><button class="update">Update</button></td>
        <td onclick ="deleteElement(${i})"><button class="del">Delete</button></td></td></tr>`;
  }
  document.querySelector(".tbody").innerHTML = table;
  let deleteAll = document.querySelector(".delete");
  deleteAll.onclick = clearAllData;
  if (products.length != 0) {
    deleteAll.style.display = "block";
    deleteAll.innerHTML = `Delete All (${products.length})`;
  } else {
    deleteAll.style.display = "none";
  }
}
showData();

// deleteElement();
function deleteElement(i) {
  products.splice(i, 1);
  localStorage.product = JSON.stringify(products);
  showData();
}

// Clear All Data
function clearAllData() {
  localStorage.clear();
  products.splice(0);
  showData();
}

// Update Date
function update(i) {
  title.value = products[i].title;
  price.value = products[i].price;
  taxes.value = products[i].taxes;
  ads.value = products[i].ads;
  total.value = products[i].ads;
  discount.value = products[i].discount;
  category.value = products[i].cagegory;
  getTotal();
  count.style.display = "none";
  create.innerHTML = "Update";
  mood = "update";
  index = i;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
searchForProducts();
// Search
function searchForProducts() {
  search.onkeyup = () => {
    let table = "";
    for (let i = 0; i < products.length; i++) {
      if (
        products[i].title.toLowerCase().includes(search.value.toLowerCase())
      ) {
        products[i].id = i;
        table += `<tr><td>${products[i].id + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].cagegory}</td>
        <td onclick ="update(${i})"><button class="update">Update</button></td>
        <td onclick ="deleteElement(${i})"><button class="del">Delete</button></td></td></tr>`;
      }
    }
    document.querySelector(".tbody").innerHTML = table;
    let deleteAll = document.querySelector(".delete");
    deleteAll.onclick = clearAllData;
    if (products.length != 0) {
      deleteAll.style.display = "block";
      deleteAll.innerHTML = `Delete All (${products.length})`;
    } else {
      deleteAll.style.display = "none";
    }
  };
}

// Create Product
function newProduct() {
  let product = {
    id: 0,
    title: title.value,
    price: price.value,
    taxes: taxes.value || 0,
    ads: ads.value || 0,
    discount: discount.value || 0,
    total: total.innerHTML || 0,
    count: count.value || 1,
    cagegory: category.value,
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value <= 100
  ) {
    if (mood === "create") {
      if (count.value != 0) {
        for (let i = 0; i < parseInt(count.value); i++) {
          products.push(product);
        }
      } else {
        products.push(product);
      }
    } else {
      products[index] = product;
    }
  }
  mood = "create";
  count.style.display = "block";
  create.innerHTML = "Create";
  window.localStorage.setItem("product", JSON.stringify(products));
  clearInputs();
  showData();
}

// Dark And Light Mood
let moodIcon = document.querySelector(".icon");
let i = document.querySelector(".icon i");
if (localStorage.getItem("mood") === "dark") {
  moodIcon.setAttribute("data-mood", "dark");
  document.documentElement.style.setProperty("--background-color", "#222");
  document.documentElement.style.setProperty("--text-color", "#fff");
  document.documentElement.style.setProperty("--input-color", "#000");
  document.documentElement.style.setProperty("--btn-color", "#042f66");
  document.documentElement.style.setProperty("--text-color-alt", "#777");
  i.className = "fa-solid fa-sun";
} else {
  document.documentElement.style.setProperty("--input-color", "#DCDCDC");
  document.documentElement.style.setProperty("--text-color", "#222");
  document.documentElement.style.setProperty("--text-color-alt", "#000");
  document.documentElement.style.setProperty("--background-color", "#777");
  document.documentElement.style.setProperty("--btn-color", "#0075ff");
  document.documentElement.style.setProperty("--text-color-alt", "#777");
  i.className = "fa-solid fa-moon";
}
// console.log(moodIcon.getAttribute("data-mood"));
moodIcon.onclick = function () {
  i.classList.toggle("fa-moon");
  if (i.classList.contains("fa-moon")) {
    moodIcon.setAttribute("data-mood", "light");
    document.documentElement.style.setProperty("--input-color", "#DCDCDC");
    document.documentElement.style.setProperty("--text-color", "#000");
    document.documentElement.style.setProperty("--text-color-alt", "#777");
    document.documentElement.style.setProperty("--background-color", "#777");
    document.documentElement.style.setProperty("--btn-color", "#0075ff");
    i.className = "fa-solid fa-moon";
  } else {
    moodIcon.setAttribute("data-mood", "dark");
    document.documentElement.style.setProperty("--background-color", "#222");
    document.documentElement.style.setProperty("--text-color", "#fff");
    document.documentElement.style.setProperty("--text-color-alt", "#777");
    document.documentElement.style.setProperty("--input-color", "#000");
    document.documentElement.style.setProperty("--btn-color", "#042f66");
    document.documentElement.style.setProperty("--text-color-alt", "#777");
    i.className = "fa-solid fa-sun";
  }
  localStorage.setItem("mood", moodIcon.getAttribute("data-mood"));
};

// Scroll To Top
let toTop = document.querySelector(".to-top i");
console.log(toTop);
window.onscroll = function () {
  if (window.scrollY >= 400) {
    toTop.style.display = "flex";
  } else {
    toTop.style.display = "none";
  }
};
toTop.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
