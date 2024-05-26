// alert('Hello FCAD !!')
function createAndStyleElement(tag, className, content = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.innerHTML = content;
    return element;
}

function ajoutBlocInfo() {
    const blocInfo = document.createElement('div')

    blocInfo.innerHTML = "<h2> Section Info </h2> <p> Content section info... </p>"
    // blocInfo.classList.add('active')
    blocInfo.setAttribute("id", "blocInfo")

    const sectionInfo = document.getElementById('secInfo')
    sectionInfo.appendChild(blocInfo)
}

function ajoutBlocSectionInfo(nom, dateNais, genre) {
    const sectionInfo = document.getElementById('secInfo')

    const blocInfo = document.createElement('div')

    blocInfo.innerHTML = `
        <h2> Section Info </h2> 
        <p> 
        Nom : ${nom} <br/>
        Date Naissance : ${dateNais} <br/>
        Genre : ${genre} <br/>
        </p>
        `
    // blocInfo.classList.add('active')
    blocInfo.setAttribute("id", "blocInfo")

    sectionInfo.appendChild(blocInfo)
}

function submitForm() {
    var form = document.querySelector("form");
    form.addEventListener(
        "submit",
        function (event) {
            var data = new FormData(form); 
            alert(data.get('nom') + ' ' + data.get('dateNais') + ' ' + data.get('genre'))
           
            // Autre méthode d'accès aux champs du formulaire
            // var output = "";
            // for (const entry of data) {
            //     output = output + entry[0] + " : " + entry[1] + "\r";
            // }

            ajoutBlocSectionInfo(data.get('nom'), data.get('dateNais'), data.get('genre'))

            event.preventDefault();
        },
        false,
    );
}

async function fetchData() {
    const dataContainer = document.querySelector('.data-container');
    dataContainer.innerHTML = '';

    const loadingElement = createAndStyleElement('div', 'loading', 'Loading...');
    dataContainer.appendChild(loadingElement);

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();

        setTimeout(() => {
            dataContainer.removeChild(loadingElement);

            data.slice(0, 5).forEach(item => {
                const dataTitle = createAndStyleElement('h2', '', item.title);
                const dataBody = createAndStyleElement('p', '', item.body);

                dataContainer.appendChild(dataTitle);
                dataContainer.appendChild(dataBody);
            });
        }, 1000);
    } catch (error) {
        dataContainer.removeChild(loadingElement);
        dataContainer.textContent = 'Failed to fetch data';
    }
}

function createPage() {
    const app = document.getElementById('main');
    const btInfo = document.getElementById('btInfo')
    
    btInfo.addEventListener('click', () => {
        alert('Bonjour ' + document.getElementById('nom').value)

        // ajoutBlocInfo()
    })

    submitForm()

    const footer = document.createElement('footer')
    footer.innerHTML = `
            <p>&copy; 2024 JavaScript DOM. Tous droits réservés.</p>
            <p>
            <a href="https://twitter.com" target="_blank">Twitter</a> |
            <a href="https://facebook.com" target="_blank">Facebook</a> |
            <a href="https://linkedin.com" target="_blank">LinkedIn</a>
            </p>
        `
    app.appendChild(footer);

    const aHome = document.getElementById("aHome")
    const secHome = document.getElementById("secHome")
    aHome.addEventListener("click", () => {
        document
            .querySelectorAll('section')
            .forEach(sec => sec.classList.remove('active'))
        secHome.classList.add('active')
    })

    const aContact = document.getElementById("aContact")
    const secContact = document.getElementById("secContact")
    aContact.addEventListener("click", () => {
        document
            .querySelectorAll('section')
            .forEach(sec => sec.classList.remove('active'))
        secContact.classList.add('active')
    })

    const aInfo = document.getElementById("aInfo")
    const secInfo = document.getElementById("secInfo")
    aInfo.addEventListener("click", () => {
        document
            .querySelectorAll('section')
            .forEach(sec => sec.classList.remove('active'))
        secInfo.classList.add('active')
    })

    const btLoad = document.getElementById("loadData")
    btLoad.addEventListener("click", () => fetchData())

    const counterElement = document.getElementById('counter');
    setupCounter(counterElement);
}

function setupCounter(element) {
    let counter = 0;
    const setCounter = (count) => {
      counter = count;
      element.innerHTML = `<button>${counter}</button>`;
    };
    element.addEventListener('click', () => setCounter(counter + 1));
    setCounter(0);
}

createPage()





