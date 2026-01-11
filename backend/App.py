from flask import Flask, request, jsonify
from services.tax_service import calculate_tax

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        data = request.get_json() or {}
        try:
            income = float(data.get("income", 0))
            regime = data.get("regime", "ops")
            investments = float(data.get("investments", 0))
        except (TypeError, ValueError):
            return jsonify({"error": "Invalid input"}), 400

        tax = calculate_tax(income, regime, investments)
        return jsonify({"tax_payable": tax}), 200

    return jsonify({"message": "TaxCortex Backend Running"}), 200
if __name__ == "__main__":
    app.run(debug=True)
