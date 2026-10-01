/**
 * Blood Donor Finder - Main Client Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Notification Dropdown Toggle & Polling
  const notifBtn = document.getElementById('notifBellBtn');
  const notifDropdown = document.getElementById('notifDropdown');

  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!notifDropdown.contains(e.target) && e.target !== notifBtn) {
        notifDropdown.classList.remove('show');
      }
    });
  }

  // 2. Mark Notification as Read
  window.markNotificationRead = function(notifId, el) {
    fetch(`/api/notifications/${notifId}/mark-read`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        if (el) {
          el.classList.remove('unread');
        }
        const badge = document.querySelector('.notif-badge');
        if (badge) {
          let count = parseInt(badge.textContent.trim()) || 0;
          if (count > 1) {
            badge.textContent = count - 1;
          } else {
            badge.remove();
          }
        }
      }
    })
    .catch(err => console.error('Error marking notification read:', err));
  };

  // 3. Interactive Blood Compatibility Explorer (on Homepage)
  const compatSelect = document.getElementById('compatRecipientSelect');
  const compatResults = document.getElementById('compatDonorResults');

  if (compatSelect && compatResults) {
    const COMPAT_MAP = {
      'O-': ['O-'],
      'O+': ['O-', 'O+'],
      'A-': ['O-', 'A-'],
      'A+': ['O-', 'O+', 'A-', 'A+'],
      'B-': ['O-', 'B-'],
      'B+': ['O-', 'O+', 'B-', 'B+'],
      'AB-': ['O-', 'A-', 'B-', 'AB-'],
      'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']
    };

    function updateCompatibility() {
      const recipient = compatSelect.value;
      const compatibleDonors = COMPAT_MAP[recipient] || [];
      const allGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

      compatResults.innerHTML = allGroups.map(bg => {
        const isMatch = compatibleDonors.includes(bg);
        const matchClass = isMatch ? 'bg-match' : 'bg-no-match';
        const icon = isMatch ? '✓' : '✗';
        return `
          <div class="compat-chip ${matchClass}">
            <span class="compat-bg-label">${bg}</span>
            <span class="compat-status">${icon}</span>
          </div>
        `;
      }).join('');
    }

    compatSelect.addEventListener('change', updateCompatibility);
    updateCompatibility();
  }

  // 4. Auto-dismiss Flash Alerts
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => {
    setTimeout(() => {
      alert.style.transition = 'opacity 0.5s ease';
      alert.style.opacity = '0';
      setTimeout(() => alert.remove(), 500);
    }, 5000);
  });
});
