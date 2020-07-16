// numberOfArticles
// pageNum

let newsList = []
let pageNum = 1;
let selectedSource = [];
let selectedCategory = null;
let sourceNames = {};
let categories = ['All', 'Global', 'Politics', 'Business', 'Finance', 'Science', 'Tech', 'Entertainment', 'Health', 'Sports'];

// let weather = []
// const callWeather = async () => {
//     let url = 
//     let data = await fetch(url)
//     let result = await data.json()
//     render(weather)
// }

// const apiKey = process.env.APIKEY
const callApi = async (category) => {
    // console.log(apiKey)
    let url = `https://newsapi.org/v2/everything?q=apple&from=2020-07-14&to=2020-07-14&sortBy=popularity&apiKey=c2933304c2114b968e48c75b614810c3`
    let data = await fetch(url)
    let result = await data.json()
    newsList = result.articles
    console.log(newsList)
    selectedSource = [];
    render(newsList)
    // filterSources(newsList);
    pageNum++;
}

const callMoreApi = async (category) => {
    let url = `https://newsapi.org/v2/everything?q=apple&from=2020-07-14&to=2020-07-14&sortBy=popularity&apiKey=c2933304c2114b968e48c75b614810c3`
    let data = await fetch(url)
    let result = await data.json()
    newsList = newsList.concat(result.articles)
    console.log(newsList)
    selectedSource = [];
    render(newsList)
    // filterSources(newsList);
    pageNum++;
}

const render = (list) => {
    let newsHTML = list.map(item => {
        return `<div class="card" style="width: 18rem;">
       <img src="${item.urlToImage}" class="card-img-top" alt="...">
       <div class="card-body">
        <h5 class="card-title"><a href="${item.url}">${item.title}</a></h5>
        <p class="card-text">${item.description}</p>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">${moment(item.publishedAt == null ? " " : item.publishedAt).fromNow()}</li>
        <li class="list-group-item">${item.source.name}</li>
        <li class="list-group-item">${item.author}</li>
    </ul>
</div>`
    })
    document.getElementById("newsListArea").innerHTML = newsHTML
}
/* <div class="card-body">
       <a href="#" class="card-link">Card link</a>
       <a href="#" class="card-link">Another link</a>
   </div>*/


// const filterSources = (articles) => {
//     articles.map(a => {
//         let source = a.source.name;
//         if (sourceNames[source] == null) {
//             sourceNames[source] = 0;
//         };
//         sourceNames[source]++;
//     })
//     displaySources();
// }

// const displaySources = () => {
//     let arr = Object.keys(sourceNames);
//     const html = arr.map((sourceName, i) => {
//         return `
//         <li class="list-group-item list-group-item-action pl-1 pl-sm-5"><input type="checkbox" class="form-check-input" id="${sourceName}" onchange="renderNewsBySource(${i})"><label for="${sourceName}">${sourceName.split('.')[0]} : ${sourceNames[sourceName]}</label></li>
//         `
//     }).join('');
//     document.getElementById("sources").innerHTML = html;
// }


const generateCategoryDropdown = (categories) => {
    let html = categories.map(cat => {
        return `
        <button class="dropdown-item btn-outline-secondary ${cat == 'All' && 'active'}" type="button" onclick="handleCategoryDropdown('${cat}')">${cat}</button>
        `
    }).join('');
    document.getElementById('categoryDropdown').innerHTML = html;
}

const handleCategoryDropdown = (cat) => {
    console.log('dropdown selected: ', cat);
    selectedSource = [];
    callApi(cat.toLowerCase());
}
generateCategoryDropdown(categories);

// const searchBar = document.forms['search'].querySelector('input');
// searchBar.addEventListener('keyup', function (e)){
//     const term = e.target.value.toLowerCase();
//     const newsList = list.getElementByTagName('li');
//     Array.from(newsList).forEach(function (articles) {
//         const title = articles.firstElementChild.textContent;
//         if (title.toLowerCase()).indexOf(term) != -1){
//         articles.style.display = 'block';
//     }else {
//         articles.style.display = 'none';
//     }
// }

callApi()

// weather
var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button = document.querySelector('.submit');


button.addEventListener('click', function (name) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '5795722a027f792d4ab08eadb68b746f')
        .then(response => response.json())
        .then(data => {
            var tempValue = data['main']['temp'];
            var nameValue = data['name'];
            var descValue = data['weather'][0]['description'];

            main.innerHTML = nameValue;
            desc.innerHTML = "Desc - " + descValue;
            temp.innerHTML = "Temp - " + tempValue;
            input.value = "";

        })

        .catch(err => alert("Wrong city name!"));
})
