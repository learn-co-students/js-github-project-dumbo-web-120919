document.addEventListener("DOMContentLoaded", () =>{
    const form = document.querySelector("#github-form")
    const searchResultDisplay = document.querySelector("#user-list")
    
    
    
    
    //get user input
    form.addEventListener("submit", (event) =>{
        event.preventDefault()
        let searchTerm = form.querySelector("#search").value
        fetchUserData(searchTerm)
        .then((userData) => {
            let newLi = document.createElement('li')
            newLi.innerHTML = `
            <div id ="user-container">
                <span id= 'username'>${userData.login}</span>
                <img src=${userData.avatar_url} height = '200'>
            </div>
            `
            searchResultDisplay.prepend(newLi)
            const userBlock = newLi.querySelector('#user-container')
            userBlock.addEventListener("click", (event) =>{
                appendRepos(searchTerm, userBlock)
                // console.log(event.target)
            })
        })


    })



})

function appendRepos(username, userBlock){
    let newLi = document.createElement('li')
    fetchRepoData(username)
    .then((repoData) => {
        repoData.forEach((repo) =>{
        let newLi = document.createElement('li')
        newLi.innerHTML = `
            <a href = "${repo.html_url}">${repo.name}</a>
        `
        userBlock.append(newLi)
        })
    })
}


function fetchUserData(searchTerm){
    return fetch(`https://api.github.com/users/${searchTerm}`)
    .then((res) => {
        return res.json()
    })
}

function fetchRepoData(username){
    return fetch(`https://api.github.com/users/${username}/repos`)
    .then((res) => {
        return res.json()
    })
}