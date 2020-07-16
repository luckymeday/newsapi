let newsList = []
// const apiKey = process.env.APIKEY

const callApi = async () => {
    //console.log(apiKey)
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=c2933304c2114b968e48c75b614810c3`
    let data = await fetch(url)
    let result = await data.json()
    newsList = result.articles
    console.log(newsList)
    selectedSource = [];
    render(newsList)
    // filterSources(newsList);
    pageNum++;
}

// const callMoreApi = async () => {
//     let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=c2933304c2114b968e48c75b614810c3`
//     let data = await fetch(url)
//     let result = await data.json()
//     newsList = newsList.concat(result.articles)
//     console.log(newsList)
//     selectedSource = [];
//     render(newsList)
//     // filterSources(newsList);
//     pageNum++;
// }

const searchByCategory = async () => {
    let selectedCategory = document.getElementById("categories").value
    console.log(selectedCategory)
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}apiKey=c2933304c2114b968e48c75b614810c3`
    let data = await fetch(url)
    let result = await data.json()
    console.log(result)
    newsList = result.articles
    render(newsList)
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

/* <div class="card-body">
       <a href="#" class="card-link">Card link</a>
       <a href="#" class="card-link">Another link</a>
   </div>*/

callApi()