declare module 'page-flip/dist/js/page-flip.module.js' {
  export interface FlipSettings {
    width: number
    height: number
    size?: 'fixed' | 'stretch'
    minWidth?: number
    maxWidth?: number
    minHeight?: number
    maxHeight?: number
    showCover?: boolean
    usePortrait?: boolean
    mobileScrollSupport?: boolean
    maxShadowOpacity?: number
    drawShadow?: boolean
    flippingTime?: number
    autoSize?: boolean
  }
  export class PageFlip {
    constructor(el: HTMLElement, settings: FlipSettings)
    loadFromImages(images: string[]): void
    loadFromHTML(items: HTMLElement[] | NodeListOf<HTMLElement>): void
    on(event: 'flip' | 'init' | 'changeOrientation', cb: (e: { data: number | string }) => void): PageFlip
    flipNext(corner?: 'top' | 'bottom'): void
    flipPrev(corner?: 'top' | 'bottom'): void
    turnToPage(page: number): void
    getPageCount(): number
    getCurrentPageIndex(): number
    destroy(): void
  }
}
