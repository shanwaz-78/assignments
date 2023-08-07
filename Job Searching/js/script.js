const featuredJobs = [
  {
    title: "Software Engineer",
    company: "Awesome Tech Inc.",
    location: "Remote",
    description:
      "We are looking for a talented software engineer to join our team...",
    applyLink: "",
  },
  {
    title: "Product Manager",
    company: "Innovative Solutions Ltd.",
    location: "Bangalore, India",
    description:
      "We are seeking a highly motivated product manager with a passion for...",
    applyLink: "",
  },
  // Add more job listings as needed
];

document.addEventListener("DOMContentLoaded", () => {
  const jobListingsContainer = document.querySelector("#featured-jobs .row");

  featuredJobs.forEach((job) => {
    const jobListing = `
      <div class="col-md-4">
        <div class="card mb-4 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${job.title}</h5>
            <p class="card-text">${job.company} - ${job.location}</p>
            <p>${job.description}</p>
            <a href="${job.applyLink}" class="btn btn-primary">Apply Now</a>
          </div>
        </div>
      </div>
    `;

    jobListingsContainer.innerHTML += jobListing;
  });
});
