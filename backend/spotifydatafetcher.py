import spotipy
import random
import json
from spotipy.oauth2 import SpotifyClientCredentials


class SpotifyDataFetcher():
    def __init__(self, num_recs=3):
        # The number of song recommendations to generate
        self.num_recs = num_recs

        self.spclient = None
        # The category of songs that should be fetched
        self.category = None
        self.playlist_id = None
        self.playlist_track_ids = None

    def get_song_recommendations(self, task: str) -> dict:
        category = self.__infer_task_category(task)

        # Rick roll the user if their tasks can't be mapped to a category
        if category is not None:
            self.category = category
        else:
            return [{'name': 'Never Gonna Give You Up', 'artist': 'Rick Astley', 'image': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhIQEhMSFRAQEA8QEBAQDw8PDxAQFRUWFhUSFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQFSsdHR0rKy0tKy0rLSsrLS0tLS0tLSsrLSstLS0rLS0tLS0tLS0rLS0tKy0tLS0tLTcrKy0tK//AABEIAL4BCQMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBAUGB//EAD8QAAIBAgQEAwUFBQYHAAAAAAABAgMRBBIhMQVBUXEGE2EiMoGRoRRCcrHBYtHh8PEkQ1KCkrIjMzRTVKLC/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAIxEBAQACAgICAQUAAAAAAAAAAAECEQMhMUEEEiITFDJCUf/aAAwDAQACEQMRAD8A14YbRdkP9mL8IaLsiTiel9WbPWGF9nNBQJQpE6Wpww1lsQqUVsaU0BcBaDP+zjfZzSjRuRdPUWjVvsumwN4M1ZU9PkP5WxOjYTw4zoGzUoIqypiNnukyKpWNB0yEqZNhq8YIdUbhsgyVhaNVdHUI6FguUdkZWTuqk34V3TQFSj6pXsnJZb/MyfEOKkpLy6ji1o0rtdTnpcSqSabm5NO8W09+xw5fJtusY6v2+Mn5V3Msq3aXdpMmqJwXmym3nl8tLsuYDiE4O0aktLey9Uy8OfL+0TlxY+q7LyB/ICcPrqpCMtL29pLkyy4nZLtzWaql5BHyS8okLD0lT8ofyi24jZR6CuqI/kFpRJZQ0mqnkjeQXMosoaSp+QN5BeyjZA0S7BaLsh2KGy7ITO1BJBI6K5BIeT+hK0WyNibFBomgWlT0AOOvxLcUtyrz+JJiyWxJwXqNa7+g9SNvqKmHVsuhVauSkhRWojTdFA6lFFjLcg4og1arTXIDJGi2ra2KlWK5MlSsZ+IVS2vq1a1+1v52NE5bj2IvXyxzJxSUnfT4HB8zd1jHX8aa3ap46MpKyWqvrzMufD6m+XrqjcfJFzDy0sZcfFI1zv27cnTwlRfdbJwpNO7TXdHZwt0XyB4vDxlFppXa3tszX9JnoHwpX9pwS99XvfZo6ixxvhmk/P8AwqTOzidHB4YcnlEHHcLIFHdHQxEqQBIsNAJBBTjoiK40p3HIJkkxJpxDXFcNJXqey7IYnBaLshsp1phDEmhrCWYUYjqAxIWMmhWitQsZaO4JMRjXtrtuwVSo3zIyZBiBmTo78viM4O1yJNUs5X1XyByp67jUJPUnrd9kQcJQS5LboV69bdInVqboqyZKgpHJYmnerKTd9frzOg4riZQisvN2btcBRqQ8lycU5PMnot/5ZwfI/nHfxcWU4vt6rn69Sz95LvqToYqUXq4yXVJoNFx5pApe1K9tLhA0J4yMX7V7Oz01DqvGSunfQFXwqnFJ305p2Yyw2Vb3sna6Wb58zWb0DeG43qzlyy29NzpoT5FHhmDVOnFLeSUpPq2WDbix1O3Hnd1ZnsV47onCpyZBGqFicXYrsLOpyBDJJMix7CYEZDjDginuK4yHGhpQ2XZEkRhsuyJWNxCHUSVOFw0l0FtSEYaAa0dS1BdQOIjrcAARY4wjNYPGl13IU46hno93Ym00HDk9rFacLaF1u/MrV469STChKzFXnuRZCRNUaxFQuSsHjTsiacZ2PwmeLjz3XLVGBKlOCcZKyfWz2OvklcwuPpO1t0r/AKM5eXH26+Hky19PTAqIjRoRk/alb4k60E1Zlahg4apOak+k9Pk0zKNp23KdPKtG3rfV3JTlf6IrYLDOEbOTlfray7G3w/B3Sm+6VvkzXHd6Z5ZaWMHRcYRi+UUmSqUrdg40lodE6cmV3dqoh2hFbSQSjC+oMsUE7DIp0wUolqLQ06V9QJUEO0IE0whCKZ1pU9l2RNEKWy7ItRRts4gqvoJ130DRWpLT5C2au6z6EZVmHnL6AK1RPYQAchswmTpUrq4jhRregzrhI4dEVh0TaoPz/QXnemg/2ddRvIXUnZg1JA2x5g9xUxfOS5CeJ9BvJ9RpUPUi1RvO6XMXj8tYtdGa7teyerdjI4k4Sllc3HLztdJP+l/iY8l3NNuLq7rFbsWMNiY87fIWIoU0nlqqVraZJJsehCC5amMlldEsy8LSlfXkbPD8ZCcfZesPZlHZxa01RjRey6uyRiccxUqOKc6bs7Qb6P2Ve5vj12x5une5+46qL1Od4X4mjUXtRtJe9le3rqatHH0pbTXZ6FzOMNVak16gwkY32s+xFoqUig1zDKouugFBfLRW0iOrHqP5q6kI0UOqCGSE8r5ggyorYjUppAkNjCGCM60aT0XZBIPUFT2XZBae5vs1iU7jR/iNffoCq1WxGVZ6gmx2RYjRLELqO31AItN7Im0zSbtt9Rrvp9SchSehJwKLfT6kZN2bt1C30BTej7E2qZ85EYvUavUSTb2SbfY57H+IYxvZmeWci8cduhxOOjBXdtPU5riXiZe7H+i5s5jiXF51Ha9l3M3Mzny5LV7xxehcAx/m5pdIy/d+pVx6tUfW6/2xKvgmXs1ukYr5t/wC42pepL0y/wC1Cw7h3Lo0tn8PzBUatgsbuMktW0tu5d4bwyzzS1fJckafW2r485jjdrPC8M7+ZPe3srov3nJ+K6l8RU9Mq/8AVHacRxsaNOU3yWi6vkjzXFVnOTk9XJtvuzTPWM0wyzuV3Q6OJcJXXxXU1aPEWldGHIJhp23enzObYxy036fG5R2lJdma+D8VW99pr1975nEynfYkol479C5vTcBxujWeSMrT/wAL59maN2jyvC1XCUZRdnFpp+p6fha2enCp/jipfHmdGFvtO9rVOZNT+pXhLX0LGhomnm7IDOq2EnHQriTTjCEOVNaKWi7Ie4nDRdkRaNdknKrpYg5DCir6C2ZyDYe1rldk7NOlqyw0r/DqAoJXCq2orTPJba/Uaa9fqRaVyM8pJxKa03YGu/Z3FNIBWtb4k2rjG8SVGsPVfVJfNo84lO71O98ZSth3bnOKf1Z59zObmy7it9FUl6EEPJjNGKGrwfi7oKdo5s6iveslZnQcNrTryTj5DbUVKOXM4rq7nFo7Lwl1cacYqCtNe89fvF4bVKtYuvXjJx8qlpopQcITavo7PsGwfEauuehKy+9GUJfNXAceo5ql/s6qrLH21PLLnyMWrTgt8PiYfgnKX6mu7iq6ovijHOpZOlVjZ2hKVlH1ukczKRpY+pFpKM6719yqnZGVPcjLK3tFMwlGlKWkU27XsldgmbHh6eVzfPKrfPUytPjx+2UxZlKLvqu4SUtexo+IElJSW9RJu3VaP9DPo4abTai3l1k0m1FG2N6HJh9crDxm7npHhmblhqd+WZLsmzznB0XUlGEVdyaS7nqfDsKqVKFP/DFJvq+f1NsE4iMlSkNJDGoo1WfIDcQgTTiJtdCAJasNYq+1gMgiVkr9FYEakdBqcLManTJZXyZNMqz0sVWydZy2YFkhaw+1yUQUaiSsJ1F1EcSUdX3IzWuxFVl1IOqupKjzS6IBWWxN1F1BVJXZKmL4rpZsNP8AZcZfX+J5vUZ6h4g/6er+Bnl8jDm9HfCA4wmYoOdX4TnGKbcWr2jnd3GTb0RyZtcAkn7OeV1tC3s7rXuVjdU41uOVKTqO6r3SScqeZR0KCxFNbYmvH0nBsnHEW0WLUbfdlDRegVVqr2xGHn+KKRdq2XxGvdL+0Kp+zkyy7mNUepvcTjUteSoW607Zjn5PVk29JyOmaHCH/wASK6qSfyMy5f4PJebD4/kQML+Ub+MwKqqnZ6xbTXOz5mph/Kw8bLV80+b9StQptq6DYtxnTcZKzyv2vXkHnp6Fk39mNhJ5sVB0o2vUTyrZO+tvQ9IPMuEY/wAiqqlrpXTXo9HY9Iw2IjUipwd4yV0zrw66cFu7RmrgmglxOxpE0IlGIrE6bKTU7CyDKSQ+dCSMp3S7IWYHDZdkOabC3TmrW+ZOMt0U4LVB525dCaYNSd2DuNcSvyEFh8kNOK12AuUuhCVSXQVODZF0IRiiDqvoN5j6Emm0gc9xKTExHtl+JFfDVfw/qeYTR6xxSnmpVI9YS/I8nrmHKq+EBpMZCZigja8N1HeSust4Np7t5lsYhqeH37ctPurXp7SHj5OeWsvOa9zDTXLVJ/EhOjJ+9g6b9YSRWVCHPDVb23hJ6+pG1JcsVT/1NFVoji6Ef/EnF9VK9jCxCs9rejNmu09sVJ9IyzQZn47CySu7u/3nZpvuiU5RSua3A8FnvNS9qElp6GOWeH42VKV48911IHHcZlNu84fhZXlrZWbXqwfFqr8md1ZtWv6lTA8bzRXKX3loPxPHx8t5mtdFs9y5ZHblluOZVWzs18eR1vgniDUnRb9mSzRX7S3OVeofh+IdOcZreLTOjF518vVx0gGDxCnCM47SSaDM2iqZoZDiGiptCyogh7jSLSWnwQ9ydJaLsgdWDQ9mlBq+oWu0l3KpJyEaFy1RjoVkWc66iBN6v5EZPVEVIbMIymxpDSlsJsRokWOM0KgDFv2Zfhf5HkWJer7nrHElanN/sS/I8krT1fUw5fC/SMGJkKctyUjn2g5pcC96X4f/AKRls0+CrWo/2P1KnkTyteZBbTxMfXK3EnHGdMW+1SmOsS7L+1xXo6ZFV5Parhp/jjZlVqVSpJ/32Gfq4K5QxCVmnOi+ji5R17bF+V7XcMI/XMkVKr6Rwq7SuTQxqq5grl2sl1i/wpqN/QqVYWEys0Jh58vkHrpZU+frcz7l3z80Mul73Qtf6eOWlihO6CxZDh0I2ak7PkyaR04XpDvvB1e9DLfWMpLsnqjfZy/gvCSjCVRvSbWVei5nUI3h+iEOIoqYRIYErOH0t2RHEy2IU5PkuSAVKjbA08yGcwVxrgY9J3aLUmVMMHkxBNIj+8a4yYjKS1IyHIsAZjXHGYqYVZXTT6HlvG8EqVSpb3czs/0R6nUPKOPSk60037spJfMx5PCvTLUtQtwMkFTOeJM2aHCX/wAz8H6mczQ4VtU/D+8c8hqUcTPb+y/5tGSqwk/u4R9pJFZVm/76g/xU9SE6N9XUw3+ku1Y7pv8A7eFj+05J/QBXq8vNp6fdo0r/AKBYSilZ1qH+WipEKlSK/vqj9IUlBEKVpRck1ae14ueWOq5JIzJmhmjGak4z0e9Sf1sD4lQs8y92WoaRkzKlPoLDQvJJu1+fQKKMUE7Q0K3DK9O14txfuzh7UWuqaNvgvhurU9qp7EOj99/DkH8J8XUbUZP2XpBvk+nY7JM6MMT1KfD0lGKjHaKSXZFhIFFk1I2FEHRDMK49pqYwyYrhtKUalkuyBtKxSjV0+AyrsNmO5DZyrOrqR80Nhp0WrBdLlCnV0H87cWzXZMVyk6w/ngFtSGcimqwzrCNczDZim6w3nBQsVZHl3GE3XqJb53+Z6NOocBxWeWtUfNvfojLknS54YuJjbT5kYSurEsXJcl8blenI59Jvkdmhwt6VOy/JmW2X+GS0n6pfkxydj2PU4nOMnFqOnPJG9vkRq4icoOebTNa2SOiD0uGqo80n0VkaEOD07Ws7dLtIqceV9q32z4YaFoyzSV43bsixXnmoU5rVwllen8+hdXCqWns3tsm218i7ShGKsopLoloVOOw9ud8QYSUpxnFN5oq9lsyvg4TyunUi8vJveJ1VWzRlYlaiuOuxrbncTScW0/6grmziKSkrPdbPoYs1Z26Gdx9xFmljC1bM7jgfiKLUadV2npFStpLpf1PPcxZoVtjTjy9J3qvXo1CSqHO8B4k6lNX3j7LfW3M1FWOmVTQ8wkqhnqsS84aav5xsxRVYXngT/9k=', 'url': 'https://open.spotify.com/track/7GhIk7Il098yCjg4BQjzvb?si=RWMG19I3SpeeRIaU2e2xLQ'}]

        return self.__run_pipeline()

    def __run_pipeline(self):
        try:
            self.__authenticate()
            self.__select_category_playlist()
            self.__select_playlist_tracks()
            return self.__package_selected_tracks()
        except Exception as e:
            print(e)
            return [{'name': 'Never Gonna Give You Up', 'artist': 'Rick Astley', 'image': 'data:image/jpeg;base64,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', 'url': 'https://open.spotify.com/track/7GhIk7Il098yCjg4BQjzvb?si=RWMG19I3SpeeRIaU2e2xLQ'}]

    # mmmmmmmmmm we love exposing API keys for the world to see
    def __authenticate(self):
        auth_manager = SpotifyClientCredentials(
            client_id="4a1f0d78ee9445bd9c4aeec7db23e97f", client_secret="83d982a8205641a58dccdea791bb3ab9")
        self.spclient = spotipy.Spotify(auth_manager=auth_manager)

    def __select_category_playlist(self) -> str:
        playlists = self.spclient.category_playlists(
            self.category, country='US', limit=50)['playlists']['items']

        # for playlist in playlists:
        #     print(playlist['id'])
        #     print(playlist['name'])
        self.playlist_id = random.sample(playlists, 1)[0]['id']

    def __select_playlist_tracks(self) -> list:
        playlist_tracks = self.spclient.playlist_items(
            self.playlist_id, limit=100)['items']
        # print(self.spclient.playlist_items(self.playlist_id, limit=100))
        selected = [track['track']['id']
                    for track in random.sample(playlist_tracks, self.num_recs)]
        self.playlist_track_ids = selected
        # print(selected)

    def __package_selected_tracks(self) -> dict:
        all_tracks = []
        for track_id in self.playlist_track_ids:
            try:
                track = self.spclient.track(track_id)
                name = track['name']
                artist = track['album']['artists'][0]['name']
                image = track['album']['images'][0]['url']
                url = track['external_urls']['spotify']
                all_tracks.append(
                    {'name': name, 'artist': artist, 'image': image, 'url': url})
            except Exception:
                all_tracks.append(
                    {'name': None, 'artist': None, 'image': None, 'url': None})
        return all_tracks

    def __infer_task_category(self, task: str):
        task_words = [word.lower() for word in task.split(' ')]
        with open('categoryMap.json') as fp:
            category_map = json.load(fp)

        category_tracker = {key: 0 for key in category_map.keys()}

        for category, keywords in category_map.items():
            for word in task_words:
                if word in keywords:
                    category_tracker[category] += 1

        # The (category, keyword matches) pair with the most number of keyword matches. DOES NOT ACCOUNT FOR TIES
        top_pair = sorted(category_tracker.items(),
                          key=lambda x: x[1], reverse=True)[0]

        # Return None if there are no keyword matches
        if top_pair[1] == 0:
            print("No matches :(")
            return None
        else:
            print(f"Returning {top_pair[0]}!")
            return top_pair[0]
