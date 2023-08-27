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
  },
  prices: {
    getAll: `${API}/api/${VERSION}/prices`,
  },
  properties: {
    getAll: `${API}/api/${VERSION}/properties`,
    create: `${API}/api/${VERSION}/properties`,
    getOne: (id: string) => `${API}/api/${VERSION}/properties/${id}`,
  }
}

export default endPoints;