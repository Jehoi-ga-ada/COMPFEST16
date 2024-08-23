from modules import *
from modelcls import *
import pandas as pd

DATA_PATH = "../backend/src/data/"
df = pd.read_csv(DATA_PATH+'job_demand_30.csv', index_col=0)
df.head(3)

for i in df.columns.values:
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
    
    model = create_model(model_name=f"{i}_N-BEATS")
    results = train_and_save_model(model, 
                                   train_dataset, 
                                   test_dataset, 
                                   test_labels, 
                                   save_path=f"../models/model_{i}_N-BEATS.weights.h5")
