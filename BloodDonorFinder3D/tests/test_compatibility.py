"""Unit tests for blood compatibility engine."""

import unittest
from utils.compatibility import (
    is_compatible,
    get_compatible_donors_for_recipient,
    get_compatible_recipients_for_donor,
    normalize_blood_group,
    VALID_BLOOD_GROUPS
)


class TestBloodCompatibility(unittest.TestCase):
    """Test suite verifying medical RBC compatibility rules."""

    def test_universal_donor_o_negative(self):
        """O- should be able to donate red blood cells to all 8 blood groups."""
        for bg in VALID_BLOOD_GROUPS:
            self.assertTrue(
                is_compatible('O-', bg),
                f"O- should safely donate to {bg}"
            )
        self.assertEqual(len(get_compatible_recipients_for_donor('O-')), 8)

    def test_universal_recipient_ab_positive(self):
        """AB+ should be able to receive red blood cells from all 8 blood groups."""
        for bg in VALID_BLOOD_GROUPS:
            self.assertTrue(
                is_compatible(bg, 'AB+'),
                f"AB+ should safely receive from {bg}"
            )
        self.assertEqual(len(get_compatible_donors_for_recipient('AB+')), 8)

    def test_o_negative_recipient(self):
        """O- recipient can ONLY receive from O-."""
        self.assertTrue(is_compatible('O-', 'O-'))
        for bg in ['O+', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']:
            self.assertFalse(
                is_compatible(bg, 'O-'),
                f"{bg} must NOT donate to O- recipient"
            )
        self.assertEqual(get_compatible_donors_for_recipient('O-'), ['O-'])

    def test_a_positive_compatibilities(self):
        """A+ recipient can receive from O-, O+, A-, A+."""
        allowed = {'O-', 'O+', 'A-', 'A+'}
        actual = set(get_compatible_donors_for_recipient('A+'))
        self.assertEqual(actual, allowed)

    def test_b_negative_compatibilities(self):
        """B- recipient can receive from O-, B-."""
        allowed = {'O-', 'B-'}
        actual = set(get_compatible_donors_for_recipient('B-'))
        self.assertEqual(actual, allowed)

    def test_invalid_blood_group_raises_error(self):
        """Invalid blood groups should raise ValueError."""
        with self.assertRaises(ValueError):
            normalize_blood_group('C+')

        with self.assertRaises(ValueError):
            is_compatible('XYZ', 'A+')


if __name__ == '__main__':
    unittest.main()
