const API_URL = 'http://127.0.0.1:8000';

export async function registerUser(email: string, name: string, password: string) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name, password })
  });
  if (!response.ok) {
    throw new Error((await response.json()).detail || 'Registration failed');
  }
  return response.json();
}

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ username: email, password })
  });
  if (!response.ok) {
    throw new Error((await response.json()).detail || 'Login failed');
  }
  return response.json(); // { access_token, token_type }
}

export async function getProducts(token?: string) {
  const authToken = token || localStorage.getItem('token');
  const response = await fetch(`${API_URL}/products`, {
    headers: authToken ? { 'Authorization': `Bearer ${authToken}` } : {}
  });
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export async function getProfile(token?: string) {
  const authToken = token || localStorage.getItem('token');
  const response = await fetch(`${API_URL}/me`, {
    headers: { 'Authorization': `Bearer ${authToken}` }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
  return response.json();
}

export async function submitOrder(order: any, token?: string) {
  const authToken = token || localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}) },
    body: JSON.stringify(order)
  });
  if (!response.ok) {
    throw new Error('Failed to place order');
  }
  return response.json();
} 