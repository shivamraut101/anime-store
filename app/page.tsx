import ComingSoon from "@/components/ComingSoon";

export const dynamic = "force-dynamic";

export default function HomePage() {
  // Cloudflare R2 public URLs for coming soon assets
  const webBannerUrl = "https://pub-625227baf40f4d278068781b23620574.r2.dev/comingsoon/web-banner.mp4";
  const mobileVideoUrl = "https://pub-625227baf40f4d278068781b23620574.r2.dev/comingsoon/mobile-(1).mp4";
  const desktopAnimationUrl = "https://pub-625227baf40f4d278068781b23620574.r2.dev/comingsoon/animation.json";
  const mobileAnimationUrl = "https://pub-625227baf40f4d278068781b23620574.r2.dev/comingsoon/mobile.json";

  return (
    <ComingSoon
      webBannerUrl={webBannerUrl}
      mobileVideoUrl={mobileVideoUrl}
      desktopAnimationUrl={desktopAnimationUrl}
      mobileAnimationUrl={mobileAnimationUrl}
    />
  );
}