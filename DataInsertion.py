
import psycopg2
import pandas as pd
# Database connection parameters
conn_params = {
    'dbname': '451Database', 
    'user': 'postgres', # replace with your username
    'password': '*******',     # Replace with your password
    'host': 'localhost', 
    'port': '5432'
}


# Establish a connection
try:
    conn = psycopg2.connect(**conn_params)
    print("Connected to the database!")
except Exception as e:
    print(f"Error: {e}")
    exit()

# read the CSV files
region_df = pd.read_csv('C:/Users/epich/Downloads/noc_regions.csv') # replace with the file that has the data on your computer
athlete_events_df = pd.read_csv('C:/Users/epich/Downloads/vh/athlete_events.csv/athlete_events.csv') # # replace with the file that has the data on your computer
athlete_data = athlete_events_df[['ID', 'Name', 'Sex', 'Age', 'Height', 'Weight', 'NOC']].drop_duplicates('ID')
event_data = athlete_events_df[['Event', 'Sport', 'City', 'Season', 'Year']].drop_duplicates()
event_data['E_Id'] = range(1, len(event_data) + 1)
athlete_event_data = athlete_events_df.merge(event_data, on=['Event', 'Sport', 'City', 'Season', 'Year'])
athlete_event_data = athlete_event_data[['ID', 'E_Id', 'Medal']].drop_duplicates(['ID','E_Id'])
team_data = athlete_events_df[['Team', 'NOC']].drop_duplicates()
team_data['T_Id'] = range(1, len(team_data) + 1)
athlete_team_data = athlete_events_df.merge(team_data, on=['Team', 'NOC'])
athlete_team_data = athlete_team_data[['ID', 'T_Id']].drop_duplicates(['ID','T_Id'])
athlete_region_data = athlete_events_df[['ID', 'NOC']].drop_duplicates()

# create insert queries for each table
insert_region = """
INSERT INTO region (NOC, region, notes)
VALUES (%s, %s, %s);
"""
insert_athlete = """
INSERT INTO athlete (ID, Name, Sex, Age, Height, Weight, NOC)
VALUES (%s, %s, %s, %s, %s, %s, %s);
"""
insert_event = """
INSERT INTO event (Event, Sport, City, Season, Year)
VALUES (%s, %s, %s, %s, %s, %s, %s);
"""
insert_athlete_event = """
INSERT INTO event (ID, E_Id, Medal)
VALUES (%s, %s, %s);
"""
insert_team = """
INSERT INTO event (Team, NOC)
VALUES (%s, %s);
"""
insert_athlete_team = """
INSERT INTO event (ID, T_Id)
VALUES (%s, %s);
"""
insert_athlete_region = """
INSERT INTO athlete_region (ID, NOC)
VALUES (%s, %s);
"""

# create the data that will be inserted into each table
region_data_insert = [
    (row['NOC'], row['region'],row['notes'])  
    for index, row in region_df.iterrows()
]
athlete_data_insert = [
    (row['ID'], row['Name'],row['Sex'], row['Age'],row['Height'], row['Weight'],row['NOC'])  
    for index, row in athlete_data.iterrows()
]
event_data_insert = [
    (row['Event'], row['Sport'],row['City'], row['Season'],row['Year'])  
    for index, row in event_data.iterrows()
]
athlete_event_data_insert = [
    (row['ID'], row['E_Id'], row['Medal'])  
    for index, row in athlete_event_data.iterrows()
]
team_data_insert = [
    (row['Team'], row['NOC'])  
    for index, row in team_data.iterrows()
]
athlete_team_data_insert = [
    (int(row['ID']), int(row['T_Id']))  
    for index, row in athlete_team_data.iterrows()
]
athlete_region_data_insert = [
    (int(row['ID']), row['NOC'])  
    for index, row in athlete_region_data.iterrows()
]
# below are for inserting each data into their tables
#############################
try:
    cursor = conn.cursor()
    for record in region_df:
        cursor.execute(region_data_insert, record)
    conn.commit()
    print("Data inserted successfully!")
except Exception as e:
    conn.rollback()
    print(f"Error: {e}")
finally:
    cursor.close()
#############################
try:
    cursor = conn.cursor()
    for record in athlete_data:
        cursor.execute(athlete_data_insert, record)
    conn.commit()
    print("Data inserted successfully!")
except Exception as e:
    conn.rollback()
    print(f"Error: {e}")
finally:
    cursor.close()
#############################
try:
    cursor = conn.cursor()
    for record in event_data:
        cursor.execute(event_data_insert, record)
    conn.commit()
    print("Data inserted successfully!")
except Exception as e:
    conn.rollback()
    print(f"Error: {e}")
finally:
    cursor.close()
#############################
try:
    cursor = conn.cursor()
    for record in athlete_event_data:
        cursor.execute(athlete_event_data_insert, record)
    conn.commit()
    print("Data inserted successfully!")
except Exception as e:
    conn.rollback()
    print(f"Error: {e}")
finally:
    cursor.close()
#############################
try:
    cursor = conn.cursor()
    for record in team_data:
        cursor.execute(team_data_insert, record)
    conn.commit()
    print("Data inserted successfully!")
except Exception as e:
    conn.rollback()
    print(f"Error: {e}")
finally:
    cursor.close()
#############################
try:
    cursor = conn.cursor()
    for record in athlete_team_data:
        cursor.execute(athlete_team_data_insert, record)
    conn.commit()
    print("Data inserted successfully!")
except Exception as e:
    conn.rollback()
    print(f"Error: {e}")
finally:
    cursor.close()
#############################
try:
    cursor = conn.cursor()
    for record in athlete_region_data:
        cursor.execute(insert_athlete_region, record)
    conn.commit()
    print("Data inserted successfully!")
except Exception as e:
    conn.rollback()
    print(f"Error: {e}")
finally:
    cursor.close()

# Query data 
# select_query = "SELECT * FROM Region;" # PUT ANY SEARCH QUERY HERE TO TEST IT

# try:
#     cursor = conn.cursor()
#     cursor.execute(select_query)
#     rows = cursor.fetchall()

#     print("Regions:")
#     for row in rows:
#         print(row)
# except Exception as e:
#     print(f"Error: {e}")
# finally:
#     cursor.close()

# Close the connection
conn.close()
print("Connection closed.")