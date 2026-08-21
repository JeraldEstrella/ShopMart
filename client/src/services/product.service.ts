class ProductService {
  // Get products with filters, pagination, sorting
  async getAll() {
    const response = await fetch('http://localhost:8080/api/product/all', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Cannot fetch all product');
    }

    const data = await response.json();

    return data;
  }

  async getProduct(id: string) {
    if (!id) throw new Error('Product ID is undefined');

    const response = await fetch('http://localhost:8080/api/product/:id', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Cannot get the product');
    }

    const data = await response.json();

    return data;
  }
}

export default new ProductService();
