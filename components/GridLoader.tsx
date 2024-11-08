"use client";
import { ReactNode, useState } from "react";
import "./GridLoader.css";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0/client";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const GridLoader = ({}) => {
  const { loading: popularLinksLoading } = useSelector(
    (state: RootState) => state.popularLinks,
  );
  const { loading: personalWebsiteLoading } = useSelector(
    (state: RootState) => state.personalWebsite,
  );
  const { isLoading: userLoading } = useUser();
  if (!popularLinksLoading && !personalWebsiteLoading && !userLoading)
    return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="main">
        <div className="tap"></div>
        <div className="tap"></div>
        <div className="tap"></div>
        <div className="tap"></div>
        <div className="body"></div>
        <div className="thumb"></div>
      </div>
    </div>
  );
};

export default GridLoader;
