# **SkillCast** 🚀
**Forecasting IT Jobs and Skill Demand for Talent Growth** 📈

## **Table of Contents** 📚
1. [Project Description](#project-description)
2. [Features](#features)
3. [Installation Instructions](#installation-instructions)
4. [Usage Instructions](#usage-instructions)
5. [Demo](#demo)
6. [Project Structure](#project-structure)
7. [Contributing Guidelines](#contributing-guidelines)
8. [Contact Information](#contact-information)
9. [Acknowledgments](#acknowledgments)

## **Project Description** 📝
SkillCast is a comprehensive solution that addresses critical challenges in Indonesia's IT sector by leveraging AI and data-driven insights. Focused on analyzing and forecasting IT job markets, identifying skill needs, and recommending educational resources, this project aims to bridge the gap between education and industry. It empowers individuals with the knowledge needed to thrive and supports the growth of competent and relevant IT talent, ultimately enhancing Indonesia's economic competitiveness.

**Key Benefits:**
- Assists aspiring IT talents in career planning and decision-making. 🎯
- Bridges the skill gap between IT education and industry needs. 🌉
- Enhances employability and competitiveness of IT talents. 💼
- Widens access to IT job market trends and insights. 🌐

## **Features** ✨
- **Job Market Trend:** Timeseries prediction on IT job demand based on trends and previous job postings, aiding job seekers and educational institutions in aligning their efforts with market needs. 📊
- **Most Needed Skills:** Highlights the top 15 most in-demand skills for selected IT jobs, providing a clear roadmap for workforce development and addressing skill gaps. 🛠️
- **Course Recommendation:** Suggests courses aligned with market demands to help individuals upgrade their skills directly. 📚

## **Installation Instructions** ⚙️
_**(To be filled in soon.)**_

## **Usage Instructions** 🚀
_**(To be filled in soon.)**_

**Live Website:** [SkillCast](https://skillcast.vercel.app/) 🌟

## **Demo** 🎥
_Coming soon: [YouTube Demo Video](#)_

## **Project Structure** 🗂️
- **backend/**
  - `dataprocessing.ipynb`: Generalizes job title postings using LLM, maps to 20 job titles, and creates the dataset for prediction.
  - _(Further details will be provided in the backend-specific README)_
- **frontend/**
  - Contains HTML, CSS, and JavaScript for the website, along with JSON files for historical and predicted job postings data, skills data, and course recommendations.
  - _(Further details will be provided in the frontend-specific README)_
- **models/**
  - Contains 20 model `.h5` files, each corresponding to a different IT job title.
- **notebooks/**
  - `experiment.ipynb`: Houses model experiments, including vanilla LSTM, N-BEATS, and ensemble models.
- **scripts/**
  - Includes Python scripts for creating payload JSON, generating models for each job title, and common modules for tasks like train/test split, training and saving models, and model evaluation (MAE, MSE, RMSE, MAPE).

## **Contributing Guidelines** 🤝
_**(Details about contributing guidelines are to be determined.)**_

## **Contact Information** 📬
For inquiries or contributions, please refer to the contact information on [Jehoi-ga-ada's GitHub profile](https://github.com/Jehoi-ga-ada).

## **Acknowledgments** 🙏
- [Acknowledgments here for resources, libraries, or individuals.]
