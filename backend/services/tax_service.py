def calculate_tax(income, regime, investments):
    slabs = {
        "ops": [
            (300000, 0),
            (600000, 0.05),
            (900000, 0.10),
            (1200000, 0.15),
            (1500000, 0.20),
            (float("inf"), 0.30)
        ],
        "nps": [
            (300000, 0),
            (600000, 0.05),
            (900000, 0.10),
            (1200000, 0.15),
            (1500000, 0.20),
            (float("inf"), 0.30)
        ]
    }

    # Deduction limit (80C)
    deductions = min(investments, 150000)
    taxable_income = max(income - deductions, 0)

    tax = 0
    previous_limit = 0

    for limit, rate in slabs.get(regime, slabs["ops"]):
        if taxable_income <= previous_limit:
            break

        taxable_amount = min(
            taxable_income - previous_limit,
            limit - previous_limit
        )

        tax += taxable_amount * rate
        previous_limit = limit

    return round(tax, 2)