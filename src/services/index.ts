const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  auth: {
    login: `${API}/api/${VERSION}/login`,
    register: `${API}/api/${VERSION}/register`,
    confirm: (token: string) => `${API}/api/${VERSION}/confirm/${token}`,
    forgotPassword: `${API}/api/${VERSION}/forgot-password`,
    confirmPassworsToken: (token: string) => `${API}/api/${VERSION}/reset-password/${token}`,
    resetPassword: (token: string) => `${API}/api/${VERSION}/reset-password/${token}`
  },
  categories: {
    getAll: `${API}/api/${VERSION}/categories`,
    getPropertiesByCategory: (id: string) => `${API}/api/${VERSION}/categories/${id}/properties`,
  },
  prices: {
    getAll: `${API}/api/${VERSION}/prices`,
  },
  properties: {
    getAll: `${API}/api/${VERSION}/properties`,
    create: `${API}/api/${VERSION}/properties`,
    getOne: (id: string) => `${API}/api/${VERSION}/properties/${id}`,
    getOnePublished: (id: string) => `${API}/api/${VERSION}/properties/published/${id}`,
    update: (id: string) => `${API}/api/${VERSION}/properties/${id}`,
    delete: (id: string) => `${API}/api/${VERSION}/properties/${id}`,
    getPropertiesNews: `${API}/api/${VERSION}/properties/news`,
    getTopThreePropertiesByCategory: `${API}/api/${VERSION}/properties/latest`,
    searchProperties: (title: string) => `${API}/api/${VERSION}/properties/search?title=${title}`,
    sendMessageToSeller: (id: string) => `${API}/api/${VERSION}/properties/${id}/messages`,
    getMessagesOfProperty: (id: string) => `${API}/api/${VERSION}/properties/${id}/messages`,
    updatePropertyPublished: (id: string) => `${API}/api/${VERSION}/properties/${id}/publish`,
  }
}

export default endPoints;