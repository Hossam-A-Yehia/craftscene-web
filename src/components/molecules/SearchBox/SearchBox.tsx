"use client";
import Button from "@/components/atoms/Button/Button";
import Head from "@/components/atoms/Head/Head";
import Input from "@/components/atoms/Input/Input";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function SearchBox({
  name,
  title,
  desc,
  onSearch,
  placeholder,
  categoryTitle,
}: {
  name: string;
  title: string;
  desc: string;
  placeholder: string;
  onSearch: (query: string) => void;
  categoryTitle?: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
const { t } = useTranslation();
  const handleSearchClick = () => {
    onSearch(searchQuery);
  };

  return (
    <>
      <Head title={title} desc={desc} categoryTitle={categoryTitle || ""} />
      <div className="flex justify-center mb-8 w-full md:w-1/2 mx-auto">
        <Input
          placeholder={placeholder}
          id={name}
          type="text"
          name={name}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="mr-2 ltr:ml-2">
          <Button
            variant="main"
            onClick={handleSearchClick}
            dataTestid="search-submit"
          >
            {t("ideas.search")}
          </Button>
        </div>
      </div>
    </>
  );
}
