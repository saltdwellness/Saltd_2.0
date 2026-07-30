import { MarqueeBar } from '@/components/ui/MarqueeBar';

/**
 * Sits at the very top of the page, above the sticky navbar.
 * Its height is exposed as CSS var --marquee-h so the navbar can offset itself.
 */
export function TopMarquee() {
  return (
    <div className="fixed top-0 inset-x-0 z-[60]" style={{ height: 'var(--marquee-h, 44px)' }}>
      <MarqueeBar text="Hydration, but make it a ritual." textColor="text-white" />
    </div>
  );
}
