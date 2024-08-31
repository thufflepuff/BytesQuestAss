from django.shortcuts import render
import requests
from django.shortcuts import redirect, render
from django.conf import settings

# Insta views here.
def instagram_login(request):
    instagram_auth_url = (
        f"https://api.instagram.com/oauth/authorize?client_id={settings.INSTAGRAM_CLIENT_ID}"
        f"&redirect_uri={settings.INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code"
    )
    return redirect(instagram_auth_url)

def instagram_callback(request):
    code = request.GET.get("code")
    access_token_url = "https://api.instagram.com/oauth/access_token"
    response = requests.post(
        access_token_url,
        data={
            "client_id": settings.INSTAGRAM_CLIENT_ID,
            "client_secret": settings.INSTAGRAM_CLIENT_SECRET,
            "grant_type": "authorization_code",
            "redirect_uri": settings.INSTAGRAM_REDIRECT_URI,
            "code": code,
        },
    )
    insta_token = response.json().get("access_token")
    insta_id = response.json().get("user_id")

    # Store access_token and user_id in the database or session
    # ...

    return redirect("instagram_profile")

def instagram_profile(request):
    access_token = request.session.get("access_token")
    user_id = request.session.get("user_id")
    if not access_token or not user_id:
        return redirect("instagram_login")

    profile_url = f"https://graph.instagram.com/{user_id}?fields=id,username&access_token={access_token}"
    media_url = f"https://graph.instagram.com/{user_id}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token={access_token}"

    profile_response = requests.get(profile_url)
    media_response = requests.get(media_url)

    profile_data = profile_response.json()
    media_data = media_response.json()

    return render(request, "instagram/profile.html", {"profile_data": profile_data, "media_data": media_data})
