import keras
import tensorflow as tf
import numpy as np
import os

def mean_absolute_scaled_error(y_true, y_pred):
    """
    Implement MASE (assuming no seasonality of data).
    """
    mae = tf.reduce_mean(tf.abs(y_true - y_pred))

    # Find MAE of naive forecast (no seasonality)
    mae_naive_no_season = tf.reduce_mean(tf.abs(y_true[1:] - y_true[:-1])) # our seasonality is 1 day (hence the shifting of 1 day)

    return mae / mae_naive_no_season

def evaluate_preds(y_true, y_pred):
    # Make sure float32 (for metric calculations)
    y_true = tf.cast(y_true, dtype=tf.float32)
    y_pred = tf.cast(y_pred, dtype=tf.float32)

    # Calculate various metrics
    mae = keras.metrics.mean_absolute_error(y_true, y_pred)
    mse = keras.metrics.mean_squared_error(y_true, y_pred) # puts and emphasis on outliers (all errors get squared)
    rmse = tf.sqrt(mse)
    mape = keras.metrics.mean_absolute_percentage_error(y_true, y_pred)
    mase = mean_absolute_scaled_error(y_true, y_pred)
    
    return {"mae": tf.reduce_mean(mae.numpy()),
            "mse": tf.reduce_mean(mse.numpy()),
            "rmse": tf.reduce_mean(rmse.numpy()),
            "mape": tf.reduce_mean(mape.numpy()),
            "mase": tf.reduce_mean(mase.numpy())}

def get_labelled_windows(x, horizon=1):
    return x[:, :-horizon], x[:, -horizon:]

def make_windows(x, window_size=7, horizon=1):
    """
    Turns a 1D array into a 2D array of sequential windows of window_size.
    """
    window_step = np.expand_dims(np.arange(window_size+horizon), axis=0)

    window_indexes = window_step + np.expand_dims(np.arange(len(x)-(window_size+horizon-1)), axis=0).T

    windowed_array = x[window_indexes]

    windows, labels = get_labelled_windows(windowed_array, horizon=horizon)

    return windows, labels

def get_windows_and_labels(data, window_size=60, horizon=30):
    full_windows, full_labels = make_windows(data, window_size=window_size, horizon=horizon)
    return full_windows, full_labels

def make_train_test_splits(windows, labels, test_split=0.2):
    """
    Splits matching pairs of windows and labels into train and test splits.
    """
    split_size = int(len(windows) * (1-test_split)) # this will default to 80% train/20% test
    train_windows = windows[:split_size]
    train_labels = labels[:split_size]
    test_windows = windows[split_size:]
    test_labels = labels[split_size:]
    return train_windows, test_windows, train_labels, test_labels

def create_model_checkpoint(model_name, save_path="model_experiments"):
    return keras.callbacks.ModelCheckpoint(filepath=os.path.join(save_path, model_name), # create filepath to save model
                                                verbose=0, # only output a limited amount of text
                                                save_best_only=True)

def dataset_from_tensor_slices(train_windows, train_labels, test_windows, test_labels, batch_size):
    # 1. Turn tensor slices to dataset
    train_features_dataset = tf.data.Dataset.from_tensor_slices(train_windows)
    train_labels_dataset = tf.data.Dataset.from_tensor_slices(train_labels)

    test_features_dataset = tf.data.Dataset.from_tensor_slices(test_windows)
    test_labels_dataset = tf.data.Dataset.from_tensor_slices(test_labels)

    # 2. Combine features and labels
    train_dataset = tf.data.Dataset.zip((train_features_dataset, train_labels_dataset))
    test_dataset = tf.data.Dataset.zip((test_features_dataset, test_labels_dataset))

    # 3. Batch and prefetch for optimal performance
    train_dataset = train_dataset.batch(batch_size).prefetch(tf.data.AUTOTUNE)
    test_dataset = test_dataset.batch(batch_size).prefetch(tf.data.AUTOTUNE)

    return train_dataset, test_dataset

def train_and_save_model(model,
                 train_dataset,
                 test_dataset,
                 test_labels,
                 N_EPOCHS=5000,
                 loss="mae",
                 optimizer=keras.optimizers.Adam(0.001),
                 metrics=["mae", "mse"],
                 verbose=1,
                 callbacks=[keras.callbacks.EarlyStopping(monitor="val_loss", patience=200, restore_best_weights=True),
                            keras.callbacks.ReduceLROnPlateau(monitor="val_loss", patience=100, verbose=1)],
                 save_path='../models/model.weights.h5'):
    model.compile(loss=loss,
                  optimizer=optimizer,
                  metrics=metrics)

    # 9. Fit the model with EarlyStopping and ReduceLROnPlateau callbacks
    model.fit(train_dataset,
              epochs=N_EPOCHS,
              validation_data=test_dataset,
              verbose=verbose, # prevent large amounts of training outputs
              # callbacks=[create_model_checkpoint(model_name=stack_model.name)] # saving model every epoch consumes far too much time
              callbacks=callbacks)
    
    # Make predictions with model
    model_preds = model.predict(test_dataset)
    model_results = evaluate_preds(y_true=tf.squeeze(test_labels),
                                 y_pred=model_preds)
    print(model_results)
    model.save_weights(save_path)
    return model_results