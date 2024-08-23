import keras
import tensorflow as tf
from keras import layers

class NBeatsBlock(layers.Layer):
    def __init__(self,
                input_size: int,
                theta_size: int,
                horizon: int,
                n_neurons: int,
                n_layers: int,
                **kwargs):
        super().__init__(**kwargs)
        self.input_size = input_size
        self.theta_size = theta_size
        self.horizon = horizon
        self.n_neurons = n_neurons
        self.n_layers = n_layers

        # Block contains stack of 4 fully connected layers each has ReLU activation
        self.hidden = [layers.Dense(n_neurons, activation="relu") for _ in range(n_layers)]
        # Output of block is a theta layer with linear activation
        self.theta_layer = layers.Dense(theta_size, activation="linear", name="theta")

    def call(self, inputs): # the call method is what runs when the layer is called 
        x = inputs 
        for layer in self.hidden: # pass inputs through each hidden layer 
            x = layer(x)
        theta = self.theta_layer(x) 
        # Output the backcast and forecast from theta
        backcast, forecast = theta[:, :self.input_size], theta[:, -self.horizon:]
        return backcast, forecast
    
def create_model(N_NEURONS = 512,
                 N_LAYERS = 4,
                 N_STACKS = 30,
                 INPUT_SIZE = 60,
                 HORIZON = 30,
                 THETA_SIZE = 90, # INPUT_SIZE + HORIZON
                 WINDOW_SIZE = 60,
                 model_name = 'model_N-BEATS'):
    tf.random.set_seed(42)
    # 1. Setup N-BEATS Block layer
    nbeats_block_layer = NBeatsBlock(input_size=INPUT_SIZE,
                                    theta_size=THETA_SIZE,
                                    horizon=HORIZON,
                                    n_neurons=N_NEURONS,
                                    n_layers=N_LAYERS,
                                    name="InitialBlock")

    # 2. Create input to stacks
    stack_input = layers.Input(shape=[INPUT_SIZE], name="stack_input")

    # 3. Create initial backcast and forecast input (backwards predictions are referred to as residuals in the paper)
    backcast, forecast = nbeats_block_layer(stack_input)
    residuals = layers.subtract([stack_input, backcast], name=f"subtract_00") 

    # 4. Create stacks of blocks
    for i, _ in enumerate(range(N_STACKS-1)): # first stack is already creted in (3)

        # 5. Use the NBeatsBlock to calculate the backcast as well as block forecast
        backcast, block_forecast = NBeatsBlock(
            input_size=INPUT_SIZE,
            theta_size=THETA_SIZE,
            horizon=HORIZON,
            n_neurons=N_NEURONS,
            n_layers=N_LAYERS,
            name=f"NBeatsBlock_{i}"
        )(residuals) # pass it in residuals (the backcast)

        # 6. Create the double residual stacking
        residuals = layers.subtract([residuals, backcast], name=f"subtract_{i}") 
        forecast = layers.add([forecast, block_forecast], name=f"add_{i}")

    # 7. Put the stack model together
    model = keras.Model(inputs=stack_input, 
                            outputs=forecast, 
                            name=model_name)
    
    return model
