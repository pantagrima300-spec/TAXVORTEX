
from flask import Blueprint, request, jsonify
from services.tax_service import calculate_tax
from utils.validator import validate_income

tax_bp = Blueprint("tax_bp", __name__)

@tax_bp.route("/tax/calculate", methods=["POST"])
def calculate():
    data = request.get_json()

    income = data.get("income")
    regime = data.get("regime", "ops")
    investments = data.get("investments", 0)

    if not validate_income(income):
        return jsonify({
            "error": "Invalid income value"
        }), 400

    tax_payable = calculate_tax(income, regime, investments)

    return jsonify({
        "income": income,
        "regime": regime,
        "investments": investments,
        "tax_payable": tax_payable
    })