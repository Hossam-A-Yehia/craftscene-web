"use client";
import CustomImage from "@/components/atoms/Image/CustomImage";
import React from "react";
import { BiMailSend, BiPhone } from "react-icons/bi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import LOGO from "@/assets/images/logo-footer.svg";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { t } from "i18next";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

const Footer: React.FC = () => {
  const { userData } = useUser();
  const router = useRouter();

  const handleRFQLink = () => {
    if (userData) {
      router.push("/add-rfq");
    } else {
      toast.error("home.header.access_rfq_massage");
    }
  };
  const handleAskQLink = () => {
    if (userData) {
      router.push("/add-ask");
    } else {
      toast.error("home.header.access_rfq_massage");
    }
  };

  return (
    <footer
      data-testid="footer-container"
      className="bg-[url('/home/footer.png')] text-white py-10"
    >
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="mt-6">
          <CustomImage src={LOGO} alt="Logo" width={400} height={400} />
          <span className="text-slate-300 block my-6">
            {t("home.footer.follow_us")}
          </span>
          <ul className="flex items-center gap-3" data-testid="social-links">
            <li data-testid="social-facebook">
              <Link
                target="_blank"
                href="https://www.facebook.com/profile.php?id=61561067483505"
                className="bg-white flex items-center text-main rounded-full size-10 justify-center"
              >
                <FaFacebookF className="text-xl" />
              </Link>
            </li>
            <li data-testid="social-twitter">
              <Link
                target="_blank"
                href="https://x.com/craft_scene?s=11"
                className="bg-white flex items-center text-main rounded-full size-10 justify-center"
              >
                <FaXTwitter className="text-xl" />
              </Link>
            </li>
            <li data-testid="social-linkedin">
              <Link
                target="_blank"
                href="https://www.linkedin.com/company/craftscene-app/"
                className="bg-white flex items-center text-main rounded-full size-10 justify-center"
              >
                <FaLinkedinIn className="text-xl" />
              </Link>
            </li>
            <li data-testid="social-instagram">
              <Link
                href="https://www.instagram.com/craft.scene/"
                target="_blank"
                className="bg-white flex items-center text-main rounded-full size-10 justify-center"
              >
                <FaInstagram className="text-xl" />
              </Link>
            </li>
          </ul>
        </div>
        <div data-testid="company-section">
          <h3 className="text-md font-semibold mb-8">
            {t("home.footer.company")}
          </h3>
          <ul>
            <li className="hover:underline text-slate-300 mb-6">
              {t("home.footer.about_us")}
            </li>
            <li className="hover:underline text-slate-300 mb-6">
              {t("home.footer.awards_certifications")}
            </li>
            <li className="hover:underline text-slate-300 mb-6">
              {t("home.footer.privacy_policy")}
            </li>
            <li className="hover:underline text-slate-300">
              {t("home.footer.terms_condition")}
            </li>
          </ul>
        </div>
        <div data-testid="services-section">
          <h3 className="text-md font-semibold mb-8">
            {t("home.footer.services")}
          </h3>
          <ul>
            <li className="hover:underline text-slate-300 mb-6">
              <Link href="#">{t("home.footer.find_professionals")}</Link>
            </li>
            <li className="hover:underline text-slate-300 mb-6">
              <Link href="#">{t("home.footer.shop_products")}</Link>
            </li>
            <button
              data-testid="rfq-button"
              onClick={handleRFQLink}
              className="hover:underline text-slate-300 mb-6"
            >
              {t("home.footer.get_questions")}
            </button>
            <li className="hover:underline text-slate-300 mb-6">
              <button
                data-testid="rfq-button"
                onClick={handleAskQLink}
                className="hover:underline text-slate-300 mb-6"
              >
                {t("home.footer.ask_the_professionals")}
              </button>
            </li>
          </ul>
        </div>
        <div data-testid="support-section">
          <h3 className="text-md font-semibold mb-8">
            {t("home.footer.support")}
          </h3>
          <ul>
            <li className="hover:underline text-slate-300 mb-6 flex items-center gap-3">
              <a
                href="https://wa.me/971555623319"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <BiPhone /> +971555623319
              </a>
            </li>
            <li className="hover:underline text-slate-300 mb-6 flex items-center gap-3">
              <a
                href="mailto:contact@craftsceneapp.com"
                className="flex items-center gap-3"
              >
                <BiMailSend /> contact@craftsceneapp.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-slate-700 pt-5 text-slate-300">
        &copy; {t("home.footer.all_rights_reserved")}
      </div>
    </footer>
  );
};

export default Footer;
