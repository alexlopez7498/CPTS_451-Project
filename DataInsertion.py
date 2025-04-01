import psycopg2
import pandas as pd
import numpy as np

# Database connection parameters
conn_params = {
    'dbname': 'database451',
    'user': 'postgres',  # replace with your username
    'password': 'Superjq1!',  # Replace with your password
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


# ------------------------
region_df = pd.read_csv('C:/Users/jack/Downloads/noc_regions.csv')  # replace with your path
athlete_events_df = pd.read_csv('C:/Users/jack/Downloads/athlete_events.csv/athlete_events.csv')

athlete_data = athlete_events_df[['ID', 'Name', 'Sex', 'Age', 'Height', 'Weight', 'NOC']].drop_duplicates('ID')
event_data = athlete_events_df[['Event', 'Sport', 'City', 'Season', 'Year']].drop_duplicates()
event_data['E_Id'] = range(1, len(event_data) + 1)
athlete_event_data = athlete_events_df.merge(event_data, on=['Event', 'Sport', 'City', 'Season', 'Year'])
athlete_event_data = athlete_event_data[['ID', 'E_Id', 'Medal']].drop_duplicates(['ID', 'E_Id'])
team_data = athlete_events_df[['Team', 'NOC']].drop_duplicates()
team_data['T_Id'] = range(1, len(team_data) + 1)
athlete_team_data = athlete_events_df.merge(team_data, on=['Team', 'NOC'])
athlete_team_data = athlete_team_data[['ID', 'T_Id']].drop_duplicates(['ID', 'T_Id'])
athlete_region_data = athlete_events_df[['ID', 'NOC']].drop_duplicates()

# Existing NOCs from region table (to handle missing NOCs)
existing_nocs = pd.read_sql("SELECT noc FROM region;", conn)['noc'].tolist()

# Create insert queries for each table
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
VALUES (%s, %s, %s, %s, %s);
"""

insert_athlete_event = """
INSERT INTO athlete_event (ID, E_Id, Medal)
VALUES (%s, %s, %s);
"""

insert_team = """
INSERT INTO team (Team, NOC)
VALUES (%s, %s);
"""

insert_athlete_team = """
INSERT INTO athlete_team (ID, T_Id)
VALUES (%s, %s);
"""

insert_athlete_region = """
INSERT INTO athlete_region (ID, NOC)
VALUES (%s, %s);
"""

# Create the data that will be inserted into each table, with logic to skip rows where NOC is missing or NULL
region_data_insert = [
    (row['NOC'], row['region'], row['notes']) 
    for _, row in region_df.iterrows()
]

athlete_data_insert = [
    (row['ID'], row['Name'], row['Sex'], row['Age'], row['Height'], row['Weight'], 
     row['NOC'] if row['NOC'] in existing_nocs else None)
    for _, row in athlete_data.iterrows() 
    if not pd.isnull(row['NOC'])  # Skip rows where NOC is NULL
]

event_data_insert = [
    (row['Event'], row['Sport'], row['City'], row['Season'], row['Year']) 
    for _, row in event_data.iterrows()
]

athlete_event_data_insert = [
    (row['ID'], row['E_Id'], row['Medal']) 
    for _, row in athlete_event_data.iterrows()
]

team_data_insert = [
    (row['Team'], row['NOC'] if row['NOC'] in existing_nocs else None, row['T_Id']) 
    for _, row in team_data.iterrows() 
    if not pd.isnull(row['NOC'])  # Skip rows where NOC is NULL
]

athlete_team_data_insert = [
    (int(row['ID']), int(row['T_Id'])) 
    for _, row in athlete_team_data.iterrows()
]

athlete_region_data_insert = [
    (int(row['ID']), row['NOC']) 
    for _, row in athlete_region_data.iterrows()
]

# Insert data into tables
def insert_data(query, data):
    try:
        cursor = conn.cursor()
        for record in data:
            cursor.execute(query, record)
        conn.commit()
        print(f"Data inserted successfully for {query.split()[2]}")
    except Exception as e:
        conn.rollback()
        print(f"Error inserting data: {e}")
    finally:
        cursor.close()

# Insert data into each table
insert_data(insert_region, region_data_insert)
insert_data(insert_athlete, athlete_data_insert)
insert_data(insert_event, event_data_insert)
insert_data(insert_athlete_event, athlete_event_data_insert)
insert_data(insert_team, team_data_insert)
insert_data(insert_athlete_team, athlete_team_data_insert)
insert_data(insert_athlete_region, athlete_region_data_insert)

# Close the connection
conn.close()
print("Connection closed.")