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

def get_chunk(chunk_size):
    return next(pd.read_csv("../Junction_Data.csv", chunksize=chunk_size, delimiter=';'))

def aggregateByField(fieldName, query):
    #df = pd.DataFrame()    

    for chunk in tqdm(pd.read_csv("../Junction_Data.csv", chunksize=1000000, delimiter=';')):
        chunk[chunk[fieldName] == query].to_csv(query + '_data.csv', index=False, mode='a')
        print("New chunk!")

def get_mock_database():
    database_size = 10 ** 4
    df = get_chunk(database_size)
    
    df['EAN'] = df['EAN'].astype('str')
    df = df.loc[df['EAN'].str.len() == 13]

    add_user_id(df)

    df = df[['EAN', 'Quantity', 'PersonAgeGrp', 'userId']]

    for i in df.index:
        df.at[i, 'Quantity'] = float(df.at[i, 'Quantity'].replace(',','.'))

    user_df = df.query("userId == '9001'").drop_duplicates(subset='EAN')
    template_df = df.query("userId == '1337'").drop_duplicates(subset='EAN')
    
    print(df.shape)
    df = user_df.append(template_df)
    print(df.shape)
    
    df.to_csv('purchase_list.csv', index=False)

    return df


def add_user_id(data):
    receipts = get_mock_receipts(data)
    mock_id = '9001'
    template_id = '1337'
    df = data
    df['userId'] = template_id

    for i in df.index:
        if (df.at[i, 'Receipt'] in receipts):
            df.at[i, 'userId'] = mock_id


def get_mock_receipts(data):
    df = data.query("PersonAgeGrp == '35-44' and EasyClass == 'E_1-3' and KCustomer == 6712 and QualClass == 'Q_8-10'")
    receipts = df.Receipt.drop_duplicates().iloc[:10].values

    return receipts

get_mock_database() 

#aggregateKCustomer('6712')

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