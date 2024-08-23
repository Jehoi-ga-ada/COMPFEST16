from modules import *
from modelcls import *
import pandas as pd
from tqdm import tqdm
import json
import os

DATA_PATH = "../backend/src/data/"
df = pd.read_csv(DATA_PATH+'job_demand_30.csv', index_col=0)
df.head(3)

keys = {}

for idx, i in tqdm(enumerate(df.columns.values)):
    keys[idx] = i    
    if os.path.exists(f'../models/model_{idx}_N-BEATS.weights.h5'):
        print('Weights found. Skipped.')
        continue

    print(f'Training for column: {i}')

    demand = df[i].to_numpy()

    WINDOW_SIZE = 60
    HORIZON = 30
    full_windows, full_labels = make_windows(demand, window_size=WINDOW_SIZE, horizon=HORIZON)

    train_windows, test_windows, train_labels, test_labels = make_train_test_splits(full_windows, full_labels)

    train_dataset, test_dataset = dataset_from_tensor_slices(train_windows, 
                                                             train_labels, 
                                                             test_windows, 
                                                             test_labels, 
                                                             batch_size=32)

    model = create_model(model_name=f"{idx}_N-BEATS")
    optimizer = keras.optimizers.Adam(0.001)
    callbacks=[keras.callbacks.EarlyStopping(monitor="val_loss", patience=200, restore_best_weights=True),
               keras.callbacks.ReduceLROnPlateau(monitor="val_loss", patience=100, verbose=1)]
    results = train_and_save_model(model, 
                                   train_dataset, 
                                   test_dataset, 
                                   test_labels,
                                   optimizer=optimizer, 
                                   callbacks=callbacks,
                                   save_path=f"../models/model_{idx}_N-BEATS.weights.h5")

with open('keys.json', 'w') as f:
    json.dump(keys, f)