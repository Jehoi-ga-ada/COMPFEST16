// Function to fetch and initialize data
function initializeData() {
  fetch('/backend/src/data/data-renamed.json')
      .then(response => response.json())
      .then(data => {
          // Initialize checkboxes for filtering
          initializeJobCheckboxes(data);

          // Initialize the job market trend chart with all jobs initially
          initializeJobMarketTrendChart(data);

          // Initialize the job buttons and skills/courses for the first job by default
          initializeJobButtons(data);
        })
      .catch(error => console.error('Error fetching the data:', error));
}

let jobMarketTrendChart = null;
let skillDemandChart = null;

// Initialize Job Market Trend Chart
function initializeJobMarketTrendChart(data) {
  const ctx1 = document.getElementById('jobMarketTrendChart').getContext('2d');
  
  const selectedJobs = data.jobs.filter(job => {
      const checkbox = document.getElementById(`checkbox-${job.name}`);
      return checkbox && checkbox.checked;
  });

  const jobMarketTrendData = {
    labels: ['Jan 2022', 'Feb 2022', 'Mar 2022', 'Apr 2022', 'May 2022', 'Jun 2022', 'Jul 2022', 'Aug 2022', 'Sep 2022', 'Oct 2022'],
 
    datasets: selectedJobs.map(job => {
        // Concatenate trend data and prediction data
        const trendData = job.trendData;
        const predictionData = job.prediction || []; // Default to empty array if not provided
        const combinedData = trendData.concat(predictionData);
  
        return {
          label: job.name,
          data: combinedData,
          borderColor: getJobColor(job.name),
          fill: false
        };
      })
  };

  // Destroy existing chart instance if it exists
  if (jobMarketTrendChart) {
      jobMarketTrendChart.destroy();
  }

  // Create a new chart
  jobMarketTrendChart = new Chart(ctx1, {
    type: 'line',
    data: jobMarketTrendData,
    options: {
      scales: {
        x: {
            ticks: {
              color: '#FFFFFF', // Font color for x-axis ticks
            },
            title: {
              color: '#FFFFFF', // Font color for x-axis title
            },
            grid: {
                color: '#2f2f4f', // Color of the grid lines for the x-axis
              },
          },
          y: {
            ticks: {
              color: '#FFFFFF', // Font color for y-axis ticks
            },
            title: {
              color: '#FFFFFF', // Font color for y-axis title
            },
            grid: {
                color: '#2f2f4f', // Color of the grid lines for the y-axis
              },
          },
      },
      plugins: {
        tooltip: {
            bodyColor: '#FFFFFF', // Font color for tooltip body text
            titleColor: '#FFFFFF', // Font color for tooltip title
            footerColor: '#FFFFFF', // Font color for tooltip footer
        },
        annotation: {
          annotations: {
            verticalLine: {
              type: 'line',
              xMin: 'Sep 2022',
              xMax: 'Sep 2022',
              borderColor: 'white',
              borderWidth: 2,
              borderDash: [5, 5], // Dotted line style
            },
            leftLabel: {
              type: 'label',
              xValue: 'May 2022',
              yValue: 95, 
              borderColor: 'rgba(0, 0, 0, 0.8)',
              padding: { top: 5, bottom: 5, left: 125, right: 10 },
              color: 'white',
              font: {
                size: 12 
              },
              content: 'Trend',
              position: 'top'
            },
            rightLabel: {
              type: 'label',
              xValue: 'Sep 2022',
              yValue: 95, 
              borderColor: 'rgba(0, 0, 0, 0.8)',
              padding: { top: 5, bottom: 5, left: 125, right: 10 },
              color: 'white',
              content: 'Prediction',
              position: 'top'
            }
          }
        },
        legend : {
            labels: {
                // Style the legend box
                boxWidth: 10, // Width of the legend box
                boxHeight: 10, // Height of the legend box
                padding: 10, // Padding around the legend box
                color: 'black', // Text color
                font: {
                  size: 12 // Font size for the legend text
                },
                color: '#FFFFFF'
            }
        }
      }
    }
  });
}


function initializeJobCheckboxes(data) {
    const checkboxesContainer = document.getElementById('jobCheckboxes');
    
    // Add "Select All" checkbox
    const selectAllCheckbox = document.createElement('input');
    selectAllCheckbox.type = 'checkbox';
    selectAllCheckbox.id = 'select-all';
    selectAllCheckbox.addEventListener('change', () => {
        const allCheckboxes = document.querySelectorAll('#jobCheckboxes input[type="checkbox"]:not(#select-all)');
        allCheckboxes.forEach(checkbox => checkbox.checked = selectAllCheckbox.checked);
        updateJobMarketTrendChart(data); // Update chart when "Select All" is toggled
    });
  
    const selectAllLabel = document.createElement('label');
    selectAllLabel.htmlFor = 'select-all';
    selectAllLabel.textContent = 'Select All';
  
    checkboxesContainer.appendChild(selectAllCheckbox);
    checkboxesContainer.appendChild(selectAllLabel);
  
    // Add job checkboxes
    data.jobs.forEach(job => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `checkbox-${job.name}`;
        checkbox.value = job.name;
        checkbox.checked = true; // Initially, all checkboxes are checked
        checkbox.addEventListener('change', () => {
            updateJobMarketTrendChart(data); // Trigger chart update on checkbox change
        });
  
        const label = document.createElement('label');
        label.htmlFor = `checkbox-${job.name}`;
        label.textContent = job.name;
  
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.className = 'checkbox-wrapper';
        checkboxWrapper.appendChild(checkbox);
        checkboxWrapper.appendChild(label);
  
        checkboxesContainer.appendChild(checkboxWrapper);
    });
  }

function updateJobMarketTrendChart(data) {
    const ctx1 = document.getElementById('jobMarketTrendChart').getContext('2d');
  
    const selectedJobs = data.jobs.filter(job => {
        const checkbox = document.getElementById(`checkbox-${job.name}`);
        return checkbox && checkbox.checked;
    });
  
    const jobMarketTrendData = {
      labels: ['Jan 2022', 'Feb 2022', 'Mar 2022', 'Apr 2022', 'May 2022', 'Jun 2022', 'Jul 2022', 'Aug 2022', 'Sep 2022', 'Oct 2022'],
      datasets: selectedJobs.map(job => {
        // Concatenate trend data and prediction data
        const trendData = job.trendData;
        const predictionData = job.prediction || []; // Default to empty array if not provided
        const combinedData = trendData.concat(predictionData);
  
        return {
          label: job.name,
          data: combinedData,
          borderColor: getJobColor(job.name), // Use distinct neon colors
          fill: false
        };
      })
    };
  
    // Destroy existing chart instance if it exists
    if (jobMarketTrendChart) {
        jobMarketTrendChart.destroy();
    }
  
    // Create a new chart
    jobMarketTrendChart = new Chart(ctx1, {
      type: 'line',
      data: jobMarketTrendData,
      options: {
        scales: {
          x: {
              ticks: {
                color: '#FFFFFF', // Font color for x-axis ticks
              },
              title: {
                color: '#FFFFFF', // Font color for x-axis title
              },
              grid: {
                  color: '#2f2f4f', // Color of the grid lines for the x-axis
                },
            },
            y: {
              ticks: {
                color: '#FFFFFF', // Font color for y-axis ticks
              },
              title: {
                color: '#FFFFFF', // Font color for y-axis title
              },
              grid: {
                  color: '#2f2f4f', // Color of the grid lines for the y-axis
                },
            },
        },
        plugins: {
          tooltip: {
              bodyColor: '#FFFFFF', // Font color for tooltip body text
              titleColor: '#FFFFFF', // Font color for tooltip title
              footerColor: '#FFFFFF', // Font color for tooltip footer
          },
          annotation: {
            annotations: {
              verticalLine: {
                type: 'line',
                xMin: 'Sep 2022',
                xMax: 'Sep 2022',
                borderColor: 'white',
                borderWidth: 2,
                borderDash: [5, 5], // Dotted line style
              },
              leftLabel: {
                type: 'label',
                xValue: 'May 2022',
                yValue: 95, 
                borderColor: 'rgba(0, 0, 0, 0.8)',
                padding: { top: 5, bottom: 5, left: 125, right: 10 },
                color: 'white',
                font: {
                  size: 12 
                },
                content: 'Trend',
                position: 'top'
              },
              rightLabel: {
                type: 'label',
                xValue: 'Sep 2022',
                yValue: 95, 
                borderColor: 'rgba(0, 0, 0, 0.8)',
                padding: { top: 5, bottom: 5, left: 125, right: 10 },
                color: 'white',
                content: 'Prediction',
                position: 'top'
              }
            }
          },
          legend : {
              labels: {
                  boxWidth: 10, // Width of the legend box
                  boxHeight: 10, // Height of the legend box
                  padding: 10, // Padding around the legend box
                  color: 'black', // Text color
                  font: {
                    size: 12 // Font size for the legend text
                  },
                  color: '#FFFFFF'
              }
          }
        }
      }
    });
  }


// Initialize Job Buttons
function initializeJobButtons(data) {
    fetch('/backend/src/data/coursesData.json')
        .then(response => response.json())
        .then(coursesData => {
            const jobButtonsContainer = document.querySelector('.job-buttons');
            data.jobs.forEach(job => {
                const button = document.createElement('button');
                button.textContent = job.name;
                button.addEventListener('click', () => {
                    updateSkillsAndCourses(data, job.name, coursesData);
                });
                jobButtonsContainer.appendChild(button);
            });
        })
    .catch(error => console.error('Error fetching the courses data:', error));
}

// Update Skills and Courses based on selected job
function updateSkillsAndCourses(data, jobName, coursesData) {
  const job = data.jobs.find(j => j.name === jobName);
  const courses = coursesData[jobName];
  const skillsInfo = document.getElementById('skills-info');
  const skillsHeader = skillsInfo.querySelector('h3');
  skillsHeader.textContent = `Most Needed Skills for ${job.name}`;

  if (job) {
      // Show the hidden sections
      document.getElementById('skills-info').classList.remove('hidden');
      document.getElementById('courses-section').classList.remove('hidden');
      
      // Update the skills chart
      updateSkills(job.skills);
      // Update the courses
      updateCourses(courses);
  }
}

// Function to update the Skills Chart
function updateSkills(skills) {
  const skillLabels = skills.map(skill => skill.name);
  const skillData = skills.map(skill => skill.percentage);

  const ctx2 = document.getElementById('skillDemandChart').getContext('2d');
  
  // Destroy existing chart instance if it exists
  if (skillDemandChart) {
      skillDemandChart.destroy();
  }

  Chart.register(ChartDataLabels);

  // Create a new chart
  skillDemandChart = new Chart(ctx2, {
      type: 'bar',
      data: {
          labels: skillLabels,
          datasets: [{
            label: "Percentage of Job Postings",
            data: skillData,
            backgroundColor: skillData.map((_, index) =>
              index % 2 === 0 ? "#8a7fd3" : "#ff69b4"
            ), // Alternate between purple and pink
            borderColor: skillData.map((_, index) =>
              index % 2 === 0 ? "#8a7fd3" : "#ff69b4"
            ), // Border colors match the bar colors
            borderWidth: 1,
            borderRadius: 5, // Rounded corners
            barThickness: 30, // Controls the thickness of the bars
            hoverBackgroundColor: skillData.map((_, index) =>
              index % 2 === 0 ? "#6c5ab8" : "#ff1493"
            ),
          }]
      },
      options: {
        maintainAspectRation: false,
        indexAxis: "y", // Horizontal bars
        scales: {
          x: {
            beginAtZero: true,
            max: 100, // Ensure the x-axis runs from 0 to 100
            grid: {
              color: "#2f2f4f", // Grid line color
            },
            ticks: {
              color: "#FFFFFF", // X-axis label color
            },
          },
          y: {
            grid: {
              display: false, // Remove grid lines for the Y-axis
            },
            ticks: {
              color: "#FFFFFF", // Y-axis label color
              font: {
                size: 14, // Font size for skill labels
                weight: "500", // Font weight for skill labels
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
          tooltip: {
            backgroundColor: "#424274", // Tooltip background color
            titleFont: { size: 14 },
            bodyFont: { size: 14 },
            footerFont: { size: 14 },
            cornerRadius: 5, // Tooltip corner radius
          },
          datalabels: {
            anchor: "end",
            align: "right",
            color: "#c3c3dd",
            font: {
              size: 14,
              weight: "bold",
            },
            formatter: (value) => value + '%',
          },
        },
      }
  });
}


// Function to update the Courses Section
function updateCourses(courses) {
  const coursesContainer = document.querySelector('#courses-section');
  coursesContainer.innerHTML = '<h2>Get started with these courses!</h2>'; // Clear previous courses and add header

  courses.forEach(course => {
      const courseElement = document.createElement('div');
      courseElement.className = 'course';
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
    const jobColors = [
    '#FF007F', '#00FF00', '#00FFFF', '#FFCC00', '#FF6600', '#CC00FF',
    '#FF0033', '#66FF99', '#33CCFF', '#FF3399', '#99FFCC', '#FF00FF',
    '#FFFF00', '#00FFCC', '#FF9900', '#CCFF00', '#FF3366', '#33FF99',
    '#FF6600', '#FF99FF'
    ];
    
    const jobNames = [
      'AI / ML Engineer', 'Business Analyst', 'Cloud Engineer', 'Cybersecurity Analyst',
      'Data Engineer', 'Data Scientist', 'Database Administrator', 'DevOps Engineer',
      'IT Consultant', 'IT Manager', 'IT Project Manager', 'IT Support Specialist',
      'Information Security Manager', 'Network Administrator', 'QA Tester/Engineer',
      'Software Developer/Engineer', 'Systems Analyst', 'Systems Architect',
      'Technical Support Engineer', 'Web Developer'
    ];
  
    const index = jobNames.indexOf(jobName);
    return jobColors[index % jobColors.length]; // Ensure color index is within bounds
  }

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', initializeData);
