const ul = document.querySelector("ul");

const form = document.querySelector("form");
const input = document.querySelector("input");

// modification : il faut ajouter une clé de type booléen
const series = [
  {
    name: "Breaking Bad",
    seen: false,
    edit: false,
  },
  {
    name: "The Wire",
    seen: true,
    edit: false,
  },
];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value;
  console.log(value);
  input.value = "";
  addSerie(value);
});

const displaySeries = () => {
  const seriesNode = series.map((serie, index) => {
    // placer une condition selon l'état de la nouvelle clé
    if (serie.edit) { 
      return displayInput(serie.name, index)
    }
    return createSerieElement(serie, index)
  });
  ul.innerHTML = "";
  ul.append(...seriesNode);
};

// créer une méthode qui affiche un input avec le nom de la série et 2 boutons cancel et save
const displayInput= (value, index) => {
  const li = document.createElement("li");
  const inputEdit = document.createElement("input");
  const btnCancel = document.createElement("button");
  const btnSave = document.createElement("button");
  btnCancel.classList.add("button");
  btnSave.classList.add("button");
  inputEdit.classList.add("input");
  inputEdit.value = value

  btnSave.innerText = "Save";
  btnCancel.innerText = "Cancel";

  btnCancel.addEventListener("click", () => {
    toggleEdit(index); 
    displaySeries()
  });

  btnSave.addEventListener("click", () => {
    editSerieName(index, inputEdit.value);
  });

  li.append(inputEdit, btnCancel, btnSave);
  return li;
};

function createSerieElement(serie, index) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.classList.add("todo");
  span.addEventListener("click", () => {
    toggleSerie(index);
  });
  if (serie.seen) {
    span.classList.add("done");
  }
  const p = document.createElement("p");
  p.innerText = serie.name;
  const btnEdit = document.createElement("button");
  btnEdit.innerText = "Edit";
  btnEdit.classList.add = "button";
  btnEdit.addEventListener("click", () => {
    toggleEdit(index);
    displaySeries()

  });
  const btnDelete = document.createElement("button");
  btnDelete.innerText = "Delete";
  btnDelete.classList.add("delete");
  btnDelete.addEventListener("click", () => {
    deleteSerie(index);
  });
  li.append(span, p, btnEdit, btnDelete);
  return li;
}

const addSerie = (value) => {
  series.push({ name: value, seen: false });
  displaySeries();
};

const deleteSerie = (index) => {
  console.log(index);
  series.splice(index, 1);
  displaySeries();
};
const toggleSerie = (index) => {
  console.log(index);
  series[index].seen = !series[index].seen;
  displaySeries();
};

// modification
// Créer une méthode qui switche la nouvelle clé du tableau : voir juste ci-dessus
const toggleEdit = (index) => {
  series[index].edit = !series[index].edit
  console.log(index);
}
// Créer une méthode qui va prendre en charge la modification
// modifier le nom

const editSerieName = (index, newName) => {
  series[index].name = newName; 
  series[index].edit = false; 
  displaySeries(); 
};

displaySeries();
