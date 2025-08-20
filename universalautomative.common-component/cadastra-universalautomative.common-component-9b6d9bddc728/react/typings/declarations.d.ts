declare module 'vtex.device-detector' {
  export const useDevice: () => {
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
  }
}