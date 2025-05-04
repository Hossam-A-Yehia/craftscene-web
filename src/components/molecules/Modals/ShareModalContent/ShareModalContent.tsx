import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  ThreadsIcon,
  ThreadsShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import "./share.css";
import { FiCheckCircle } from "react-icons/fi";
import { IoMdMail } from "react-icons/io";
import { t } from "i18next";
import Text from "@/components/atoms/Text/Text";

type ModalContentProps = {
  onCancel: () => void;
  img: string;
  shareTitle: string;
  url: string;
};

const ShareModalContent = ({
  onCancel,
  img,
  shareTitle,
  url,
}: ModalContentProps) => {
  const shareUrl = `https://craftscene-web.vercel.app/${url}`;
  const title = t("share.title") + shareTitle;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative py-8 px-12 space-y-6 bg-white rounded-lg text-center shadow-lg max-w-lg mx-auto"
      data-testid="share-modal-container"
    >
      <button
        onClick={onCancel}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        aria-label="Close modal"
        data-testid="close-button"
      >
        <IoClose size={24} />
      </button>

      <Text className="text-xl font-semibold">
        {t("share.share_this") +
          shareTitle +
          t("share.with_clients_and_friends")}
      </Text>
      <img
        src={img}
        alt="Project thumbnail"
        className="rounded-md mx-auto"
        data-testid="share-image"
      />

      <div className="flex flex-wrap items-center justify-center gap-3">
        <FacebookShareButton url={shareUrl} data-testid="facebook-share">
          <FacebookIcon size={40} round />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={title}
          data-testid="twitter-share"
        >
          <XIcon size={40} round />
        </TwitterShareButton>

        <TelegramShareButton
          url={shareUrl}
          title={title}
          data-testid="telegram-share"
        >
          <TelegramIcon size={40} round />
        </TelegramShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={title}
          separator=": "
          data-testid="whatsapp-share"
        >
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>

        <LinkedinShareButton url={shareUrl} data-testid="linkedin-share">
          <LinkedinIcon size={40} round />
        </LinkedinShareButton>

        <a
          key={"Email"}
          href={`mailto:?subject=${title}&body=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 rounded-full text-white bg-gray-600 hover:bg-gray-700`}
          data-testid="email-share"
        >
          <IoMdMail size={18} />
        </a>

        <ThreadsShareButton
          url={shareUrl}
          title={title}
          data-testid="threads-share"
        >
          <ThreadsIcon size={40} round />
        </ThreadsShareButton>
      </div>

      <div className="mt-6">
        <div className="flex items-center border rounded-md overflow-hidden">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="w-full px-3 py-2 border-none focus:outline-none"
          />
          <button
            onClick={copyToClipboard}
            className="bg-gray-100 px-4 py-2"
            data-testid="copy-button"
          >
            <FaRegCopy
              size={20}
              className={copied ? "text-green-500" : "text-gray-600"}
            />
          </button>
        </div>
        {copied && (
          <div
            className="flex items-center space-x-2 mt-4 bg-green-100 p-3 rounded-md shadow-sm"
            data-testid="copied-message"
          >
            <FiCheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-700 font-semibold">
              {t("share.link_copied")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareModalContent;
