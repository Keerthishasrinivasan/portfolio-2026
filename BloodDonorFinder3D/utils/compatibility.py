"""
Blood Group Compatibility Utility
----------------------------------
Standard Red Blood Cell (RBC) compatibility logic for transfusion matching.

DISCLAIMER:
This module is intended solely for educational, algorithmic matching and initial
donor-triage purposes. Actual medical transfusions require cross-matching and
laboratory screening verified by certified healthcare professionals.
"""

VALID_BLOOD_GROUPS = ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')

# Mapping: Which donor blood groups are compatible for each recipient blood group
RECIPIENT_CAN_RECEIVE_FROM = {
    'O-': ['O-'],
    'O+': ['O-', 'O+'],
    'A-': ['O-', 'A-'],
    'A+': ['O-', 'O+', 'A-', 'A+'],
    'B-': ['O-', 'B-'],
    'B+': ['O-', 'O+', 'B-', 'B+'],
    'AB-': ['O-', 'A-', 'B-', 'AB-'],
    'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']
}

# Mapping: Which recipient blood groups can receive from each donor blood group
DONOR_CAN_DONATE_TO = {
    'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],  # Universal donor
    'O+': ['O+', 'A+', 'B+', 'AB+'],
    'A-': ['A-', 'A+', 'AB-', 'AB+'],
    'A+': ['A+', 'AB+'],
    'B-': ['B-', 'B+', 'AB-', 'AB+'],
    'B+': ['B+', 'AB+'],
    'AB-': ['AB-', 'AB+'],
    'AB+': ['AB+']  # Universal recipient for RBC
}

MEDICAL_DISCLAIMER = (
    "Compatibility calculations represent standard red blood cell (ABO/Rh) compatibility guidelines. "
    "Actual clinical transfusions must undergo full cross-matching, antibody screening, and laboratory "
    "verification by certified medical professionals."
)


def normalize_blood_group(blood_group: str) -> str:
    """Normalize and validate a blood group string."""
    if not blood_group:
        raise ValueError("Blood group cannot be empty.")
    normalized = blood_group.strip().upper()
    if normalized not in VALID_BLOOD_GROUPS:
        raise ValueError(f"Invalid blood group '{blood_group}'. Valid options are: {', '.join(VALID_BLOOD_GROUPS)}")
    return normalized


def is_compatible(donor_group: str, recipient_group: str) -> bool:
    """
    Check if a donor blood group can donate to a recipient blood group.
    """
    donor = normalize_blood_group(donor_group)
    recipient = normalize_blood_group(recipient_group)
    return donor in RECIPIENT_CAN_RECEIVE_FROM.get(recipient, [])


def get_compatible_donors_for_recipient(recipient_group: str) -> list:
    """
    Get all donor blood groups that can safely donate to the specified recipient.
    """
    recipient = normalize_blood_group(recipient_group)
    return list(RECIPIENT_CAN_RECEIVE_FROM.get(recipient, []))


def get_compatible_recipients_for_donor(donor_group: str) -> list:
    """
    Get all recipient blood groups that the specified donor can safely donate to.
    """
    donor = normalize_blood_group(donor_group)
    return list(DONOR_CAN_DONATE_TO.get(donor, []))
