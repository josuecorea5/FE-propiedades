class CategoryService {
  static async getCategories(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}