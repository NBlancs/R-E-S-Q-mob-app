import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

// Base dimensions for scaling
const BASE_WIDTH = 375; // iPhone SE width
const BASE_HEIGHT = 667; // iPhone SE height

// Scaling factors
const widthScale = width / BASE_WIDTH;
const heightScale = height / BASE_HEIGHT;

// Responsive font sizes
export const responsiveFontSize = (baseSize: number): number => {
  const avgScale = (widthScale + heightScale) / 2;
  return Math.round(baseSize * avgScale);
};

// Responsive padding/margin
export const responsiveSize = (baseSize: number): number => {
  const avgScale = (widthScale + heightScale) / 2;
  return Math.round(baseSize * avgScale);
};

// Width-based scaling
export const responsiveWidth = (percentage: number): number => {
  return (width * percentage) / 100;
};

// Height-based scaling
export const responsiveHeight = (percentage: number): number => {
  return (height * percentage) / 100;
};

// Get device orientation
export const isPortrait = (): boolean => height > width;

// Get device type
export const isTablet = (): boolean => {
  const aspectRatio = width / height;
  return width > 600 || (aspectRatio > 1 && width > 600);
};

// Responsive border radius
export const responsiveBorderRadius = (baseRadius: number): number => {
  const avgScale = (widthScale + heightScale) / 2;
  return Math.round(baseRadius * avgScale);
};

export default {
  windowWidth: width,
  windowHeight: height,
  responsiveFontSize,
  responsiveSize,
  responsiveWidth,
  responsiveHeight,
  isPortrait,
  isTablet,
  responsiveBorderRadius,
};
