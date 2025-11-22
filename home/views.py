from django.shortcuts import render
import os

def homepage_view(request):
    print("MY KEY INSIDE DJANGO:", os.environ.get("WEATHER_API_KEY"))
    Api_key = os.environ.get("WEATHER_API_KEY", "")
    return render(request, "homepage.html", {"Api_key": Api_key})