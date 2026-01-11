
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy # pyright: ignore[reportMissingImports]
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///taxcortex.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class TaxRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    income = db.Column(db.Float, nullable=False)
    regime = db.Column(db.String(10), nullable=False)
    tax = db.Column(db.Float, nullable=False)

def calculate_tax(income: float):
    # Temporary logic (replace later)
    old_tax = income * 0.10
    new_tax = income * 0.08

    best_regime = "new" if new_tax < old_tax else "old"
    return old_tax, new_tax, best_regime



@app.route("/")
def home():
    return jsonify({"message": "TaxCortex Backend Running 🚀"})

@app.route("/calculate-tax", methods=["POST"])
def calculate():
    data = request.json
    income = data.get("income")

    old_tax, new_tax, best = calculate_tax(income)

    record = TaxRecord(
        income=income,
        regime=best,
        tax=min(old_tax, new_tax)
    )
    db.session.add(record)
    db.session.commit()

    return jsonify({
        "income": income,
        "old_regime_tax": old_tax,
        "new_regime_tax": new_tax,
        "best_regime": best
    })

# -------------------- RUN --------------------
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
