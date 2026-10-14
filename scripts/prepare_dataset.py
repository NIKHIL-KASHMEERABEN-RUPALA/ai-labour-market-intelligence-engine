#!/usr/bin/env python3
"""
LMIS Telemetry Dataset Preprocessor
Converts raw labour vacancy feeds into Hugging Face instruction tuning format.
"""

import json

SAMPLE_RECORDS = [
    {
        "instruction": "Evaluate the labour demand and capacity deficit for the Automotive sector in Maharashtra.",
        "input": "State: Maharashtra, Sector: Automotive & EV, Registered Demand: 680,000, Training Capacity: 420,000, Annual Growth: +14.2%",
        "output": "Predicted deficit is 260,000 seats. Immediate priority: Scale ITI mechatronics cohorts in Pune-Chakan-Talegaon corridor by 22% and activate dual-apprenticeship mandates with Tier-1 OEM suppliers."
    },
    {
        "instruction": "Formulate policy intervention recommendations for the Electronics manufacturing corridor in Tamil Nadu.",
        "input": "State: Tamil Nadu, Sector: Semiconductor & Electronics, Demand: 540,000, Capacity: 280,000, Growth: +24.8%",
        "output": "Predicted deficit is 260,000 seats. Recommended action: Establish 3 Regional Centers of Excellence (CoE) in Sriperumbudur and Hosur under MSDE SANKALP scheme."
    }
]

def generate_dataset(output_file: str = "lmis_training_dataset.json"):
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(SAMPLE_RECORDS, f, indent=2)
    print(f"Generated {len(SAMPLE_RECORDS)} training examples in {output_file}")

if __name__ == "__main__":
    generate_dataset()
