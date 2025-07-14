from fastapi import FastAPI
from dotenv import load_dotenv
import os
import requests

load_dotenv()
API_KEY = os.getenv("API_KEY")
HEADERS = {"X-Riot-Token": API_KEY}

app = FastAPI()

# Regional routes: americas, europe, asia, etc.
REGIONAL_ROUTES = {
    "na": "americas",
    "eu": "europe",
    "kr": "asia",
    "br": "americas",
    "latam": "americas",
}


# get account info by summoner name, tag and region
@app.get("/riot-account/{region}/{game_name}/{tagline}")
def get_riot_account(region: str, game_name: str, tagline: str):
    regional_route = REGIONAL_ROUTES.get(region.lower())
    if not regional_route:
        return {"error": "Unsupported region"}

    url = f"https://{regional_route}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{game_name}/{tagline}"

    response = requests.get(url, headers=HEADERS)

    if response.status_code == 200:
        return response.json()
    else:
        return {
            "error": f"Failed with status code {response.status_code}",
            "details": response.text,
        }


# get account info by PUUID and region
@app.get("/riot/account/by-puuid/{region}/{puuid}")
def get_account_by_puuid(region: str, puuid: str):
    regional_route = REGIONAL_ROUTES.get(region.lower())
    if not regional_route:
        return {"error": "Unsupported region"}

    url = f"https://{regional_route}.api.riotgames.com/riot/account/v1/accounts/by-puuid/{puuid}"

    response = requests.get(url, headers=HEADERS)

    if response.status_code == 200:
        return response.json()
    else:
        return {
            "error": f"Failed with status code {response.status_code}",
            "details": response.text,
        }


# get match history by region and PUUID
@app.get("/match-history/{region}/{puuid}")
def get_match_history(region: str, puuid: str, count: int = 5):
    regional_route = REGIONAL_ROUTES.get(region.lower())
    if not regional_route:
        return {"error": "Unsupported region"}

    url = f"https://{regional_route}.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=10"
    params = {"start": 0, "count": count}

    response = requests.get(url, headers=HEADERS, params=params)

    if response.status_code == 200:
        return {"match_ids": response.json()}
    else:
        return {
            "error": f"Failed to fetch match history. Status: {response.status_code}",
            "details": response.text,
        }


# get match details by region and match ID
@app.get("/match-details/{region}/{match_id}")
def get_match_details(region: str, match_id: str):
    regional_route = REGIONAL_ROUTES.get(region.lower())
    if not regional_route:
        return {"error": "Unsupported region"}

    url = f"https://{regional_route}.api.riotgames.com/lol/match/v5/matches/{match_id}"

    response = requests.get(url, headers=HEADERS)

    if response.status_code == 200:
        return response.json()
    else:
        return {
            "error": f"Failed to fetch match details. Status: {response.status_code}",
            "details": response.text,
        }


# get bulk matches
@app.get("/match-details/bulk/{region}/{puuid}")
def get_multiple_match_details(region: str, puuid: str, count: int = 5):
    regional_route = REGIONAL_ROUTES.get(region.lower())
    if not regional_route:
        return {"error": "Unsupported region"}

    # Get match IDs first
    matchlist_url = f"https://{regional_route}.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids"
    params = {"start": 0, "count": count}
    matchlist_response = requests.get(matchlist_url, headers=HEADERS, params=params)

    if matchlist_response.status_code != 200:
        return {
            "error": f"Failed to fetch match IDs. Status: {matchlist_response.status_code}",
            "details": matchlist_response.text,
        }

    match_ids = matchlist_response.json()
    match_details_list = []

    # Fetch details for each match ID
    for match_id in match_ids:
        match_url = f"https://{regional_route}.api.riotgames.com/lol/match/v5/matches/{match_id}"
        match_response = requests.get(match_url, headers=HEADERS)
        if match_response.status_code == 200:
            match_details_list.append(match_response.json())
        else:
            match_details_list.append(
                {
                    "match_id": match_id,
                    "error": f"Failed to fetch. Status: {match_response.status_code}",
                    "details": match_response.text,
                }
            )

    return {"matches": match_details_list}
