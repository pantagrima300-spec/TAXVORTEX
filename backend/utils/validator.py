def validate_income(income):
    try:
        income = float(income)
        return income >= 0
    except (TypeError, ValueError):
        return False