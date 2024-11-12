import axios from "axios";
import React, { useState } from "react";
import AuthLayout from "../../components/authLayout/AuthLayout";

import "./signIn.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string | null | undefined>("");
  const [password, setPassword] = useState<string | null | undefined>("");

  async function submitForm(event: React.FormEvent): Promise<void> {
    try {
      event.preventDefault();

      const res = await axios.post(
        "https://test1.focal-x.com/api/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "profile_image_url",
        res.data.user.profile_image_url
      );

      localStorage.setItem(
        "user_name",
        `${res.data.user.first_name} ${res.data.user.last_name}`
      );

      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        alert(`Something went wrong: ${err.message}`);
      } else {
        alert(`Something went wrong`);
      }

      console.log(err);
    }
  }

  return (
    <div className="sign-in">
      <AuthLayout
        headerData={{
          title: "SIGN IN",
          text: "Enter your credentials to access your account.",
        }}
        formInfo={{
          submitFunction: submitForm,
          items: [
            {
              label: "Email",
              inputs: [
                {
                  type: "email",
                  placeholder: "Enter your email",
                  setFunc: setEmail,
                },
              ],
            },
            {
              label: "Password",
              inputs: [
                {
                  type: "password",
                  placeholder: "Enter password",
                  setFunc: setPassword,
                },
              ],
            },
          ],
        }}
        footerProps={{
          submitButtonText: "SIGN IN",
          message: "Don’t have an account?",
          linkText: "Create one",
          linkTo: "/sign-up",
        }}
      />
    </div>
  );
};

export default SignIn;
