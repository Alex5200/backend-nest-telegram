import os
import time
import requests
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv('TELEGRAM_BOT_TOKEN', '')
API_URL = f"https://api.telegram.org/bot{TOKEN}"
SUBSCRIBERS_FILE = 'subscribers.txt'

def add_subscriber(chat_id):
    if os.path.exists(SUBSCRIBERS_FILE):
        with open(SUBSCRIBERS_FILE, 'r') as f:
            if str(chat_id) in [line.strip() for line in f]:
                return False
    with open(SUBSCRIBERS_FILE, 'a') as f:
        f.write(f"{chat_id}\n")
    return True

def send_message(chat_id, text, reply_markup=None):
    data = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML"
    }
    if reply_markup:
        data["reply_markup"] = reply_markup
    requests.post(f"{API_URL}/sendMessage", json=data)

def get_updates(offset=None):
    params = {"timeout": 100}
    if offset:
        params["offset"] = offset
    resp = requests.get(f"{API_URL}/getUpdates", params=params)
    return resp.json()["result"]

def main():
    print("Бот запущен. Ожидание сообщений...")
    last_update_id = None
    while True:
        updates = get_updates(last_update_id)
        for update in updates:
            last_update_id = update["update_id"] + 1
            message = update.get("message") or update.get("callback_query", {}).get("message")
            chat_id = message["chat"]["id"]
            text = update.get("message", {}).get("text", "")
            callback_query = update.get("callback_query")

            if text == "/start":
                keyboard = {
                    "inline_keyboard": [
                        [{"text": "Получить chat_id", "callback_data": "get_chat_id"}],
                        [{"text": "Подписаться на уведомления", "callback_data": "subscribe"}]
                    ]
                }
                send_message(chat_id, "Выберите действие:", reply_markup=keyboard)
            elif callback_query:
                data = callback_query["data"]
                if data == "get_chat_id":
                    send_message(chat_id, f"Ваш chat_id: <code>{chat_id}</code>")
                elif data == "subscribe":
                    if add_subscriber(chat_id):
                        send_message(chat_id, "Вы успешно подписались на уведомления!")
                    else:
                        send_message(chat_id, "Вы уже подписаны на уведомления!")
                # Удаляем кружок загрузки на кнопке
                requests.post(f"{API_URL}/answerCallbackQuery", json={"callback_query_id": callback_query["id"]})
        time.sleep(1)

if __name__ == "__main__":
    main()