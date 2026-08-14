const PROFILE_KEY = 'kisanmitra_farmer_profile';

export function saveProfile(profile) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }
}

export function loadProfile() {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  }
  return null;
}

export function clearProfile() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(PROFILE_KEY);
  }
}
