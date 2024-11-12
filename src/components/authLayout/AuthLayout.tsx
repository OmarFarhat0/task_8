import React, { useRef } from "react";
import "./authLayout.css";
import { Link } from "react-router-dom";

const AuthLayout = ({
  headerData,
  formInfo,
  footerProps,
}: {
  headerData: {
    title: string;
    text: string;
  };
  formInfo: {
    submitFunction: (event: React.FormEvent) => void;
    items: {
      label: string;
      inputs: Array<
        | {
            type: string;
            placeholder: string;
            setFunc: (value: string | null | undefined) => void;
          }
        | {
            type: "file-image";
            setFunc: (value: File | null | undefined) => void;
          }
      >;
    }[];
  };
  footerProps?: {
    submitButtonText?: string;
    message?: string;
    linkText?: string;
    linkTo?: string;
  };
}) => {
  const profileImageLabel = useRef<HTMLLabelElement>(null);

  function renderNormalInput(
    input: {
      type: string;
      placeholder: string;
      setFunc: (value: string | null | undefined) => void;
    },
    indexInput: number
  ): JSX.Element {
    return (
      <input
        key={indexInput}
        type={input.type}
        placeholder={input.placeholder}
        onChange={(event) => input.setFunc(event.target.value)}
      />
    );
  }

  function renderImageInput(
    input: {
      type: "file-image";
      setFunc: (value: File | null | undefined) => void;
    },
    indexInput: number
  ): JSX.Element {
    return (
      <div key={indexInput}>
        <input
          type="file"
          id="profile-image-input"
          className="profile-image-input"
          onChange={(event) => {
            const element = event.target;
            if (element.files && profileImageLabel.current) {
              const linkImage = URL.createObjectURL(element.files[0]);
              profileImageLabel.current.style.backgroundImage = `url(${linkImage})`;
              input.setFunc(element.files[0]);
            }
          }}
        />
        <label
          htmlFor="profile-image-input"
          className="profile-image"
          ref={profileImageLabel}
        ></label>
      </div>
    );
  }

  return (
    <div className="auth-layout">
      <div className="auth-content">
        <div className="head">
          <img src="images/common/Logo.png" className="logo" alt="Logo" />
          <h2>{headerData.title}</h2>
          <p>{headerData.text}</p>
        </div>

        <form onSubmit={(event) => formInfo.submitFunction(event)}>
          {formInfo.items.map((item, indexItem) => (
            <div key={indexItem}>
              <label>{item.label}</label>
              <div className="inputs">
                {item.inputs.map((input, indexInput) => {
                  if (input.type === "file-image") {
                    return renderImageInput(
                      input as {
                        type: "file-image";
                        setFunc: (value: File | null | undefined) => void;
                      },
                      indexInput
                    );
                  } else {
                    return renderNormalInput(
                      input as {
                        type: string;
                        placeholder: string;
                        setFunc: (value: string | null | undefined) => void;
                      },
                      indexInput
                    );
                  }
                })}
              </div>
            </div>
          ))}
          <input
            type="submit"
            value={footerProps?.submitButtonText || "submit"}
          />
        </form>
        {footerProps && (
          <p className="message">
            {footerProps.message}{" "}
            {footerProps.linkTo && footerProps.linkText && (
              <span>
                <Link to={footerProps.linkTo}>{footerProps.linkText}</Link>
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
