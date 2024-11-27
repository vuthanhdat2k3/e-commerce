from flask import Flask, request, jsonify
from transformers import pipeline
import os
import tensorflow as tf

os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

app = Flask(__name__)
sentiment_analysis = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # Tắt các cảnh báo
tf.get_logger().setLevel('ERROR')

@app.route('/analyze-sentiment', methods=['POST'])
def analyze_sentiment():
    # Kiểm tra Content-Type
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 415

    # Lấy dữ liệu từ request
    data = request.get_json()
    if 'review_text' not in data:
        return jsonify({"error": "Missing 'review_text' key"}), 400

    # Phân tích cảm xúc
    review_text = data['review_text']
    result = sentiment_analysis(review_text)
    return jsonify(result[0])

if __name__ == '__main__':
    app.run(debug=True, port=5000)
