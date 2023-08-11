class PricesService {
  static async getPrices(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}

export default PricesService;