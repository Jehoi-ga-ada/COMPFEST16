let skillDemandChart = null;

function updateSkillsAndCourses(jobName) {
  const skills = getSkillsForJob(jobName);
  const courses = getCoursesForJob(jobName);

  document.getElementById("skills-section").classList.remove("hidden");
  document.getElementById("courses-section").classList.remove("hidden");

  document.getElementById(
    "skills-title"
  ).textContent = `Most Needed Skills for ${jobName}`;
  updateSkills(skills);
  updateCourses(courses);

  scrollToSkillsSection();
}

function getSkillsForJob(jobName) {
  const skillsData = {
    "AI / ML Engineer": [
      { name: "Python", percentage: 86.02 },
      { name: "Machine Learning", percentage: 82.15 },
      { name: "TensorFlow", percentage: 70.54 },
      { name: "Pytorch", percentage: 55.27 },
      { name: "AWS", percentage: 35.91 },
      { name: "Deep Learning", percentage: 34.84 },
      { name: "Java", percentage: 30.54 },
      { name: "Azure", percentage: 29.68 },
      { name: "Scala", percentage: 26.02 },
      { name: "Data Preparation", percentage: 25.81 },
    ],
    "Business Analyst": [
      { name: "Business Analysis", percentage: 44.05 },
      { name: "Project Management", percentage: 34.77 },
      { name: "Data Analysis", percentage: 33.18 },
      { name: "Communication", percentage: 30.83 },
      { name: "SQL", percentage: 23.76 },
      { name: "Analytical Skills", percentage: 20.41 },
      { name: "Requirements Gathering", percentage: 17.55 },
      { name: "Problem Solving", percentage: 17.43 },
      { name: "Communication Skills", percentage: 16.71 },
      { name: "Teamwork", percentage: 15 },
    ],
    "Cloud Engineer": [
      { name: "AWS", percentage: 47.91 },
      { name: "Python", percentage: 44.87 },
      { name: "Terraform", percentage: 39.54 },
      { name: "Azure", percentage: 39.16 },
      { name: "Kubernetes", percentage: 35.36 },
      { name: "Docker", percentage: 27 },
      { name: "Devops", percentage: 24.33 },
      { name: "Powershell", percentage: 22.81 },
      { name: "Cloud Computing", percentage: 21.29 },
      { name: "Linux", percentage: 19.39 },
    ],
    "Cybersecurity Analyst": [
      { name: "Incident Response", percentage: 42.39 },
      { name: "Cyber Security", percentage: 38.04 },
      { name: "Network Security", percentage: 18.48 },
      { name: "Information Security", percentage: 16.3 },
      { name: "Security Operations", percentage: 16.3 },
      { name: "Windows", percentage: 14.13 },
      { name: "Penetration Testing", percentage: 14.13 },
      { name: "Linux", percentage: 14.13 },
      { name: "Threat Hunting", percentage: 14.13 },
      { name: "Vulnerability Management", percentage: 14.13 },
    ],
    "Data Engineer": [
      { name: "Python", percentage: 74.33 },
      { name: "AWS", percentage: 63.83 },
      { name: "Data Engineering", percentage: 51.97 },
      { name: "Spark", percentage: 41.47 },
      { name: "Java", percentage: 38.22 },
      { name: "AWS", percentage: 36.91 },
      { name: "Scala", percentage: 36.62 },
      { name: "Snowflake", percentage: 35.94 },
      { name: "Data Warehousing", percentage: 32.34 },
      { name: "Hadoop", percentage: 32.17 },
    ],
    "Data Scientist": [
      { name: "Python", percentage: 84.43 },
      { name: "Machine Learning", percentage: 75.4 },
      { name: "Data Science", percentage: 68.97 },
      { name: "SQL", percentage: 60.32 },
      { name: "R", percentage: 49.2 },
      { name: "Data Visualization", percentage: 39.18 },
      { name: "Statistics", percentage: 38.07 },
      { name: "Data Analysis", percentage: 31.77 },
      { name: "Communication", percentage: 25.22 },
      { name: "Data Mining", percentage: 22.74 },
    ],
    "Database Administrator": [
      { name: "SQL", percentage: 41.77 },
      { name: "Database Administration", percentage: 39.56 },
      { name: "SQL Server", percentage: 24.68 },
      { name: "Oracle", percentage: 24.05 },
      { name: "Performance Tuning", percentage: 19.62 },
      { name: "Linux", percentage: 18.67 },
      { name: "Disaster Recovery", percentage: 17.41 },
      { name: "Database Security", percentage: 17.09 },
      { name: "Troubleshooting", percentage: 17.09 },
      { name: "Database Design", percentage: 15.19 },
    ],
    "DevOps Engineer": [
      { name: "Devops", percentage: 67.46 },
      { name: "Kubernetes", percentage: 63.58 },
      { name: "Python", percentage: 62.93 },
      { name: "Terraform", percentage: 59.48 },
      { name: "AWS", percentage: 48.49 },
      { name: "Docker", percentage: 47.41 },
      { name: "Ansible", percentage: 46.98 },
      { name: "Jenkins", percentage: 42.46 },
      { name: "Bash", percentage: 34.48 },
      { name: "Automation", percentage: 32.76 },
    ],
    "IT Consultant": [
      { name: "Communication", percentage: 34.7 },
      { name: "Customer Service", percentage: 33.9 },
      { name: "Sales", percentage: 31.86 },
      { name: "Teamwork", percentage: 18.16 },
      { name: "Time Management", percentage: 17.52 },
      { name: "Problem Solving", percentage: 14.48 },
      { name: "Project Management", percentage: 13.89 },
      { name: "Attention To Detail", percentage: 12.77 },
      { name: "Leadership", percentage: 11.24 },
      { name: "Negotiation", percentage: 10.19 },
    ],
    "IT Manager": [
      { name: "Communication", percentage: 38.74 },
      { name: "Leadership", percentage: 33.81 },
      { name: "Accounting", percentage: 22.25 },
      { name: "Nursing", percentage: 18.37 },
      { name: "Teamwork", percentage: 18.08 },
      { name: "Project Management", percentage: 17.98 },
      { name: "Audit", percentage: 14.31 },
      { name: "Problem Solving", percentage: 14.18 },
      { name: "Risk Management", percentage: 13.7 },
      { name: "Auditing", percentage: 13.66 },
    ],
    "IT Project Manager": [
      { name: "Project Management", percentage: 74.33 },
      { name: "Risk Management", percentage: 63.83 },
      { name: "Communication", percentage: 51.97 },
      { name: "Leadership", percentage: 41.47 },
      { name: "Stakeholder Management", percentage: 38.22 },
      { name: "Problem Solving", percentage: 36.91 },
      { name: "Project Planning", percentage: 36.62 },
      { name: "Change Management", percentage: 35.94 },
      { name: "PMP Certification", percentage: 32.34 },
      { name: "Agile", percentage: 32.17 },
    ],
    "IT Support Specialist": [
      { name: "Troubleshooting", percentage: 55.7 },
      { name: "IT Support", percentage: 50.63 },
      { name: "Customer Service", percentage: 34.18 },
      { name: "Problem Solving", percentage: 32.91 },
      { name: "Active Directory", percentage: 30.38 },
      { name: "Communication", percentage: 29.11 },
      { name: "Technical Support", percentage: 26.58 },
      { name: "Teamwork", percentage: 25.32 },
      { name: "Windows", percentage: 22.78 },
      { name: "Networking", percentage: 21.52 },
    ],
    "Information Security Manager": [
      { name: "Threat Modelling", percentage: 100.0 },
      { name: "Container Services", percentage: 99.59 },
      { name: "AWS Certified Solutions Architect", percentage: 94.72 },
      { name: "Information Security", percentage: 80.08 },
      { name: "Data Security", percentage: 77.64 },
      { name: "User Access Management", percentage: 67.89 },
      { name: "Saas", percentage: 67.48 },
      { name: "Penetration Testing", percentage: 65.85 },
      { name: "Iaas", percentage: 58.54 },
      { name: "Paas", percentage: 55.28 },
    ],
    "Network Administrator": [
      { name: "Network Administration", percentage: 58.12 },
      { name: "Troubleshooting", percentage: 35.9 },
      { name: "Network Security", percentage: 32.48 },
      { name: "Firewalls", percentage: 20.51 },
      { name: "Ccna", percentage: 19.68 },
      { name: "Active Directory", percentage: 19.68 },
      { name: "Communication Skills", percentage: 18.8 },
      { name: "Project Management", percentage: 17.09 },
      { name: "Cisco", percentage: 15.38 },
      { name: "Network Monitoring", percentage: 14.53 },
    ],
    "QA Engineer": [
      { name: "Selenium", percentage: 32.24 },
      { name: "Regression Testing", percentage: 25.0 },
      { name: "SQL", percentage: 25.0 },
      { name: "Manual Testing", percentage: 22.37 },
      { name: "Software Testing", percentage: 22.37 },
      { name: "Performance Testing", percentage: 21.71 },
      { name: "Python", percentage: 21.71 },
      { name: "Java", percentage: 21.71 },
      { name: "Communication Skills", percentage: 21.71 },
      { name: "Agile", percentage: 20.39 },
    ],
    "Software Developer": [
      { name: "Software Development", percentage: 40.06 },
      { name: "Javascript", percentage: 34.28 },
      { name: "Java", percentage: 32.25 },
      { name: "Python", percentage: 29.11 },
      { name: "SQL", percentage: 27.59 },
      { name: "C#", percentage: 26.37 },
      { name: "GIT", percentage: 21.6 },
      { name: "C++", percentage: 20.08 },
      { name: "Linux", percentage: 18.26 },
      { name: "HTML", percentage: 17.44 },
    ],
    "Systems Analyst": [
      { name: "Project Management", percentage: 26.23 },
      { name: "Communication", percentage: 22.86 },
      { name: "SQL", percentage: 18.7 },
      { name: "Data Analysis", percentage: 18.44 },
      { name: "Analytical Skills", percentage: 16.36 },
      { name: "Communication Skills", percentage: 14.03 },
      { name: "Business Analysis", percentage: 12.99 },
      { name: "Troubleshooting", percentage: 11.95 },
      { name: "Problem Solving", percentage: 10.91 },
      { name: "Documentation", percentage: 10.65 },
    ],
    "Systems Architect": [
      { name: "System Architecture", percentage: 20.33 },
      { name: "Communication", percentage: 18.7 },
      { name: "Electrical Engineering", percentage: 14.63 },
      { name: "Software Development", percentage: 13.82 },
      { name: "Computer Science", percentage: 13.01 },
      { name: "Linux", percentage: 11.38 },
      { name: "Python", percentage: 11.38 },
      { name: "Leadership", percentage: 8.94 },
      { name: "Collaboration", percentage: 8.94 },
      { name: "Computer Engineering", percentage: 8.13 },
    ],
    "Technical Support Engineer": [
      { name: "Troubleshooting", percentage: 56.25 },
      { name: "Technical Support", percentage: 42.19 },
      { name: "Communication", percentage: 28.13 },
      { name: "Customer Service", percentage: 23.44 },
      { name: "Linux", percentage: 20.31 },
      { name: "Problem Solving", percentage: 18.75 },
      { name: "Networking", percentage: 18.75 },
      { name: "Teamwork", percentage: 17.19 },
      { name: "AWS", percentage: 14.06 },
      { name: "Project Management", percentage: 14.06 },
    ],
    "Web Developer": [
      { name: "Javascript", percentage: 63.5 },
      { name: "CSS", percentage: 44.0 },
      { name: "HTML", percentage: 41.5 },
      { name: "PHP", percentage: 35.5 },
      { name: "SQL", percentage: 26.5 },
      { name: "GIT", percentage: 22.0 },
      { name: "React", percentage: 22.0 },
      { name: "Communication", percentage: 19.5 },
      { name: "Python", percentage: 19.5 },
      { name: "HTML5", percentage: 18.5 },
    ],
  };
  return skillsData[jobName] || [];
}

function getCoursesForJob(jobName) {
  const coursesData = {
    "AI / ML Engineer": [
      {
        title: "The Data Science Course: Complete Data Science Bootcamp 2024",
        provider: "Udemy",
        url: "https://www.udemy.com/course/the-data-science-course-complete-data-science-bootcamp/",
        image: "assets/courses/AI Engineer/1.png",
      },
      {
        title: "Deep Learning A-Z: Neural Networks, AI & ChatGPT Prize",
        provider: "Udemy",
        url: "https://www.udemy.com/courses/search/?src=ukw&q=Deep+Learning",
        image: "assets/courses/AI Engineer/2.png",
      },
      {
        title: "TensorFlow 2.0: Deep Learning and Artificial Intelligence",
        provider: "Udemy",
        url: "https://www.udemy.com/course/deep-learning-tensorflow-2/",
        image: "assets/courses/AI Engineer/3.png",
      },
    ],
    "Business Analyst": [
      {
        title: "Business Analysis Fundamentals - ECBA, CCBA, CBAP",
        provider: "Udemy",
        url: "https://www.udemy.com/course/business-analysis-ba/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Business Analyst/1.png",
      },
      {
        title: 'Business Analysis "A to Z" Masterclass',
        provider: "Udemy",
        url: "https://www.udemy.com/course/business-analysis-masterclass/",
        image: "assets/courses/Business Analyst/2.png",
      },
      {
        title: "The Business Intelligence Analyst Course 2024",
        provider: "Udemy",
        url: "https://www.udemy.com/course/the-business-intelligence-analyst-course-2018/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Business Analyst/3.png",
      },
    ],
    "Cloud Engineer": [
      {
        title: "GCP Associate Cloud Engineer - Google Cloud Certification",
        provider: "Udemy",
        url: "https://www.udemy.com/course/google-cloud-certification-associate-cloud-engineer/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Cloud Engineer/1.png",
      },
      {
        title: "GCP Associate Cloud Engineer Google Certification - 150 Demos",
        provider: "Udemy",
        url: "https://www.udemy.com/course/gcp-associate-cloud-engineer-google-certification/",
        image: "assets/courses/Cloud Engineer/2.png",
      },
      {
        title: "GCP Goodle Associate Cloud Engineer Practice Test Exam 2024",
        provider: "Udemy",
        url: "https://www.udemy.com/course/latest-gcp-ace-google-associate-cloud-engineer-practice-exams-tests/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Cloud Engineer/3.png",
      },
    ],
    "Cybersecurity Analyst": [
      {
        title: "CompTIA CySA+ (CS0-003) Complete Course & Practice Exam",
        provider: "Udemy",
        url: "https://www.udemy.com/course/comptia-cysa-003/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Cybersecurity Analyst/1.png",
      },
      {
        title: "Cybersecurity Threat Hunting for SOC Analysts",
        provider: "Udemy",
        url: "https://www.udemy.com/course/cybersecurity-threat-hunting-for-soc-analysts/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Cybersecurity Analyst/2.png",
      },
      {
        title: "SOC Analyst (Cybersecurity) Interview Questions and Answers",
        provider: "Udemy",
        url: "https://www.udemy.com/course/security-soc-analyst-interview-questions-and-answers/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Cybersecurity Analyst/3.png",
      },
    ],
    "Data Engineer": [
      {
        title: "AWS Certified Data Engineer Associate 2024 - Hands On!",
        provider: "Udemy",
        url: "https://www.udemy.com/courses/search/?q=data+engineer&src=sac&kw=Data+Engineer",
        image: "assets/courses/Data Engineer/1.png",
      },
      {
        title: "Data Engineering Essentials using SQL, Python, and PySpark",
        provider: "Udemy",
        url: "https://www.udemy.com/course/data-engineering-essentials-sql-python-and-spark/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Data Engineer/2.png",
      },
      {
        title: "Complete AWS Certified Data Engineer Associate - DEA-C01",
        provider: "Udemy",
        url: "https://www.udemy.com/courses/search/?q=data+engineer&src=sac&kw=Data+Engineer",
        image: "assets/courses/Data Engineer/3.png",
      },
    ],
    "Data Scientist": [
      {
        title: "Become a Data Scientist: SQL, Tableau, ML & DL [4-in-1]",
        provider: "Udemy",
        url: "https://www.udemy.com/course/become-a-data-scientist/",
        image: "assets/courses/Data Scientist/1.png",
      },
      {
        title: "Complete A.I & Machine Learning, Data Science Bootcamp",
        provider: "Udemy",
        url: "https://www.udemy.com/course/complete-machine-learning-and-data-science-zero-to-mastery/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Data Scientist/2.png",
      },
      {
        title: "The Data Analyst Course: Complete Data Analyst Bootcamp",
        provider: "Udemy",
        url: "https://www.udemy.com/course/the-data-analyst-course-complete-data-analyst-bootcamp/",
        image: "assets/courses/Data Scientist/3.png",
      },
    ],
    "Database Administrator": [
      {
        title: "Oracle Database Administrator DBA",
        provider: "Udemy",
        url: "https://www.udemy.com/courses/search/?lang=en&q=Database+Administrator&sort=relevance&src=ukw",
        image: "assets/courses/Database Administrator/1.png",
      },
      {
        title: "Complete Microsoft SQL Server Database Administration Course",
        provider: "Udemy",
        url: "https://www.udemy.com/course/complete-microsoft-sql-server-database-administration-course/",
        image: "assets/courses/Database Administrator/2.png",
      },
      {
        title: "Oracle DBA 11g/12c - Database Administration for Junior DBA",
        provider: "Udemy",
        url: "https://www.udemy.com/course/oracledbatraining/",
        image: "assets/courses/Database Administrator/3.png",
      },
    ],
    "DevOps Engineer": [
      {
        title: "DevOps Beginners to Advanced with Projects",
        provider: "Udemy",
        url: "https://www.udemy.com/courses/search/?src=ukw&q=DevOps+Engineer",
        image: "assets/courses/DevOps Engineer/1.png",
      },
      {
        title: "AWS Certified DevOps Engineer Professional 2024 - DOP - C02",
        provider: "Udemy",
        url: "https://www.udemy.com/course/aws-certified-devops-engineer-professional-hands-on/?couponCode=SKILLS4SALEB",
        image: "assets/courses/DevOps Engineer/2.png",
      },
      {
        title: "Learn DevOps: Docker, Kubernetes, Terraform and Azure DevOps",
        provider: "Udemy",
        url: "https://www.udemy.com/course/devops-with-docker-kubernetes-and-azure-devops/?couponCode=SKILLS4SALEB",
        image: "assets/courses/DevOps Engineer/3.png",
      },
    ],
    "IT Consultant": [
      {
        title: "Management Consulting Essential Training",
        provider: "Udemy",
        url: "https://www.udemy.com/course/management-consulting-problem-solving/",
        image: "assets/courses/IT Consultant/1.png",
      },
      {
        title: "Introduction to Consulting",
        provider: "Udemy",
        url: "https://www.udemy.com/course/introduction-to-consulting/",
        image: "assets/courses/IT Consultant/2.png",
      },
      {
        title: "Management Consulting Approach to Problem Solving",
        provider: "Udemy",
        url: "https://www.udemy.com/course/management-consulting-approach-to-problem-solving/",
        image: "assets/courses/IT Consultant/3.png",
      },
    ],
    "IT Manager": [
      {
        title: "IT Management Fundamentals - From IT Tech to IT Manager",
        provider: "Udemy",
        url: "https://www.udemy.com/courses/search/?src=ukw&q=IT+Manager",
        image: "assets/courses/IT Manager/1.png",
      },
      {
        title: "Management Skills Training for New & Experienced Managers",
        provider: "Udemy",
        url: "https://www.udemy.com/course/the-new-manager-managing-people-teams-processes/",
        image: "assets/courses/IT Manager/2.png",
      },
      {
        title: "IT Infrastructure Manager 101 - Become a Great Manager",
        provider: "Udemy",
        url: "https://www.udemy.com/course/infrastructuremanager/",
        image: "assets/courses/IT Manager/3.png",
      },
    ],
    "IT Project Manager": [
      {
        title: "The Project Management Course: Beginner to PROject Manager",
        provider: "Udemy",
        url: "https://www.udemy.com/course/the-project-management-course-beginner-to-project-manager/",
        image: "assets/courses/IT Project Manager/1.png",
      },
      {
        title: "IT Project Management: Delivering successful IT projects",
        provider: "Udemy",
        url: "https://www.udemy.com/course/it-project-management-delivering-successful-it-projects/",
        image: "assets/courses/IT Project Manager/2.png",
      },
      {
        title: "I.T. Project Management for Beginners: A Step-by-Step Guide",
        provider: "Udemy",
        url: "https://www.udemy.com/course/it-project-management-for-beginners-a-step-by-step-guide/",
        image: "assets/courses/IT Project Manager/3.png",
      },
    ],
    "IT Support Specialist": [
      {
        title: "IT Support Technical Skills Bootcamp",
        provider: "Udemy",
        url: "https://www.udemy.com/courses/search/?src=ukw&q=IT+Support+Specialist",
        image: "assets/courses/IT Support Specialist/1.png",
      },
      {
        title: "IT Fundamentals - Everything you need to know about IT",
        provider: "Udemy",
        url: "https://www.udemy.com/course/it-fundamentals-everything-you-need-to-know-about-it/",
        image: "assets/courses/IT Support Specialist/2.png",
      },
      {
        title: "Dekstop IT Support Level 1 & 2 in real life (Troubleshooting",
        provider: "Udemy",
        url: "https://www.udemy.com/course/desktop-support/",
        image: "assets/courses/IT Support Specialist/3.png",
      },
    ],
    "Information Security Manager": [
      {
        title: "Certified Information Security Manager (CISM)",
        provider: "Udemy",
        url: "https://www.udemy.com/courses/search/?src=ukw&q=Information+Security+Manager",
        image: "assets/courses/Information Security Manager/1.png",
      },
      {
        title: "Certified Information Security Manager (CISM - ISACA)",
        provider: "Udemy",
        url: "https://www.udemy.com/courses/search/?src=ukw&q=Information+Security+Manager",
        image: "assets/courses/Information Security Manager/2.png",
      },
      {
        title: "CISM Certification - CISM Exam Training Domain 1,2,3,4",
        provider: "Udemy",
        url: "https://www.udemy.com/course/cism-english/",
        image: "assets/courses/Information Security Manager/3.png",
      },
    ],
    "Network Administrator": [
      {
        title: "Network and Systems Administrator Technical Training",
        provider: "Udemy",
        url: "https://www.udemy.com/courses/search/?src=ukw&q=Network+Administrator",
        image: "assets/courses/Network Administrator/1.png",
      },
      {
        title: "Certified Wireless Network Administrator (CWNA)",
        provider: "Udemy",
        url: "https://www.udemy.com/courses/search/?src=ukw&q=Network+Administrator",
        image: "assets/courses/Network Administrator/2.png",
      },
      {
        title: "Cisco CCNA 200-301",
        provider: "Udemy",
        url: "https://www.udemy.com/course/cisco-ccna-200-301-aguna/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Network Administrator/3.png",
      },
    ],
    "QA Engineer": [
      {
        title: "The Complete 2024 Software Testing Bootcamp",
        provider: "Udemy",
        url: "https://www.udemy.com/course/testerbootcamp/",
        image: "assets/courses/QA Engineer/1.png",
      },
      {
        title: "Software Testing Masterclass (2024) - From Novice to Expert",
        provider: "Udemy",
        url: "https://www.udemy.com/courses/search/?src=ukw&q=QA+Engineer",
        image: "assets/courses/QA Engineer/2.png",
      },
      {
        title: "MasterClass Software Testing with Jira & Agile -Be a QA Lead",
        provider: "Udemy",
        url: "https://www.udemy.com/courses/search/?src=ukw&q=QA+Engineer",
        image: "assets/courses/QA Engineer/3.png",
      },
    ],
    "Software Developer": [
      {
        title: "Software Development From A to Z - Beginner's Complete Guide",
        provider: "Udemy",
        url: "https://www.udemy.com/course/software-development-from-a-to-z/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Software Developer/1.png",
      },
      {
        title: "How to Become a Software Developer From Scratch",
        provider: "Udemy",
        url: "https://www.udemy.com/course/how-to-become-a-software-developer-from-scratch/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Software Developer/2.png",
      },
      {
        title: "The Web Developer Bootcamp 2024",
        provider: "Udemy",
        url: "https://www.udemy.com/course/the-web-developer-bootcamp/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Software Developer/3.png",
      },
    ],
    "Systems Analyst": [
      {
        title: "IT Business Analyst & Project Managers Technical Awareness",
        provider: "Udemy",
        url: "https://www.udemy.com/course/business-analyst-managers-intro-to-software-development/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Systems Analyst/1.png",
      },
      {
        title: "Fundamentals of Business Analysis",
        provider: "Udemy",
        url: "https://www.udemy.com/course/businessanalysis/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Systems Analyst/2.png",
      },
      {
        title: "The Business Intelligence Analyst Course 2024",
        provider: "Udemy",
        url: "https://www.udemy.com/course/the-business-intelligence-analyst-course-2018/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Systems Analyst/3.png",
      },
    ],
    "Systems Architect": [
      {
        title: "Software Architecture & Design of Modern Large Scale Systems",
        provider: "Udemy",
        url: "https://www.udemy.com/course/software-architecture-design-of-modern-large-scale-systems/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Systems Architect/1.png",
      },
      {
        title: "Software Archittecture & Technology of Large-Scale Systems",
        provider: "Udemy",
        url: "https://www.udemy.com/course/developer-to-architect/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Systems Architect/2.png",
      },
      {
        title: "The Complete Guide to Becoming a Software Architect",
        provider: "Udemy",
        url: "https://www.udemy.com/course/the-complete-guide-to-becoming-a-software-architect/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Systems Architect/3.png",
      },
    ],
    "Technical Support Engineer": [
      {
        title: "IT Support Entry Level Job Training Course",
        provider: "Udemy",
        url: "https://www.udemy.com/course/it-support-entry-level-job-training-course/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Technical Support Engineer/1.png",
      },
      {
        title: "IT Troubleshooting & IT Technical Support Helpdesk Bootcamp",
        provider: "Udemy",
        url: "https://www.udemy.com/course/it-troubleshooting-it-technical-support-helpdesk-bootcamp/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Technical Support Engineer/2.png",
      },
      {
        title: "Crash Course on Mastering IT Technical Support",
        provider: "Udemy",
        url: "https://www.udemy.com/course/master-it-technical-support/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Technical Support Engineer/3.png",
      },
    ],
    "Web Developer": [
      {
        title: "The Complete 2024 Web Development Bootcamp",
        provider: "Udemy",
        url: "https://www.udemy.com/course/the-complete-web-development-bootcamp/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Web Developer/1.png",
      },
      {
        title: "The Ultimate 2024 Fullstack Web Development Bootcamp",
        provider: "Udemy",
        url: "https://www.udemy.com/course/the-ultimate-fullstack-web-development-bootcamp/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Web Developer/2.png",
      },
      {
        title: "The Complete Web Developer Course 3.0",
        provider: "Udemy",
        url: "https://www.udemy.com/course/the-complete-web-developer-course-2/?couponCode=SKILLS4SALEB",
        image: "assets/courses/Web Developer/3.png",
      },
    ],
  };
  return coursesData[jobName] || [];
}

function updateSkills(skills) {
  const skillLabels = skills.map((skill) => skill.name);
  const skillData = skills.map((skill) => skill.percentage);

  const ctx2 = document.getElementById("skillDemandChart").getContext("2d");

  if (skillDemandChart) {
    skillDemandChart.destroy();
  }

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
          ), // Alternate between purple and pink
          borderColor: skillData.map((_, index) =>
            index % 2 === 0 ? "#8a7fd3" : "#ff69b4"
          ), // Border colors match the bar colors
          borderWidth: 1,
          borderRadius: 5, // Rounded corners
          barThickness: 30, // Controls the thickness of the bars
          hoverBackgroundColor: skillData.map((_, index) =>
            index % 2 === 0 ? "#6c5ab8" : "#ff1493"
          ), // Darker shade on hover
        },
      ],
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
          formatter: function (value, context) {
            return value + "%"; // Append '%' to the data labels
          },
        },
      },
    },
  });
}

function updateCourses(courses) {
  const coursesContainer = document.getElementById("courses-container");
  coursesContainer.innerHTML = ""; // Clear previous courses

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

function scrollToSkillsSection() {
  document
    .getElementById("skills-section")
    .scrollIntoView({ behavior: "smooth" });
}
