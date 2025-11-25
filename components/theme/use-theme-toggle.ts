"use client"

import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { AnimationStart, AnimationVariant, createAnimation } from "./animation";

export const useThemeToggle = ({
  variant = "circle",
  start = "center",
  blur = false,
  gifUrl = "",
}: {
  variant?: AnimationVariant;
  start?: AnimationStart;
  blur?: boolean;
  gifUrl?: string;
} = {}) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const styleId = "theme-transition-styles";
  const updateStyles = useCallback((css: string, name: string) => {
    if (typeof window === "undefined") return;
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = css;
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark(!isDark);
    const animation = createAnimation(variant, start, blur, gifUrl);
    updateStyles(animation.css, animation.name);
    if (typeof window === "undefined") return;
    const switchTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };
    if (!(document as any).startViewTransition) {
      switchTheme();
      return;
    }
    (document as any).startViewTransition(switchTheme);
  }, [
    theme,
    setTheme,
    variant,
    start,
    blur,
    gifUrl,
    updateStyles,
    isDark,
    setIsDark,
  ]);

  return {
    isDark,
    toggleTheme,
  };
};