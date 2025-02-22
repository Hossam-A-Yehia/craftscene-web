import React from "react";
import Image from "next/image";
import Logo from "@/assets/images/logo.svg";
import "./authPage.css";
import { t } from "i18next";

interface AuthPageProps {
  title?: string;
  FormComponent: React.FC;
}

const AuthPage: React.FC<AuthPageProps> = ({ FormComponent }) => (
  <div className="auth-page">
    <div className="auth-info relative">
      <div className="auth-overlay"></div>
      <div className="auth-content">
        <Image src={Logo} alt="Logo" height={500} width={200} />
        <p className="auth-description">{t("auth.title")}</p>
      </div>
    </div>
    <div className="form-container">
      <FormComponent />
    </div>
  </div>
);

export default AuthPage;
