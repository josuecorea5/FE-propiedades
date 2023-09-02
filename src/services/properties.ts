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

  static async getPropertyPublished(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  static async getPropertiesNews(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
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

  static async updateProperty(url: string, property: FormData) {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.token}`
        },
        body: property
      })
      return response;
    } catch (error) {
      console.log(error)
    }
  }

  static async deleteProperty(url: string) {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
      return response;
    } catch (error) {
      console.log(error)
    }
  }
}

export default PropertyService;
