from flask import Flask, jsonify
import requests
import random
from flask_cors import CORS
import py_eureka_client.eureka_client as eureka_client

app = Flask(__name__)
CORS(app)

# Konfig: Eureka-Server
eureka_server = "http://localhost:8761/eureka"
app_name = "recommend-service"
port = 5001

# Registrierung bei Eureka
eureka_client.init(
    eureka_server=eureka_server,
    app_name=app_name,
    instance_port=port,
    instance_host="localhost",
    health_check_url=f"http://localhost:{port}/",
    status_page_url=f"http://localhost:{port}/"
)

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Recommendation-Service läuft auf Port 5001"})

@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    try:
        response = requests.get("http://localhost:8080/shop/products")  # via API Gateway
        response.raise_for_status()
        products = response.json()
        recommended_products = random.sample(products, 3)
        return jsonify(recommended_products)
    except Exception as e:
        app.logger.error(f"Fehler: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=port)
