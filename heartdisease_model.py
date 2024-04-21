# Google Colab:
# https://colab.research.google.com/drive/10bP5emhFkzq5k6hoy5Y6v-ZPUKAnPSlL?usp=sharing

import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score
import xgboost as xgb
from sklearn.model_selection import train_test_split

df = pd.read_csv('heart_data.csv')

y = df['HeartDisease']

label_encoder = LabelEncoder()
Y_full = label_encoder.fit_transform(y)

df_encoded = pd.get_dummies(df, columns=['Smoking', 'AlcoholDrinking', 'Stroke', 'DiffWalking', 'Sex', 'AgeCategory', 'Race', 'Diabetic', 'PhysicalActivity', 'GenHealth', 'Asthma', 'KidneyDisease', 'SkinCancer'])

X_full = df_encoded.iloc[:, 1:]

X_train, X_test, y_train, y_test = train_test_split(X_full, Y_full, test_size=0.05)

model = xgb.XGBClassifier(max_depth = 7, n_estimators = 500, enable_categorical=True)
model.fit(X_train, y_train)

# training error
y_predict_train = model.predict(X_train)
training_accuracy = accuracy_score(y_train, y_predict_train)
print("training accuracy: ")
print(training_accuracy)

#test error
y_predict_test = model.predict(X_test)
testing_accuracy = accuracy_score(y_test, y_predict_test)
print("testing accuracy: ")
print(testing_accuracy)
