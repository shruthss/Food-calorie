import streamlit as st
import numpy as np
import pandas as pd
import time
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

# --- Full-Screen Pastel Background Styling ---
st.markdown(
    """
    <style>
        /* Full-Screen Pastel Gradient */
        .stApp {
            background: linear-gradient(to right, #FFDEE9, #B5FFFC) !important;
            background-size: cover !important;
            height: 100vh !important;
            width: 100vw !important;
        }

        /* Glassy Effect for Main Content */
        .main-container {
            background: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(12px);
            border-radius: 15px;
            padding: 20px;
            margin: auto;
            width: 85%;
            max-width: 1000px;
            color: #333 !important;
        }

        /* Softened Header Colors */
        h1, h2, h3 {
            text-align: center;
            color: #444 !important;
            font-weight: bold;
        }

        /* Custom Sections with Light Colors */
        .blue-box {
            background: rgba(173, 216, 230, 0.5);
            padding: 15px;
            border-radius: 10px;
        }
        .green-box {
            background: rgba(144, 238, 144, 0.5);
            padding: 15px;
            border-radius: 10px;
        }
        .gray-box {
            background: rgba(211, 211, 211, 0.5);
            padding: 15px;
            border-radius: 10px;
        }
    </style>
    """,
    unsafe_allow_html=True
)

# --- Wrap Content Inside Main Container ---
st.markdown('<div class="main-container">', unsafe_allow_html=True)
st.write("## Calories Burned Prediction")
st.image("https://img.freepik.com/free-vector/health-fitness-nutrition-twitch-banner-template_23-2149737233.jpg?w=826&t=st=1677999713~exp=1678000313~hmac=a0b585ff993997967176a31ffbb699a826f1c776ae5c381478e88892848175e1", use_container_width=True)
st.write("In this WebApp you will be able to observe your predicted calories burned in your body.Only thing you have to do is pass your parameters such as Age , Gender , BMI , etc into this WebApp and then you will be able to see the predicted value of kilocalories that burned in your body.")

st.sidebar.header("User Input Parameters:")

# --- User Input Function ---
def user_input_features():
    age = st.sidebar.slider("Age:", 10, 100, 30)
    bmi = st.sidebar.slider("BMI:", 15, 40, 20)
    duration = st.sidebar.slider("Duration (min):", 0, 60, 15)
    heart_rate = st.sidebar.slider("Heart Rate:", 60, 160, 80)
    body_temp = st.sidebar.slider("Body Temperature (°C):", 36, 42, 38)
    gender_button = st.sidebar.radio("Gender:", ("Male", "Female"))

    gender = 1 if gender_button == "Male" else 0

    input_data = {
        "Age": age,
        "BMI": bmi,
        "Duration": duration,
        "Heart_Rate": heart_rate,
        "Body_Temp": body_temp,
        "Gender_male": gender
    }

    return pd.DataFrame([input_data])

df = user_input_features()

st.write("---")
st.markdown('<div class="blue-box">', unsafe_allow_html=True)
st.header("Your Parameters:")
st.write(df)
st.markdown('</div>', unsafe_allow_html=True)

# --- Load Dataset ---
calories = pd.read_csv("calories.csv")
exercise = pd.read_csv("exercise.csv")

# Merge datasets
exercise_df = exercise.merge(calories, on="User_ID").drop(columns=["User_ID"])

# Add BMI column
exercise_df["BMI"] = round(exercise_df["Weight"] / ((exercise_df["Height"] / 100) ** 2), 2)

# Select necessary columns
exercise_df = exercise_df[["Gender", "Age", "BMI", "Duration", "Heart_Rate", "Body_Temp", "Calories"]]

# Convert categorical variable
exercise_df = pd.get_dummies(exercise_df, drop_first=True)

# Train-Test Split
train_data, test_data = train_test_split(exercise_df, test_size=0.2, random_state=1)

X_train = train_data.drop("Calories", axis=1)
y_train = train_data["Calories"]

X_test = test_data.drop("Calories", axis=1)
y_test = test_data["Calories"]

# Train Model
random_reg = RandomForestRegressor(n_estimators=1000, max_features=3, max_depth=6)
random_reg.fit(X_train, y_train)

# Predict
prediction = random_reg.predict(df)

st.write("---")
st.markdown('<div class="green-box">', unsafe_allow_html=True)
st.header("Prediction:")
calorie_burn = round(prediction[0], 2)
st.write(f"**{calorie_burn} kilocalories**")

# --- Calorie Burn Indicator ---
if calorie_burn < 150:
    st.write("🔥 **Calorie Burn Level: LOW** (Try increasing activity!)")
elif 150 <= calorie_burn < 300:
    st.write("⚡ **Calorie Burn Level: MEDIUM** (Good job! Keep it up!)")
else:
    st.write("🏆 **Calorie Burn Level: HIGH** (Excellent! You're burning a lot of calories!)")
st.markdown('</div>', unsafe_allow_html=True)

st.write("---")
st.header("Similar Results:")
similar_range = [calorie_burn - 10, calorie_burn + 10]
similar_results = exercise_df[(exercise_df["Calories"] >= similar_range[0]) & (exercise_df["Calories"] <= similar_range[-1])]
st.write(similar_results.sample(5))

st.write("---")
st.markdown('<div class="gray-box">', unsafe_allow_html=True)
st.header("General Information:")

# --- Highlighted Comparisons ---
boolean_age = (exercise_df["Age"] < df["Age"].values[0]).tolist()
boolean_duration = (exercise_df["Duration"] < df["Duration"].values[0]).tolist()
boolean_body_temp = (exercise_df["Body_Temp"] < df["Body_Temp"].values[0]).tolist()
boolean_heart_rate = (exercise_df["Heart_Rate"] < df["Heart_Rate"].values[0]).tolist()

st.write(f"You are older than **`{round(sum(boolean_age) / len(boolean_age) * 100, 2)}%`** of other people.")
st.write(f"Your exercise duration is longer than **`{round(sum(boolean_duration) / len(boolean_duration) * 100, 2)}%`** of other people.")
st.write(f"Your heart rate is higher than **`{round(sum(boolean_heart_rate) / len(boolean_heart_rate) * 100, 2)}%`** of other people.")
st.write(f"Your body temperature is higher than **`{round(sum(boolean_body_temp) / len(boolean_body_temp) * 100, 2)}%`** of other people.")
st.markdown('</div>', unsafe_allow_html=True)
st.markdown('</div>', unsafe_allow_html=True)
