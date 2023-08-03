const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  auth: {
    login: `${API}/api/${VERSION}/login`,
    register: `${API}/api/${VERSION}/register`,
    confirm: (token: string) => `${API}/api/${VERSION}/confirm/${token}`,
    forgotPassword: `${API}/api/${VERSION}/forgot-password`,
  }
}

export default endPoints;