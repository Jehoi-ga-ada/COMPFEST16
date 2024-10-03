// Function to fetch and initialize data
function initializeData() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Initialize checkboxes for filtering
      initializeJobCheckboxes(data);

      // Initialize the job market trend chart with all jobs initially
      initializeJobMarketTrendChart(data);

      // Initialize the job buttons and skills/courses for the first job by default
      initializeJobButtons(data);

      // Populate the Emerging Jobs section
      populateEmergingJobs(data);
      document
        .getElementById("show-monthly-rate")
        .addEventListener("change", () => {
          toggleMonthlyRates(data);
        });
    })
    .catch((error) => console.error("Error fetching the data:", error));
}

let jobMarketTrendChart = null;
let skillDemandChart = null;

// Function to populate the Emerging Jobs section
function populateEmergingJobs(data) {
  const jobs = data.jobs; // Get the list of jobs
  const emergingJobsBody = document.getElementById("emerging-jobs-body"); // Table body where rows will be added

  // Clear any existing rows
  emergingJobsBody.innerHTML = "";

  // Loop through each job and create a new row in the table
  jobs.forEach((job) => {
    const row = document.createElement("tr");

    // Job Title Cell
    const jobTitleCell = document.createElement("td");
    jobTitleCell.textContent = job.name; // Job title
    row.appendChild(jobTitleCell);

    // Overall Monthly Average Growth Cell with triangle indicator
    const overallGrowthCell = document.createElement("td");
    const overallGrowth = job["avg_monthly_growth (%)"].toFixed(2) + "%"; // Average monthly growth
    const overallTriangleSpan = document.createElement("span");
    overallTriangleSpan.classList.add("triangle");

    if (job["avg_monthly_growth (%)"] > 0) {
      overallTriangleSpan.classList.add("triangle-up"); // Upward triangle
      overallGrowthCell.classList.add("growth-positive"); // Positive growth
    } else {
      overallTriangleSpan.classList.add("triangle-down"); // Downward triangle
      overallGrowthCell.classList.add("growth-negative"); // Negative growth
    }

    overallGrowthCell.textContent = overallGrowth; // Set the text for overall growth
    overallGrowthCell.prepend(overallTriangleSpan); // Add triangle before text
    row.appendChild(overallGrowthCell);

    // Expected Growth Cell with triangle indicator
    const expectedGrowthCell = document.createElement("td");
    const expectedGrowth = job["expected_growth (%)"].toFixed(2) + "%"; // Expected growth
    const expectedTriangleSpan = document.createElement("span");
    expectedTriangleSpan.classList.add("triangle");

    if (job["expected_growth (%)"] > 0) {
      expectedTriangleSpan.classList.add("triangle-up"); // Upward triangle
      expectedGrowthCell.classList.add("growth-positive"); // Positive growth
    } else {
      expectedTriangleSpan.classList.add("triangle-down"); // Downward triangle
      expectedGrowthCell.classList.add("growth-negative"); // Negative growth
    }

    expectedGrowthCell.textContent = expectedGrowth; // Set the text for expected growth
    expectedGrowthCell.prepend(expectedTriangleSpan); // Add triangle before text
    row.appendChild(expectedGrowthCell);

    emergingJobsBody.appendChild(row); // Add the row to the table
  });
}

// Initialize Job Market Trend Chart
function initializeJobMarketTrendChart(data) {
  const ctx1 = document.getElementById("jobMarketTrendChart").getContext("2d");

  const selectedJobs = data.jobs.filter((job) => {
    const checkbox = document.getElementById(`checkbox-${job.name}`);
    return checkbox && checkbox.checked;
  });

  const jobMarketTrendData = {
    labels: [
      "Jan 2022",
      "Feb 2022",
      "Mar 2022",
      "Apr 2022",
      "May 2022",
      "Jun 2022",
      "Jul 2022",
      "Aug 2022",
      "Sep 2022",
      "Oct 2022",
    ],

    datasets: selectedJobs.map((job) => {
      // Concatenate trend data and prediction data
      const trendData = job.trendData;
      const predictionData = job.prediction || []; // Default to empty array if not provided
      const combinedData = trendData.concat(predictionData);

      return {
        label: job.name,
        data: combinedData,
        borderColor: getJobColor(job.name),
        fill: false,
      };
    }),
  };

  // Destroy existing chart instance if it exists
  if (jobMarketTrendChart) {
    jobMarketTrendChart.destroy();
  }

  // Create a new chart
  jobMarketTrendChart = new Chart(ctx1, {
    type: "line",
    data: jobMarketTrendData,
    options: {
      scales: {
        x: {
          ticks: {
            color: "#FFFFFF", // Font color for x-axis ticks
          },
          title: {
            color: "#FFFFFF", // Font color for x-axis title
          },
          grid: {
            color: "#2f2f4f", // Color of the grid lines for the x-axis
          },
        },
        y: {
          ticks: {
            color: "#FFFFFF", // Font color for y-axis ticks
          },
          title: {
            color: "#FFFFFF", // Font color for y-axis title
          },
          grid: {
            color: "#2f2f4f", // Color of the grid lines for the y-axis
          },
        },
      },
      plugins: {
        tooltip: {
          bodyColor: "#FFFFFF", // Font color for tooltip body text
          titleColor: "#FFFFFF", // Font color for tooltip title
          footerColor: "#FFFFFF", // Font color for tooltip footer
        },
        legend: {
          labels: {
            color: "#FFFFFF",
            boxWidth: 20,
            boxHeight: 20, // Text color of the legend labels
          },
        },
      },
    },
  });
}

// Function to fetch and initialize job checkboxes
function initializeJobCheckboxes(data) {
  const checkboxesContainer = document.getElementById("jobCheckboxes");

  // Add "Select All" checkbox
  const selectAllCheckbox = document.createElement("input");
  selectAllCheckbox.type = "checkbox";
  selectAllCheckbox.id = "select-all";
  selectAllCheckbox.addEventListener("change", () => {
    const allCheckboxes = document.querySelectorAll(
      '#jobCheckboxes input[type="checkbox"]:not(#select-all)'
    );
    allCheckboxes.forEach(
      (checkbox) => (checkbox.checked = selectAllCheckbox.checked)
    );
    updateJobMarketTrendChart(data); // Update chart when "Select All" is toggled
  });

  const selectAllLabel = document.createElement("label");
  selectAllLabel.htmlFor = "select-all";
  selectAllLabel.textContent = "Select All";

  checkboxesContainer.appendChild(selectAllCheckbox);
  checkboxesContainer.appendChild(selectAllLabel);

  // Add job checkboxes
  data.jobs.forEach((job) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkbox-${job.name}`;
    checkbox.value = job.name;
    checkbox.checked = true; // Initially, all checkboxes are checked
    checkbox.addEventListener("change", () => {
      updateJobMarketTrendChart(data); // Trigger chart update on checkbox change
    });

    const label = document.createElement("label");
    label.htmlFor = `checkbox-${job.name}`;
    label.textContent = job.name;

    const checkboxWrapper = document.createElement("div");
    checkboxWrapper.className = "checkbox-wrapper";
    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(label);

    checkboxesContainer.appendChild(checkboxWrapper);
  });
}

// Function to update Job Market Trend Chart
function updateJobMarketTrendChart(data) {
  const ctx1 = document.getElementById("jobMarketTrendChart").getContext("2d");

  const selectedJobs = data.jobs.filter((job) => {
    const checkbox = document.getElementById(`checkbox-${job.name}`);
    return checkbox && checkbox.checked;
  });

  const jobMarketTrendData = {
    labels: [
      "Jan 2022",
      "Feb 2022",
      "Mar 2022",
      "Apr 2022",
      "May 2022",
      "Jun 2022",
      "Jul 2022",
      "Aug 2022",
      "Sep 2022",
      "Oct 2022",
    ],
    datasets: selectedJobs.map((job) => {
      const trendData = job.trendData;
      const predictionData = job.prediction || [];
      const combinedData = trendData.concat(predictionData);

      return {
        label: job.name,
        data: combinedData,
        borderColor: getJobColor(job.name),
        fill: false,
      };
    }),
  };

  // Destroy existing chart instance if it exists
  if (jobMarketTrendChart) {
    jobMarketTrendChart.destroy();
  }

  // Create a new chart
  jobMarketTrendChart = new Chart(ctx1, {
    type: "line",
    data: jobMarketTrendData,
    options: {
      scales: {
        x: {
          ticks: {
            color: "#FFFFFF", // Font color for x-axis ticks
          },
          title: {
            color: "#FFFFFF", // Font color for x-axis title
          },
          grid: {
            color: "#2f2f4f", // Color of the grid lines for the x-axis
          },
        },
        y: {
          ticks: {
            color: "#FFFFFF", // Font color for y-axis ticks
          },
          title: {
            color: "#FFFFFF", // Font color for y-axis title
          },
          grid: {
            color: "#2f2f4f", // Color of the grid lines for the y-axis
          },
        },
      },
      plugins: {
        tooltip: {
          bodyColor: "#FFFFFF", // Font color for tooltip body text
          titleColor: "#FFFFFF", // Font color for tooltip title
          footerColor: "#FFFFFF", // Font color for tooltip footer
        },
        legend: {
          labels: {
            color: "#FFFFFF", // Text color of the legend labels
          },
        },
      },
    },
  });
}

// Initialize Job Buttons
function initializeJobButtons(data) {
  fetch("coursesData.json")
    .then((response) => response.json())
    .then((coursesData) => {
      const jobButtonsContainer = document.querySelector(".job-buttons");
      data.jobs.forEach((job) => {
        const button = document.createElement("button");
        button.textContent = job.name;
        button.addEventListener("click", () => {
          updateSkillsAndCourses(data, job.name, coursesData);
        });
        jobButtonsContainer.appendChild(button);
      });
    })
    .catch((error) => console.error("Error fetching the courses data:", error));
}

// Update Skills and Courses based on selected job
function updateSkillsAndCourses(data, jobName, coursesData) {
  const job = data.jobs.find((j) => j.name === jobName);
  const courses = coursesData[jobName];
  const skillsInfo = document.getElementById("skills-info");
  const skillsHeader = skillsInfo.querySelector("h3");
  skillsHeader.textContent = `Most Needed Skills for ${job.name}`;

  if (job) {
    // Show the hidden sections
    document.getElementById("skills-info").classList.remove("hidden");
    document.getElementById("courses-section").classList.remove("hidden");

    // Update the skills chart
    updateSkills(job.skills);
    // Update the courses
    updateCourses(courses);
  }
}

// Function to update the Skills Chart
function updateSkills(skills) {
  const skillLabels = skills.map((skill) => skill.name);
  const skillData = skills.map((skill) => skill.percentage);

  const ctx2 = document.getElementById("skillDemandChart").getContext("2d");

  // Destroy existing chart instance if it exists
  if (skillDemandChart) {
    skillDemandChart.destroy();
  }

  Chart.register(ChartDataLabels);

  // Create a new chart
  skillDemandChart = new Chart(ctx2, {
    type: "bar",
    data: {
      labels: skillLabels,
      datasets: [
        {
          label: "Percentage of Job Postings",
          data: skillData,
          backgroundColor: skillData.map((_, index) =>
            index % 2 === 0 ? "#8a7fd3" : "#ff69b4"
          ),
          borderColor: skillData.map((_, index) =>
            index % 2 === 0 ? "#8a7fd3" : "#ff69b4"
          ),
          borderWidth: 1,
          borderRadius: 2,
          barThickness: 20,
          hoverBackgroundColor: skillData.map((_, index) =>
            index % 2 === 0 ? "#6c5ab8" : "#ff1493"
          ),
        },
      ],
    },
    options: {
      maintainAspectRation: false,
      indexAxis: "y",
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: "#2f2f4f",
          },
          ticks: {
            color: "#FFFFFF",
          },
        },
        y: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#FFFFFF",
            font: {
              size: 14,
              weight: "500",
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "#424274",
          titleFont: { size: 14 },
          bodyFont: { size: 14 },
          footerFont: { size: 14 },
          cornerRadius: 5,
        },
        datalabels: {
          anchor: "end",
          align: "right",
          color: "#c3c3dd",
          font: {
            size: 14,
            weight: "bold",
          },
          formatter: (value) => value + "%",
        },
      },
    },
  });
}

// Function to update the Courses Section
function updateCourses(courses) {
  const coursesContainer = document.querySelector("#courses-section");
  coursesContainer.innerHTML = "<h2>Get started with these courses!</h2>";

  courses.forEach((course) => {
    const courseElement = document.createElement("div");
    courseElement.className = "course";
    courseElement.innerHTML = `
          <a href="${course.url}" target="_blank">
          <div class="course-content">
            <div class="course-info">
              <h4>${course.title}</h4>
              <p>by ${course.provider}</p>
              <button class="course-button">Available on Udemy</button>
            </div>
            <div class="course-image">
              <img src="${course.image}" alt="${course.title}">
            </div>
          </div>
        </a>
      `;
    coursesContainer.appendChild(courseElement);
  });
}

function getJobColor(jobName) {
  const jobColors = {
    "Artificial Intelligence/Machine Learning (AI/ML) Engineer": "#ff6699", // Ensure job names are correct
    "Business Analyst": "#00FF00",
    "Cloud Engineer": "#00FFFF",
    "Cybersecurity Analyst": "#FFCC00",
    "Data Engineer": "#FF6600",
    "Data Scientist": "#CC00FF",
    "Database Administrator (DBA)": "#FFA500", // Ensure job names match
    "DevOps Engineer": "#66FF99",
    "IT Consultant": "#33CCFF",
    "IT Manager": "#FF3399",
    "IT Project Manager": "#99FFCC",
    "IT Support Specialist": "#FF00FF",
    "Information Security Manager": "#FFFF00",
    "Network Administrator": "#00FFCC",
    "Quality Assurance (QA) Tester/Engineer": "#FF9999", // Ensure job names match
    "Software Developer/Engineer": "#FF3366",
    "Systems Analyst": "#33FF99",
    "Systems Architect": "#FF6600",
    "Technical Support Engineer": "#FF99FF",
    "Web Developer": "#6699FF",
  };

  return jobColors[jobName] || "#FFFFFF"; // Default to white if no color found
}

// Add this function to show/hide monthly rates based on checkbox state
// Add this function to show/hide monthly rates and average growth based on checkbox state
function toggleMonthlyRates(data) {
  const monthlyRateContainer = document.getElementById(
    "monthly-rate-container"
  );
  const averageGrowthTable = document.querySelector(".emerging-jobs-table"); // Select the average growth table
  const showMonthlyRateCheckbox = document.getElementById("show-monthly-rate");

  // Show/hide monthly rates and average growth table based on checkbox state
  if (showMonthlyRateCheckbox.checked) {
    monthlyRateContainer.classList.remove("hidden");
    averageGrowthTable.classList.add("hidden"); // Hide average growth table
    populateMonthlyRates(data); // Call the function to populate monthly rates
  } else {
    monthlyRateContainer.classList.add("hidden");
    averageGrowthTable.classList.remove("hidden"); // Show average growth table
  }
}

// Function to populate monthly rates in the table
function populateMonthlyRates(data) {
  const monthlyRateBody = document.getElementById("monthly-rate-body");
  const jobs = data.jobs; // Get the list of jobs

  // Clear any existing monthly rates
  monthlyRateBody.innerHTML = "";

  // Loop through each job and create a new row for the monthly rates
  jobs.forEach((job) => {
    const row = document.createElement("div");
    row.className = "monthly-rate-row"; // Add a class for styling

    // Job Title
    const jobTitleCell = document.createElement("div");
    jobTitleCell.textContent = job.name; // Job title
    row.appendChild(jobTitleCell);

    // Create cells for each month based on monthly_growth data
    const monthlyGrowth = job["monthly_growth (%)"];
    monthlyGrowth.forEach((growth) => {
      const cell = document.createElement("div");

      // Create triangle indicator
      const triangleSpan = document.createElement("span");
      triangleSpan.classList.add("triangle");

      // Determine if growth is positive or negative
      if (growth > 0) {
        triangleSpan.classList.add("triangle-up"); // Upward triangle
        cell.classList.add("growth-positive"); // Positive growth
      } else {
        triangleSpan.classList.add("triangle-down"); // Downward triangle
        cell.classList.add("growth-negative"); // Negative growth
      }

      // Set triangle position and append to cell
      cell.appendChild(triangleSpan);
      cell.appendChild(document.createTextNode(`${growth}%`)); // Monthly growth value
      row.appendChild(cell);
    });

    // Expected Growth
    const expectedGrowthCell = document.createElement("div");
    expectedGrowthCell.textContent = `${job["expected_growth (%)"].toFixed(
      2
    )}%`; // Expected growth
    const expectedTriangleSpan = document.createElement("span");
    expectedTriangleSpan.classList.add("triangle");

    if (job["expected_growth (%)"] > 0) {
      expectedTriangleSpan.classList.add("triangle-up"); // Upward triangle
      expectedGrowthCell.classList.add("growth-positive"); // Positive growth
    } else {
      expectedTriangleSpan.classList.add("triangle-down"); // Downward triangle
      expectedGrowthCell.classList.add("growth-negative"); // Negative growth
    }

    expectedGrowthCell.prepend(expectedTriangleSpan); // Add triangle before text
    row.appendChild(expectedGrowthCell);

    monthlyRateBody.appendChild(row); // Add the row to the monthly rates container
  });
}

// Add event listener to the checkbox
document.getElementById("show-monthly-rate").addEventListener("change", () => {
  toggleMonthlyRates(data);
});

let sortAscending = true; // State for sorting order

// Function to sort and update the expected growth table
function sortExpectedGrowth(data) {
  const jobs = data.jobs.slice(); // Clone the jobs array to avoid mutating the original
  const emergingJobsBody = document.getElementById("emerging-jobs-body");

  // Sort jobs based on expected growth
  jobs.sort((a, b) => {
    return sortAscending
      ? parseFloat(a["expected_growth (%)"]) -
          parseFloat(b["expected_growth (%)"])
      : parseFloat(b["expected_growth (%)"]) -
          parseFloat(a["expected_growth (%)"]);
  });

  // Clear the existing rows
  emergingJobsBody.innerHTML = "";

  // Populate the table with sorted jobs
  jobs.forEach((job) => {
    const row = document.createElement("tr");

    // Job Title Cell
    const jobTitleCell = document.createElement("td");
    jobTitleCell.textContent = job.name; // Job title
    row.appendChild(jobTitleCell);

    // Overall Monthly Average Growth Cell with triangle indicator
    const overallGrowthCell = document.createElement("td");
    const overallGrowth = job["avg_monthly_growth (%)"].toFixed(2) + "%"; // Average monthly growth
    const overallTriangleSpan = document.createElement("span");
    overallTriangleSpan.classList.add("triangle");

    if (job["avg_monthly_growth (%)"] > 0) {
      overallTriangleSpan.classList.add("triangle-up"); // Upward triangle
      overallGrowthCell.classList.add("growth-positive"); // Positive growth
    } else {
      overallTriangleSpan.classList.add("triangle-down"); // Downward triangle
      overallGrowthCell.classList.add("growth-negative"); // Negative growth
    }

    overallGrowthCell.textContent = overallGrowth; // Set the text for overall growth
    overallGrowthCell.prepend(overallTriangleSpan); // Add triangle before text
    row.appendChild(overallGrowthCell);

    // Expected Growth Cell with triangle indicator
    const expectedGrowthCell = document.createElement("td");
    const expectedGrowth = job["expected_growth (%)"].toFixed(2) + "%"; // Expected growth
    const expectedTriangleSpan = document.createElement("span");
    expectedTriangleSpan.classList.add("triangle");

    if (job["expected_growth (%)"] > 0) {
      expectedTriangleSpan.classList.add("triangle-up"); // Upward triangle
      expectedGrowthCell.classList.add("growth-positive"); // Positive growth
    } else {
      expectedTriangleSpan.classList.add("triangle-down"); // Downward triangle
      expectedGrowthCell.classList.add("growth-negative"); // Negative growth
    }

    expectedGrowthCell.textContent = expectedGrowth; // Set the text for expected growth
    expectedGrowthCell.prepend(expectedTriangleSpan); // Add triangle before text
    row.appendChild(expectedGrowthCell);

    emergingJobsBody.appendChild(row); // Add the row to the table
  });
}

// Add event listener to the sort button
document.getElementById("sort-button").addEventListener("click", () => {
  sortAscending = !sortAscending; // Toggle sort order
  const sortButton = document.getElementById("sort-button");

  // Change the triangle direction based on the sort order
  if (sortAscending) {
    sortButton.classList.remove("sort-desc");
    sortButton.classList.add("sort-asc");
  } else {
    sortButton.classList.remove("sort-asc");
    sortButton.classList.add("sort-desc");
  }

  sortExpectedGrowth(data); // Call the sort function
});

// Initialize everything when the page loads
document.addEventListener("DOMContentLoaded", initializeData);
