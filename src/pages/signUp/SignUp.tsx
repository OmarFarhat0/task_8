import axios from "axios";
import React, { useState } from "react";
import AuthLayout from "../../components/authLayout/AuthLayout";

import "./signUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  type nullOrUndefined = null | undefined;

  const [firstName, setFirstName] = useState<string | nullOrUndefined>("");
  const [lastName, setLastName] = useState<string | nullOrUndefined>("");
  const [email, setEmail] = useState<string | nullOrUndefined>("");
  const [password, setPassword] = useState<string | nullOrUndefined>("");
  const [rePassword, setRePassword] = useState<string | nullOrUndefined>("");
  const [image, setImage] = useState<File | nullOrUndefined>(null);

  async function submitForm(event: React.FormEvent): Promise<void> {
    try {
      event.preventDefault();

      const data = {
        first_name: firstName,
        last_name: lastName,
        user_name: `${firstName}_${lastName}`,
        email,
        password,
        password_confirmation: rePassword,
        profile_image: image,
      };

      const res = await axios.post(
        "https://test1.focal-x.com/api/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem("token", res.data.data.token);

      localStorage.setItem(
        "profile_image_url",
        res.data.data.user.profile_image_url
      );

      localStorage.setItem(
        "user_name",
        `${res.data.data.user.first_name} ${res.data.data.user.last_name}`
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
    <div className="sign-up">
      <AuthLayout
        headerData={{
          title: "SIGN UP",
          text: "Fill in the following fields to create an account.",
        }}
        formInfo={{
          submitFunction: submitForm,
          items: [
            {
              label: "Name",
              inputs: [
                {
                  type: "text",
                  placeholder: "First Name",
                  setFunc: setFirstName,
                },
                {
                  type: "text",
                  placeholder: "Last Name",
                  setFunc: setLastName,
                },
              ],
            },
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
                {
                  type: "password",
                  placeholder: "Re-enter your password",
                  setFunc: setRePassword,
                },
              ],
            },
            {
              label: "Profile Image",
              inputs: [
                {
                  type: "file-image",
                  setFunc: setImage,
                },
              ],
            },
          ],
        }}
        footerProps={{
          submitButtonText: "SIGN UP",
          message: "Do you have an account?",
          linkText: "Sign in",
          linkTo: "/sign-in",
        }}
      />
    </div>
  );
};

export default SignUp;
