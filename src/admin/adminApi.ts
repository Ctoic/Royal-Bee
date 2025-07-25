const API_URL = "http://localhost:8000";

export async function adminLogin(username: string, password: string) {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!response.ok) throw new Error('Invalid credentials');
  return response.json();
}

// Example stubs for metrics (replace with real API calls)
export async function fetchAdminMetrics(token: string) {
  const response = await fetch(`${API_URL}/admin/metrics`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch metrics');
  return response.json();
}

export async function fetchAdminUsers(token: string) {
  const response = await fetch(`${API_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
}

export async function fetchAdminOrders(token: string) {
  const response = await fetch(`${API_URL}/admin/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch orders');
  return response.json();
}

export async function fetchAdminProducts(token: string) {
  const response = await fetch(`${API_URL}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
}

export async function addAdminProduct(token: string, product: any) {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error('Failed to add product');
  return response.json();
} 