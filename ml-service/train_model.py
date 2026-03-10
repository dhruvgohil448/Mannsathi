# ml-service/train_model.py
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import make_pipeline
import joblib

# Load data
df = pd.read_csv('data.csv')

# Drop rows with missing critical fields (optional)
df.dropna(subset=['Label', 'Notes'], inplace=True)

# Combine inputs into a single string for NLP
X = df[['Emoji', 'SleepQuality', 'MetFriends', 'Productivity', 'TookBreaks', 'OverallFeeling', 'Notes']].astype(str).agg(' '.join, axis=1)
y = df['Label']

# Create and train pipeline
pipeline = make_pipeline(TfidfVectorizer(), RandomForestClassifier(n_estimators=100, random_state=42))
pipeline.fit(X, y)

# Save trained pipeline
joblib.dump(pipeline, 'model.pkl')
