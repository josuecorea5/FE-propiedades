import Cookie from 'js-cookie';

class PropertyService {

  private static token = Cookie.get('token');

  static async getProperties(url: string) {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
    return response;
  }

  static async getProperty(url: string) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    })
    return response;
  }

  static async createProperty(url: string, property: FormData) {
    console.log('FORMDATA', property.values())
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: property,
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
      const data = await response.json();
      return data; 
    } catch (error) {
      console.log(error); 
    }
  }
}

export default PropertyService;
