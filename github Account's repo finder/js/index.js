const API_URL = "https://api.github.com/users/";
let currentPage = 1;
let repositoriesPerPage = 10;

function getRepositories() {
  const username = $("#username").val().trim();
  repositoriesPerPage = parseInt($("#perPage").val());
  const url = `${API_URL}${username}/repos?per_page=${repositoriesPerPage}&page=${currentPage}`;

  $("#repository-list").empty();
  $("#loader").show();

  $.get(url, function (data) {
    $("#loader").hide();
    displayRepositories(data);
    displayPagination();
  });
}

function displayRepositories(repositories) {
  const repositoryList = $("#repository-list");
  repositoryList.empty();

  repositories.forEach(function (repo) {
    console.log(repo);
    const repoItem = `
    <div class="card mb-3">
     <div class="card-body">
    <a class="card-title" href='${repo.html_url}'>${repo.name}</a>
    <p class="card-text">${repo.description || "No description available"}</p>
    <p class="card-text">Language: ${repo.language || "Not specified"}</p>
    <p class="card-text">Topics: ${repo.topics || "No Topics"}</p>
  </div>
  </div>`;

    repositoryList.append(repoItem);
  });
}

function displayPagination() {
  const pagination = $("#pagination");
  pagination.empty();

  const totalPages = Math.ceil(repositoriesPerPage / currentPage);
  const prevBtn = `<button class="btn btn-primary ${
    currentPage === 1 ? "disabled" : ""
  }" onclick="changePage(${currentPage - 1})">Previous</button>`;
  const nextBtn = `<button class="btn btn-primary" onclick="changePage(${
    currentPage + 1
  })">Next</button>`;

  pagination.append(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = `<button class="btn btn-outline-primary ${
      currentPage === i ? "active" : ""
    }" onclick="changePage(${i})">${i}</button>`;
    pagination.append(pageBtn);
  }

  pagination.append(nextBtn);
}

function changePage(newPage) {
  if (newPage > 0 && newPage <= Math.ceil(repositoriesPerPage / currentPage)) {
    currentPage = newPage;
    getRepositories();
  }
}
