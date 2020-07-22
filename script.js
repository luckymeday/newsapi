let newsList = []
let page = 1
let selectedCategory = 'general'

const apiKey = process.env.APIKEY

const callApi = async () => {
    if (selectedCategory !== document.getElementById("categories").value) {
        page = 1
        selectedCategory = document.getElementById("categories").value
        newList = []
    } let url = `https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&page=${page}&apiKey=${apiKey}`
    let data = await fetch(url)
    let result = await data.json()
    newsList = newsList.concat(result.articles)
    console.log(newsList)
    render(newsList)
    // pageNum++;
}

// category
const searchByCategory = async () => {
    console.log(selectedCategory)
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&apiKey=${apiKey}`
    let data = await fetch(url)
    let result = await data.json()
    console.log(result)
    newsList = result.articles
    render(newsList)
}

// source
const renderSource = () => {
    let sources = newsList.map((item) => item.source.name);
    let result = {};
    for (let i = 0; i < sources.length; i++) {
        if (sources[i] in result) {
            result[sources[i]]++
        } else {
            result[sources[i]] = 1
        }
    }
    let keys = Object.keys(result)
    let sourceHTML = keys
        .map(
            (key) =>
                `<input type="checkbox" onchange="searchBySource('${key}')">${key}:${result[key]}`
        )
        .join("")
    document.getElementById("sourceArea").innerHTML = sourceHTML;
}

const searchBySource = (source) => {
    let filteredList = newsList.filter((item) => item.source.name === source)
    render(filteredList);
}

// keyword
const searchByKeyword = async () => {
    let keyword = document.getElementById("KeywordArea").value
    let url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKey}`
    let data = await fetch(url)
    let result = await data.json()
    newsList = result.articles
    render(newsList)
}

// load more
const viewMore = () => {
    page++
    callApi()
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
        <li class="list-group-item">${moment(item.publishedAt).fromNow()}</li>
        <li class="list-group-item">${item.source.name}</li>
        <li class="list-group-item">${item.author}</li>
    </ul>
</div>`
    }).join('')
    document.getElementById("newsListArea").innerHTML = newsHTML
}

callApi()