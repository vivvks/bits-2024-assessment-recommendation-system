import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np
import regex as re
import pandas as pd
import pickle

df = pd.read_json('./resp.json')
data = df['item'].to_list()

def recommendItems(items, result_count):
    # Tokenize the text data
    tokenizer = Tokenizer()
    tokenizer.fit_on_texts(data)
    total_words = len(tokenizer.word_index) + 1
    
    # Create input sequences
    input_sequences = []
    for line in data:
        token_list = tokenizer.texts_to_sequences([line])[0]
        for i in range(1, len(token_list)):
            n_gram_sequence = token_list[:i+1]
            input_sequences.append(n_gram_sequence)
    
    # Pad sequences and split into predictors and label
    max_sequence_len = max([len(seq) for seq in input_sequences])
    input_sequences = np.array(pad_sequences(
        input_sequences, maxlen=max_sequence_len, padding='pre'))
    X, y = input_sequences[:, :-1], input_sequences[:, -1]
    
    # Convert target data to one-hot encoding
    y = tf.keras.utils.to_categorical(y, num_classes=total_words)

    model = Sequential()
    model.add(Embedding(total_words, 10,
                        input_length=max_sequence_len-1))
    model.add(LSTM(128))
    model.add(Dense(total_words, activation='softmax'))
    model.compile(loss='categorical_crossentropy',
                optimizer='adam', metrics=['accuracy'])


    # Train the model
    model.fit(X, y, epochs=100, verbose=1)
    print("**** LSTM ****")

    # save the model to disk
    filename = 'trained_model.sav'
    pickle.dump(model, open(filename, 'wb'))
    # model = pickle.load(open(filename, 'rb'))

    seed_text = items
    next_words = result_count
 
    for _ in range(next_words):
        token_list = tokenizer.texts_to_sequences([seed_text])[0]
        token_list = pad_sequences(
            [token_list], maxlen=max_sequence_len-1, padding='pre')
        predicted_probs = model.predict(token_list)
        predicted_word = tokenizer.index_word[np.argmax(predicted_probs)]
        seed_text += " " + predicted_word
        list_item = seed_text.split(' ')
        ret = list_item[1:]
    return ret

print(recommendItems("17374,13997,17375,17377", 20))
