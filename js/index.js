/** Fetch Info **/
let configObj = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.github.v3+json"
    }
}

/*** DOM Elements ***/
const form = document.querySelector("#github-form")

/*** Event Listeners & Handlers ***/
form.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
    // prevent the default action for submit events!
    e.preventDefault()
    // grab user input
    const userInput = e.target.search.value
    
    //clear input field
    e.target.reset()

    // search github for user search endpoint
    return fetch(`https://api.github.com/search/users?q=${userInput}`, configObj)
    .then(r => r.json())
    .then(data => {
        renderUserInfo(data)
    })

}

/*** Helper Functions ***/
function renderUserInfo(data) {
    data["items"].forEach(userObj => {
        
        const userList = document.querySelector("#user-list")
        // show username
        const userName = document.createElement("li")
        userName.textContent= userObj.login 
        
        // show profile link
        const userProfile = document.createElement("span")

        userProfile.innerHTML = `
        <a href=${userObj.html_url} target=_blank>view profile</a>
        `
        
        // show avatar
        const userAvatar = document.createElement("img")
        userAvatar.src = userObj.avatar_url
        
        // append userName + profile + avatar to list
        userName.append(userProfile)
        userList.append(userName, userAvatar)
        
        // when userName is clicked...
        userName.addEventListener("click", getUserRepo)
        
        // ...show repo list of that user
        function getUserRepo(e) {
            
            fetch(`https://api.github.com/users/${userObj.login}/repos`, configObj)
            .then(r => r.json())
            .then(userRepoArr => {
                // grab repos-list element tag
                const repoUl = document.querySelector("#repos-list")
                // clear repos-list
                repoUl.innerHTML = ""
                
                // for each array item...
                userRepoArr.forEach(repo => {
                    // create <li> tag
                    const repoLi = document.createElement("li")
                    // append <li> to repos-list
                    repoUl.appendChild(repoLi)
                    // create <a href> tag inside <li>
                    repoLi.innerHTML = `
                    <a href=${repo.html_url} target=_blank>${repo.name}</a>
                    `                        
                })
        
            })
        
        }
    
    })
}
