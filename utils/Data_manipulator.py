import matplotlib.pyplot as plt
import matplotlib as mpl
import numpy as np
import pandas as pd
import time
from tqdm import tqdm

tqdm.pandas()

def eanToFile():
    eanList = pd.Series([])

    for chunk in pd.read_csv("../Junction_Data.csv", chunksize=100000, delimiter=';'):
        eanList = eanList.append(chunk.EAN).drop_duplicates()
        print("new chunk!")
        print("eanList shape:", eanList.shape)
        
    eanList = eanList.astype('str')
    eanList = eanList.loc[eanList.str.len() == 13]
    eanList.to_csv('EAN_list.csv', index=False)
    print("total list:", eanList)
    print("total shape:", eanList.shape)


def test():
    data = next(pd.read_csv("../Junction_Data.csv", chunksize=100000, delimiter=';'))
    print(data.shape)

def printDates():
    for chunk in pd.read_csv("../Junction_Data.csv", chunksize=1000000, delimiter=';'):
        print(chunk.TransactionDate.iloc[:5])


#data.at[i, 'Quantity'] = data.at[i, 'Quantity'].replace(',','.')
#data['Quantity'] = data['Quantity'].astype('float')

def aggregateKCustomer(KCustomer):
    df = pd.DataFrame()    

    for chunk in tqdm(pd.read_csv("../Junction_Data.csv", chunksize=1000000, delimiter=';')):
        df.append(chunk.query('KCustomer == ' + KCustomer))
        print("New chunk!")
    df.to_csv(KCustomer + '_data.csv', index=False)

aggregateKCustomer('6712')

#chunk = next(pd.read_csv("junction/Junction_Data.csv", chunksize=100000, delimiter=';'))
#eanList = eanList.append(chunk.EAN).drop_duplicates()
#print("new chunk!")
#print(eanList.shape)

#acc_data.to_csv('kaggle_accuracy.csv', sep=',', index_label = 'Sample_id', header = ['Sample_label'])


#data['EAN'] = data['EAN'].astype('str')
#mask = data['EAN'].str.len() < 13
#a = data.loc[mask]


#def f(df, x, y):
#    keys, values, values2 = df.sort_values(x).values.T
#    ukeys, index = np.unique(keys,True)
#    arrays = np.split(values,index[1:])
#    df2 = pd.DataFrame({x:ukeys, y:[list(a) for a in arrays]})
#    return df2