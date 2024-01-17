const API_URL = "https://api.github.com/users/";
let currentPage = 1;
let repositoriesPerPage = 10;

async function getRepositories() {
  try {
    showLoader();
    const username = getUsername();
    repositoriesPerPage = getRepositoriesPerPage();
    const url = buildApiUrl(username, repositoriesPerPage, currentPage);
    const data = await fetchData(url);
    hideLoader();
    displayRepositories(data);
    displayPagination();
  } catch (error) {
    console.error("Error fetching repositories:", error);
    hideLoader();
  }
}

function getUsername() {
  return document.getElementById("username").value.trim();
}

function getRepositoriesPerPage() {
  return parseInt(document.getElementById("perPage").value, 10);
}

function buildApiUrl(username, perPage, currentPage) {
  return `${API_URL}${username}/repos?per_page=${perPage}&page=${currentPage}`;
}

async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}

function showLoader() {
  document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

function displayRepositories(repositories) {
  const repositoryList = document.getElementById("repository-list");
  repositoryList.innerHTML = "";

  repositories.forEach((repo) => {
    const repoItem = createRepoItem(repo);
    repositoryList.insertAdjacentHTML("beforeend", repoItem);
  });
}

function createRepoItem(repo) {
  return `
    <div class="card mb-3">
      <div class="card-body">
        <a class="card-title" href='${repo.html_url}'>${repo.name}</a>
        <p class="card-text">${
          repo.description || "No description available"
        }</p>
        <p class="card-text">Language: ${repo.language || "Not specified"}</p>
        <p class="card-text">Topics: ${
          repo.topics ? repo.topics.join(", ") : "No Topics"
        }</p>
      </div>
    </div>`;
}

function displayPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(repositoriesPerPage / currentPage);
  const numButtonsToShow = 5; // Number of pagination buttons to show

  const startPage = Math.max(1, currentPage - Math.floor(numButtonsToShow / 2));
  const endPage = Math.min(totalPages, startPage + numButtonsToShow - 1);

  const prevBtn = createPaginationButton("Previous", currentPage - 1);
  pagination.insertAdjacentHTML("beforeend", prevBtn);

  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = createPaginationButton(i, i);
    pagination.insertAdjacentHTML("beforeend", pageBtn);
  }

  const nextBtn = createPaginationButton("Next", currentPage + 1);
  pagination.insertAdjacentHTML("beforeend", nextBtn);
}

function createPaginationButton(label, page) {
  return `<button class="btn btn-primary ${
    page <= 0 || page > Math.ceil(repositoriesPerPage / currentPage)
      ? "disabled"
      : ""
  }" onclick="changePage(${page})">${label}</button>`;
}

async function changePage(newPage) {
  if (newPage > 0 && newPage <= Math.ceil(repositoriesPerPage / currentPage)) {
    currentPage = newPage;
    await getRepositories();
  }
}

// Initial load
getRepositories();
