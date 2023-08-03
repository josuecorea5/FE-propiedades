import { InputsLogin } from "@/components/LoginForm";
import { InputsRegister } from "@/components/RegisterForm";
import { InputResetPassword } from "@/components/ResetPasswordForm";

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

  static async resetPassword(url: string, password: InputResetPassword) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(password)
      })
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error)
    }
  }
}

export default UserService;
