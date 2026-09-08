"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
  showTrialModal: boolean;
  setShowTrialModal: (show: boolean) => void;
  showTrialBanner: boolean;
  setShowTrialBanner: (show: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  // Sidebar is collapsed by default (matching real Fireflies app)
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [showTrialBanner, setShowTrialBanner] = useState(true);

  // Check localStorage for dismissed states after mounting
  useEffect(() => {
    try {
      const modalDismissed = localStorage.getItem("dismissed_trial_modal");
      if (modalDismissed === "true") {
        setShowTrialModal(false);
      }
      const bannerDismissed = localStorage.getItem("dismissed_trial_banner");
      if (bannerDismissed === "true") {
        setShowTrialBanner(false);
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, []);

  const handleSetShowTrialModal = (show: boolean) => {
    setShowTrialModal(show);
    try {
      if (!show) {
        localStorage.setItem("dismissed_trial_modal", "true");
      }
    } catch (e) {}
  };

  const handleSetShowTrialBanner = (show: boolean) => {
    setShowTrialBanner(show);
    try {
      if (!show) {
        localStorage.setItem("dismissed_trial_banner", "true");
      }
    } catch (e) {}
  };

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        setIsCollapsed,
        toggleSidebar,
        showTrialModal,
        setShowTrialModal: handleSetShowTrialModal,
        showTrialBanner,
        setShowTrialBanner: handleSetShowTrialBanner,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
