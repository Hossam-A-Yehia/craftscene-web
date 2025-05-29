"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const APP_STORE_LINK = 'https://apps.apple.com/us/app/craftscene/id6738144005';
const PLAY_STORE_LINK = 'https://play.google.com/store/apps/details?id=com.app.craftscene&pli=1';

const OpenPage = () => {
  const router = useRouter();

  useEffect(() => {
    try {
      const userAgent = navigator.userAgent || navigator.vendor || (typeof window !== "undefined" && (window as any).opera);

      if (/iPad|iPhone|iPod/.test(userAgent)) {
        window.location.href = APP_STORE_LINK;
      } else if (/android/i.test(userAgent)) {
        window.location.href = PLAY_STORE_LINK;
      } else {
        router.push('/');
      }
    } catch (err) {
    console.log(err);
      router.push('/');
    }
  }, [router]);

  return null;
};

export default OpenPage;