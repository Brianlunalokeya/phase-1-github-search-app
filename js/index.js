const BASE_URL = 'https://api.github.com';

const form = document.querySelector('#github-form');
const searchInput = document.querySelector('#search');
const userList = document.querySelector('#user-list');
const reposList = document.querySelector('#repos-list');
const toggleBtn = document.createElement('button');
toggleBtn.innerText = 'Toggle Search Type';
form.appendChild(toggleBtn);

let searchType = 'user';

form.addEventListener('submit', handleSearch);
toggleBtn.addEventListener('click', toggleSearchType);

function handleSearch(event) {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchType === 'user') {
    searchUsers(searchTerm);
  } else {
    searchRepos(searchTerm);
  }
}

async function searchUsers(query) {
  const url = `${BASE_URL}/search/users?q=${query}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const users = data.items;
  userList.innerHTML = '';
  reposList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = user.html_url;
    link.innerText = user.login;
    const img = document.createElement('img');
    img.src = user.avatar_url;
    li.appendChild(img);
    li.appendChild(link);
    li.addEventListener('click', () => showUserRepos(user.login));
    userList.appendChild(li);
  });
}

async function showUserRepos(username) {
  const url = `${BASE_URL}/users/${username}/repos`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  reposList.innerHTML = '';
  data.forEach(repo => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = repo.html_url;
    link.innerText = repo.name;
    li.appendChild(link);
    reposList.appendChild(li);
  });
}

async function searchRepos(query) {
  const url = `${BASE_URL}/search/repositories?q=${query}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const repos = data.items;
  userList.innerHTML = '';
  reposList.innerHTML = '';
  repos.forEach(repo => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = repo.html_url;
    link.innerText = repo.full_name;
    li.appendChild(link);
    reposList.appendChild(li);
  });
}

function toggleSearchType() {
  searchType = searchType === 'user' ? 'repo' : 'user';
  searchInput.placeholder = `Search ${searchType === 'user' ? 'Users' : 'Repositories'}...`;
}
