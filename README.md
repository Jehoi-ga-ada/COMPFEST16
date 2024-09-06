# **SkillCast**  📈
**Forecasting IT Jobs and Skill Demand for Talent Growth** 

## **Table of Contents** 📚
1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation Instructions](#installation-instructions)
4. [Usage Instructions](#usage-instructions)
5. [Demo](#demo)
6. [Project Structure](#project-structure)
7. [Contact Information](#contact-information)

## **Introduction** 📝
SkillCast is a platform designed to forecast trends in the IT job market, providing insights on in-demand skills and offering targeted learning resources. By analyzing job postings data from platforms like Jobstreet and LinkedIn, SkillCast helps users stay ahead in their IT careers. SkillCast aims to bridge the gap between education and industry. It empowers individuals with the knowledge needed to thrive and supports the growth of competent and relevant IT talent.

## **Features** 
- **Job Market Trend:** Timeseries prediction on IT job demand based on trends and previous job postings, aiding job seekers and educational institutions in aligning their efforts with market needs. 📊
- **Most Needed Skills:** Highlights the top 15 most in-demand skills for selected IT jobs, providing a clear roadmap for workforce development and addressing skill gaps. 🛠️
- **Course Recommendation:** Suggests courses aligned with market demands to help individuals upgrade their skills directly. 📚

## **Installation Instructions** ⚙️
- **Clone the Repository:**
   ```bash
   git clone https://github.com/Jehoi-ga-ada/SkillCast.git
   cd SkillCast
   ```

## **Usage Instructions** 🚀
- **Live Website:**  
  You can view and interact with the live version of SkillCast by visiting [SkillCast](https://skillcast.vercel.app/) 🌟

## **Demo** 🎥
- **Watch the Demo:**  
  You can watch a video demonstration of SkillCast on YouTube: [SkillCast Demo](https://youtu.be/0-UZ6eICb8s)

## **Project Structure** 🗂️
- **backend/**
  - `dataprocessing.ipynb`: Generalizes job title postings using LLM, maps to 20 job titles, and creates the dataset for prediction.
  - _Further details will be provided in the backend-specific README._

- **frontend/**
  - Contains HTML, CSS, and JavaScript for the website.
  - Includes JSON files for historical and predicted job postings data, skills data, and course recommendations.
  - _Further details will be provided in the frontend-specific README._

- **models/**
  - Contains 20 model `.h5` files, each corresponding to a different IT job title.

- **notebooks/**
  - `experiment.ipynb`: Houses model experiments, including vanilla LSTM, N-BEATS, and ensemble models.

- **scripts/**
  - Python scripts for:
    - Creating payload JSON.
    - Generating models for each job title.
    - Common tasks such as train/test split, training and saving models, and model evaluation (MAE, MSE, RMSE, MAPE).

## **Contact Information** 📬
For inquiries or contributions, please refer to the contact information on [Jehoi-ga-ada's GitHub profile](https://github.com/Jehoi-ga-ada).