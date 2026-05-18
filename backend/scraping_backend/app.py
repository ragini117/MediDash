from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def fetch_news(limit=10, offset=0):
    conn = sqlite3.connect("health_news.db")
    cursor = conn.cursor()
    cursor.execute(
        "SELECT date, title, description, news_url FROM news ORDER BY date DESC LIMIT ? OFFSET ?",
        (limit, offset)
    )
    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "date": row[0],
            "title": row[1],
            "description": row[2],
            "news_url": row[3],
        }
        for row in rows
    ]

# ✅ API endpoint React will call
@app.route("/api/news", methods=["GET"])
def get_news():
    page = request.args.get("page", 1, type=int)
    limit = 10
    offset = (page - 1) * limit

    news = fetch_news(limit, offset)
    return jsonify(news)

# ✅ Health check
@app.route("/", methods=["GET"])
def home():
    return "Health News API running!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5006, debug=True)
