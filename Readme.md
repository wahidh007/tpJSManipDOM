# Manipulation DOM html avec Javascript

## Création des pages de notre sites

- Installer l'extension Live Server (si elle n'existe pas)
- Créer les fichiers : `index.html`, `main.js` et `style.css`
- Intégrer `main.js` et `style.js` dans `index.html`
- Dans index.html :
  - changer le titre de la page à `Javascript DOM`
  - Ajouter un titre 1 `Manipulation DOM avec Javascript`
  - ajouter dans une balise div>section le formulaire (action=# et method=post) suivant :
    - Nom, Date Naissance, Genre (Male, Female), bouton Reset et un bouton Save
- Avant la section du formulaire, ajoutez une section contenant :
  - une titre 2 _Section Home_
  - un paragraphe : _Le contenu de la section Home..._

## Effects et Styles

- Changez la couleur du fond de la page à `ghostwhite` et la couleur des section à blanc
- Affichez une alerte _Bonjour FCAD1_ au chargement de la page
- Après le bouton Save, ajoutez un bouton _Info_
- Afficher une alerte _Bonjour FCAD1_ lorsque on clique sur le bouton Info
- Avant la balise div id main, ajoutez une balise nav contenent 3 liens : Home, Contact et Info
- Modifiez le code du bouton Info pour afficher le nom dans une alerte (ex: Bonjour NOM)
- Ajoutez les styles suivants pour les balises _nav_ et _a_ de _nav_ :

  - pour nav a : taille font = 20px, `cursor: pointer;` et `color: white;`
  - pour nav : `display: flex;` `justify-content: center;` `background-color: #000000;`
  - `a:hover { color: #ffcc00; }`

- Ajoutez les styles suivants pour section :

  - section : `display: none; background-color: white;`
  - section.active : `display: block;`

## Activation des liens de la navbar

- Pour chacun des liens (Home, Contact et Info) ajoutez l'évènement click pour afficher seulement la section désirée. Exemple :

```javascript
const linkHome = document.getElementById("linkHome");
const sectionHome = document.getElementById("sectionHome");
linkHome.addEventListener("click", () => {
  document
    .querySelectorAll("section")
    .forEach((sec) => sec.classList.remove("active"));
  sectionHome.classList.add("active");
});
```

## Manipulation formulaire avec Javascript

- Avec javascript et suite au click sur le bouton Save du formulaire (submit), ajouter un nouveau bloc (div) (dans section id info) qui contient un titre 2 'Info étudiant' et un paragraphe contenant les valeurs des différents champs saisis :

```javascript
function ajoutBlocSectionInfo(nom, dateNais, genre) {
  const sectionInfo = document.getElementById("secInfo");
  const blocInfo = document.createElement("div");

  blocInfo.innerHTML = `
        <h2> Section Info </h2> 
        <p> 
        Nom : ${nom} <br/>
        Date Naissance : ${dateNais} <br/>
        Genre : ${genre} <br/>
        </p>
        `;
  sectionInfo.appendChild(blocInfo);
}

function submitForm() {
  var form = document.querySelector("form");
  form.addEventListener(
    "submit",
    function (event) {
      var data = new FormData(form);

      ajoutBlocSectionInfo(
        data.get("nom"),
        data.get("dateNais"),
        data.get("genre")
      );

      event.preventDefault();
    },
    false
  );
}
```

## Chargement données JSON à partir d'une URL

- Dans la section Info, ajoutez un bouton `Load data...` (permettant de charger les données à partir de l'url `https://jsonplaceholder.typicode.com/posts`) et un bloc div avec class `data-container`

```javascript
async function fetchData() {
  const dataContainer = document.querySelector(".data-container");
  dataContainer.innerHTML = "";

  const loadingElement = document.createAndStyleElement(
    "div",
    "loading",
    "Loading..."
  );
  dataContainer.appendChild(loadingElement);

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    setTimeout(() => {
      dataContainer.removeChild(loadingElement);

      data.slice(0, 5).forEach((item) => {
        const dataTitle = createAndStyleElement("h2", "", item.title);
        const dataBody = createAndStyleElement("p", "", item.body);

        dataContainer.appendChild(dataTitle);
        dataContainer.appendChild(dataBody);
      });
    }, 1000);
  } catch (error) {
    dataContainer.removeChild(loadingElement);
    dataContainer.textContent = "Failed to fetch data";
  }
}
```

## Ajout d'un compteur

- Dans la section Home, nous allons ajouter un compteur. Pour cela ajoutez à la fin de la section Home la balise div suivante :

```html
<div id="counter" class="counter"></div>
```

- et ajouter le code javascript suivant :

```javascript
function setupCounter(element) {
  let counter = 0;
  const setCounter = (count) => {
    counter = count;
    element.innerHTML = `<button>${counter}</button>`;
  };
  element.addEventListener("click", () => setCounter(counter + 1));
  setCounter(0);
}

setupCounter(counterElement);
```
