import Cookie from 'js-cookie';

class PropertyService {

  static async getProperties(url: string) {
    const token = Cookie.get('token');
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  }

  static async getProperty(url: string) {
    const token = Cookie.get('token');
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
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

  static async getThreeLatestProperties(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  static async searchProperties(url: string) {
    const response = await fetch(url);
    return response;
  }

  static async sendMessageToSeller(url: string, message: string) {
    const token = Cookie.get('token');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    })
    const data = await response.json();
    return data;
  }

  static async getMessagesOfProperty(url: string) {
    const token = Cookie.get('token');
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json();
    return data;
  }

  static async createProperty(url: string, property: FormData) {
    try {
      const token = Cookie.get('token');
      const response = await fetch(url, {
        method: 'POST',
        body: property,
        headers: {
          'Authorization': `Bearer ${token}`
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
      const token = Cookie.get('token');
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: property
      })
      return response;
    } catch (error) {
      console.log(error)
    }
  }

  static async updatePropertyPublished(url: string) {
    try {
      const token = Cookie.get('token');
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error)
    }
  }

  static async deleteProperty(url: string) {
    try {
      const token = Cookie.get('token');
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      return response;
    } catch (error) {
      console.log(error)
    }
  }
}

export default PropertyService;
