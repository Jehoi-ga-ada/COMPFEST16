import pandas as pd
from modules import *
from modelcls import *
import tensorflow as tf
from tqdm import tqdm
import json

DATA_PATH = "../backend/src/data/"
df = pd.read_csv(DATA_PATH+'job_demand_30.csv', index_col=0)
df.head(3)

json_data = {"jobs":[]}
for idx, i in tqdm(enumerate(df.columns.values)):
    print(f'Making predictions for column: {i}')

    demand = df[i].to_numpy()[-60:]

    model = create_model(model_name=f"{idx}_N-BEATS")
    model.load_weights(f"../models/model_{idx}_N-BEATS.weights.h5")
    model_preds = model.predict(tf.expand_dims(demand, axis=0))

    json_data["jobs"].append({"name": i,
                              "trendData":df[i][::-30].to_list()[::-1],
                              "trendDates":df[i][::-30].index.to_list()[::-1],
                              "prediction":[float(model_preds[:, -1][0])],
                              "predictionDates":['2022-09-29']})

with open('../backend/src/data/data.json', 'w') as f:
    json.dump(json_data, f)