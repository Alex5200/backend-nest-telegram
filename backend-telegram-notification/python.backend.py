import os
import time
import requests
from dotenv import load_dotenv

load_dotenv()

API_URL = os.getenv('API_URL', 'http://localhost:3000/users')
TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN', '')
SUBSCRIBERS_FILE = 'subscribers.txt'

def get_subscribers():
    if not os.path.exists(SUBSCRIBERS_FILE):
        return []
    with open(SUBSCRIBERS_FILE, 'r') as f:
        return [line.strip() for line in f if line.strip()]

def send_message(chat_id, message: str):
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    data = {
        "chat_id": chat_id,
        "text": message,
        "parse_mode": "HTML"
    }
    requests.post(url, data=data)

def send_photo(chat_id, photo_path, caption: str):
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendPhoto"
    with open(photo_path, 'rb') as photo:
        data = {
            "chat_id": chat_id,
            "caption": caption,
            "parse_mode": "HTML"
        }
        files = {"photo": photo}
        requests.post(url, data=data, files=files)

def get_last_id():
    try:
        with open('last_id.txt', 'r') as f:
            return int(f.read().strip())
    except Exception:
        return 0

def set_last_id(last_id):
    with open('last_id.txt', 'w') as f:
        f.write(str(last_id))

def fetch_users():
    response = requests.get(API_URL)
    if response.status_code == 200:
        return response.json()
    else:
        print("Ошибка получения пользователей:", response.text)
        return []

def main():
    print("Слежение за новыми заявками через GET /users запущено...")
    while True:
        users = fetch_users()
        last_id = get_last_id()
        new_users = [u for u in users if u['id'] > last_id]
        if new_users:
            subscribers = get_subscribers()
            for user in sorted(new_users, key=lambda x: x['id']):
                msg = (
                    f"Новая заявка #{user.get('id')}!\n"
                    f"Имя: {user.get('username')}\n"
                    f"Телефон: {user.get('phone')}\n"
                    f"Почта: {user.get('mail')}\n"
                    f"Описание: {user.get('description')}"
                )
                photo_path = user.get('photo')
                for chat_id in subscribers:
                    if photo_path and os.path.exists(photo_path):
                        send_photo(chat_id, photo_path, msg)
                    else:
                        send_message(chat_id, msg)
                set_last_id(user['id'])
        time.sleep(5)  # Проверять каждые 5 секунд

if __name__ == "__main__":
    main()