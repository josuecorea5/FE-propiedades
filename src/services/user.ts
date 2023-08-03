import { InputsLogin } from "@/components/LoginForm";
import { InputsRegister } from "@/components/RegisterForm";

class UserService {
  static async registerUser(url: string, user: InputsRegister) {

    try {      
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.log(error);
    }
  }

  static async confirmUser(url: string) {
    try {
      const response = await fetch(`${url}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async loginUser(url: string, user: InputsLogin) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async forgotPassword(url: string, email: string) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async confirmResetPasswordToken(url: string) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error)
    }
  }
}

export default UserService;
