import psycopg2
import pandas as pd

# --- Helper functions to clean NaNs ---
def to_int(val):
    return None if pd.isna(val) else int(val)

def to_float(val):
    return None if pd.isna(val) else float(val)

# Database connection parameters
conn_params = {
    'dbname': 'database451',
    'user': 'postgres',
    'password': '',
    'host': 'localhost',
    'port': '5432'
}

# Connect
conn = psycopg2.connect(**conn_params)
print("Connected to the database!")

# DROP all tables
drop_sql = """
DROP TABLE IF EXISTS athlete_region CASCADE;
DROP TABLE IF EXISTS athlete_team CASCADE;
DROP TABLE IF EXISTS athlete_event CASCADE;
DROP TABLE IF EXISTS team CASCADE;
DROP TABLE IF EXISTS event CASCADE;
DROP TABLE IF EXISTS athlete CASCADE;
DROP TABLE IF EXISTS region CASCADE;
"""
with conn.cursor() as cur:
    cur.execute(drop_sql)
    conn.commit()
    print("Dropped all tables.")

# CREATE tables
create_sql = """
CREATE TABLE region (
    NOC VARCHAR PRIMARY KEY,
    region VARCHAR,
    notes VARCHAR
);

CREATE TABLE athlete (
    ID BIGINT PRIMARY KEY,
    Name VARCHAR,
    Sex VARCHAR,
    Age INT,
    Height FLOAT,
    Weight FLOAT,
    NOC VARCHAR REFERENCES region(NOC)
);

CREATE TABLE event (
    e_id SERIAL PRIMARY KEY,
    Event VARCHAR,
    Sport VARCHAR,
    City VARCHAR,
    Season VARCHAR,
    Year INT
);

CREATE TABLE athlete_event (
    ID BIGINT REFERENCES athlete(ID),
    e_id INT REFERENCES event(e_id),
    Medal VARCHAR,
    PRIMARY KEY (ID, e_id)
);

CREATE TABLE team (
    T_Id SERIAL PRIMARY KEY,
    Team VARCHAR,
    NOC VARCHAR REFERENCES region(NOC)
);

CREATE TABLE athlete_team (
    ID BIGINT REFERENCES athlete(ID),
    T_Id INT REFERENCES team(T_Id),
    PRIMARY KEY (ID, T_Id)
);

CREATE TABLE athlete_region (
    ID BIGINT REFERENCES athlete(ID),
    NOC VARCHAR REFERENCES region(NOC),
    PRIMARY KEY (ID, NOC)
);
"""
with conn.cursor() as cur:
    cur.execute(create_sql)
    conn.commit()
    print("Created all tables.")

# LOAD CSVs
region_df = pd.read_csv('noc_regions.csv')
athlete_events_df = pd.read_csv('athlete_events.csv')

# PREP dataframes
athlete_df = athlete_events_df[['ID','Name','Sex','Age','Height','Weight','NOC']].drop_duplicates('ID')
event_df   = athlete_events_df[['Event','Sport','City','Season','Year']].drop_duplicates()
team_df    = athlete_events_df[['Team','NOC']].drop_duplicates()
region_codes = set(region_df['NOC'])

# Append missing NOCs
needed = set(athlete_df['NOC']).union(team_df['NOC']) - region_codes
for noc in needed:
    region_df.loc[len(region_df)] = [noc, 'Unknown', None]

# Build insert lists
region_data = [(r.NOC, r.region, r.notes) for r in region_df.itertuples()]
athlete_data = [
    (row.ID, row.Name, row.Sex,
     to_int(row.Age), to_float(row.Height), to_float(row.Weight),
     row.NOC)
    for row in athlete_df.itertuples()
]
event_data = [(r.Event, r.Sport, r.City, r.Season, r.Year) for r in event_df.itertuples()]
team_data = [(r.Team, r.NOC) for r in team_df.itertuples()]
athlete_region_data = [(int(r.ID), r.NOC) for r in athlete_df.itertuples()]

# INSERT region
with conn.cursor() as cur:
    cur.executemany("INSERT INTO region (NOC, region, notes) VALUES (%s, %s, %s);", region_data)
    conn.commit()
    print("Inserted regions:", len(region_data))

# INSERT athlete
with conn.cursor() as cur:
    cur.executemany(
        "INSERT INTO athlete (ID, Name, Sex, Age, Height, Weight, NOC) VALUES (%s,%s,%s,%s,%s,%s,%s);",
        athlete_data
    )
    conn.commit()
    print("Inserted athletes:", len(athlete_data))

# INSERT event and build map
event_map = {}
with conn.cursor() as cur:
    for rec in event_data:
        cur.execute(
            "INSERT INTO event (Event,Sport,City,Season,Year) VALUES (%s,%s,%s,%s,%s) RETURNING e_id;",
            rec
        )
        eid = cur.fetchone()[0]
        event_map[rec] = eid
    conn.commit()
    print("Inserted events & mapped:", len(event_map))

# Build athlete_event list
ae_inserts = []
for r in athlete_events_df.itertuples():
    key = (r.Event, r.Sport, r.City, r.Season, r.Year)
    eid = event_map.get(key)
    if eid is not None:
        ae_inserts.append((int(r.ID), eid, r.Medal))

# Deduplicate athlete_event
seen = set()
deduped_ae = []
for rec in ae_inserts:
    k = (rec[0], rec[1])
    if k not in seen:
        deduped_ae.append(rec)
        seen.add(k)

# INSERT athlete_event with conflict skip
with conn.cursor() as cur:
    cur.executemany(
        """
        INSERT INTO athlete_event (ID, e_id, Medal)
        VALUES (%s, %s, %s)
        ON CONFLICT (ID, e_id) DO NOTHING;
        """,
        deduped_ae
    )
    conn.commit()
    print("Inserted athlete_event (duplicates skipped):", len(deduped_ae))

# INSERT team
with conn.cursor() as cur:
    cur.executemany("INSERT INTO team (Team, NOC) VALUES (%s, %s);", team_data)
    conn.commit()
    print("Inserted teams:", len(team_data))

# Build and INSERT athlete_team
with conn.cursor() as cur:
    cur.execute("SELECT T_Id, Team, NOC FROM team;")
    tmap = {(row[1], row[2]): row[0] for row in cur.fetchall()}
at_inserts = []
for r in athlete_events_df[['ID','Team','NOC']].drop_duplicates().itertuples():
    tid = tmap.get((r.Team, r.NOC))
    if tid:
        at_inserts.append((int(r.ID), tid))
with conn.cursor() as cur:
    cur.executemany("INSERT INTO athlete_team (ID, T_Id) VALUES (%s, %s);", at_inserts)
    conn.commit()
    print("Inserted athlete_team:", len(at_inserts))

# INSERT athlete_region
with conn.cursor() as cur:
    cur.executemany("INSERT INTO athlete_region (ID, NOC) VALUES (%s, %s);", athlete_region_data)
    conn.commit()
    print("Inserted athlete_region:", len(athlete_region_data))

conn.close()
print("Done.")
