document.addEventListener('DOMContentLoaded', () => {
// START OF CODE

  /*** DOM ELEMENTS ***/
  const githubForm = document.getElementById("github-form");
  const userList = document.getElementById("user-list");
  const reposList = document.getElementById("repos-list")

  /*** EVENT LISTENERS ***/
  // adds listener that handles a submit to the search form
  githubForm.addEventListener("submit", handleSearchSubmit);

  /*** EVENT HANDLERS ***/
  //handles submitting a user search
  function handleSearchSubmit(event) {
    event.preventDefault();

    enteredUsername = event.target["search"].value;
    searchFetch(enteredUsername);
  };


  /*** FETCHES ***/
  // fetch users from search form
  function searchFetch(username) {
    fetch(`https://api.github.com/search/users?q=${enteredUsername}`)
    .then( response => response.json() )
    .then( json => renderUserResults(json));
  };
  // fetch repositories when user repo link is clicked
  function reposFetch(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
    .then( response => response.json() )
    .then( json => renderUserRepos(json) );
  };


  /*** RENDER FUNCTIONS ***/
  // functions to handle rendering users to body
  function renderOneUser(user) {
    //creates an <li> element with the user's username
    userNameLi = document.createElement("li");
    userNameLi.innerText = user.login;

    // creates user avatar <li> element and appends <img> tag to it
    userAvatarLi = document.createElement("li");
    userAvatarImg = document.createElement("img");
    userAvatarImg.src = user.avatar_url;
    userAvatarLi.append(userAvatarImg);

    // creates li element for a link to user's repos, and adds an .onclick function to it that runs a         seperate fetch to the repo API
    userReposLinkLi = document.createElement("li");
    userReposLinkA = document.createElement("a");
    userReposLinkA.id = "repos-link";
    userReposLinkA.href = `javascript:void(0)`;
    userReposLinkA.innerText = `Click here to see ${user.login}'s repos`;
    userReposLinkA.onclick = function() {
      reposFetch(user.login)
    };
    userReposLinkLi.append(userReposLinkA);

    // creates a "blank" li element that serves only as a divider between users in the <ul>
    dividerLi = document.createElement("li")
    dividerLi.innerText = "----------------------------------------"

    // appends all fo the above to the userList <ul>
    userList.append(userNameLi);
    userList.append(userAvatarLi);
    userList.append(userReposLinkLi);
    userList.append(dividerLi);
  };
  function renderUserResults(json) {
    clearChildren(reposList)
    clearChildren(userList);
    json.items.forEach( user => renderOneUser(user) );
  };

  //functions to handle rendering repos to body
  function renderOneRepo(repo) {
    //creates an <li> element with the repo's name
    repoNameLi = document.createElement("li");
    repoNameLi.innerText = `Name: ${repo.name}`;

    // creates an <li> element that holds a link to the listed repo, adds an <a> to it with the proper url,   and adds a target to it that opens the link in a new tab
    repoUrlLi = document.createElement("li");
    RepoUrlA = document.createElement("a");
    RepoUrlA.href = repo.html_url;
    RepoUrlA.innerText = "Click to see this repo on Github";
    RepoUrlA.target = "_blank";
    repoUrlLi.append(RepoUrlA);

    // creates an <li> with the repo's language
    repoLanguageLi = document.createElement("li");
    repoLanguageLi.innerText = `Language: ${repo.language}`;

    // creates a "blank" li element that serves only as a divider between users in the <ul>
    dividerLi = document.createElement("li")
    dividerLi.innerText = "----------------------------------------"

    // appends all fo the above to the reposList <ul>
    reposList.append(repoNameLi);
    reposList.append(repoLanguageLi);
    reposList.append(repoUrlLi);
    reposList.append(dividerLi);
  };
  function renderUserRepos(json) {
    clearChildren(userList);
    json.forEach( repo => renderOneRepo(repo) );
  };


  /*** MISC. FUNCTIONS ***/
  // a helper function to clear all the children of an element and "refresh" it
  function clearChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

// END OF CODE
})
