FRIENDLY AI TECH V6 — CLOUD READY

LOCAL:
1. python -m venv venv
2. venv\Scripts\activate
3. pip install -r requirements.txt
4. python app.py
5. Open http://127.0.0.1:5000

LOCAL STORAGE:
Without DATABASE_URL, data is stored in the local SQLite database instance/friendly_ai.db.

CLOUD STORAGE:
Set environment variable DATABASE_URL to your cloud PostgreSQL connection string.
Then the same code automatically saves enquiries to PostgreSQL.

ADMIN:
http://127.0.0.1:5000/admin
IMPORTANT: The current admin page is intentionally simple and has NO LOGIN yet.
Do not expose /admin publicly until authentication is added.

DEPLOY:
Push this folder to GitHub, choose a Python hosting provider, set:
DATABASE_URL = cloud PostgreSQL connection string
SECRET_KEY = a long random secret
Start command = gunicorn app:app
