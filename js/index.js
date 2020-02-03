/*** DOM ELEMENTS ***/
const githubForm = document.getElementById("github-form");
const userList = document.getElementById("user-list");
const reposList = document.getElementById("repos-list")

/*** EVENT LISTENERS ***/
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
  userNameLi = document.createElement("li");
  userNameLi.innerText = user.login;

  userAvatarLi = document.createElement("li");
  userAvatarImg = document.createElement("img");
  userAvatarImg.src = user.avatar_url;
  userAvatarLi.append(userAvatarImg);

  userReposLinkLi = document.createElement("li");
  userReposLinkA = document.createElement("a");
  userReposLinkA.id = "repos-link";
  userReposLinkA.href = `javascript:void(0)`;
  userReposLinkA.innerText = `Click here to see ${user.login}'s repos`;
  userReposLinkA.onclick = function() {
    reposFetch(user.login)
  };
  userReposLinkLi.append(userReposLinkA);

  dividerLi = document.createElement("li")
  dividerLi.innerText = "----------------------------------------"

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
  repoNameLi = document.createElement("li");
  repoNameLi.innerText = `Name: ${repo.name}`;

  repoUrlLi = document.createElement("li");
  RepoUrlA = document.createElement("a");
  RepoUrlA.href = repo.html_url;
  RepoUrlA.innerText = "Click to see this repo on Github";
  RepoUrlA.target = "_blank";
  repoUrlLi.append(RepoUrlA);

  repoLanguageLi = document.createElement("li");
  repoLanguageLi.innerText = `Language: ${repo.language}`;

  dividerLi = document.createElement("li")
  dividerLi.innerText = "----------------------------------------"

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
function clearChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
