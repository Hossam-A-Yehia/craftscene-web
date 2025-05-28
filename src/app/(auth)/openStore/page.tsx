"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { MdDesktopMac } from 'react-icons/md';

const APP_STORE_LINK = 'https://apps.apple.com/us/app/craftscene/id6738144005';
const PLAY_STORE_LINK = 'https://play.google.com/store/apps/details?id=com.app.craftscene&pli=1';

const OpenPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [deviceType, setDeviceType] = useState<'ios' | 'android' | 'desktop'>('desktop');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    try {
      const userAgent = navigator.userAgent || navigator.vendor || (typeof window !== "undefined" && (window as any).opera);

      if (/iPad|iPhone|iPod/.test(userAgent)) {
        setDeviceType('ios');
        setTimeout(() => {
          window.location.href = APP_STORE_LINK;
          setProgress(100);
        }, 2000);
      } else if (/android/i.test(userAgent)) {
        setDeviceType('android');
        setTimeout(() => {
          window.location.href = PLAY_STORE_LINK;
          setProgress(100);
        }, 2000);
      } else {
        setDeviceType('desktop');
        setTimeout(() => {
          router.push('/');
          setProgress(100);
        }, 1500);
      }
    } catch (err) {
      setError(
        typeof err === 'object' && err !== null && 'message' in err
          ? String((err as { message: unknown }).message)
          : 'Failed to detect device type. Please try again.'
      );
      clearInterval(progressInterval);
    } 
    return () => clearInterval(progressInterval);
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
        <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 via-pink-400/10 to-purple-400/10"></div>
        <div className="relative z-10 text-center p-8 max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getGradientColors = () => {
    switch (deviceType) {
      case 'ios':
        return 'from-orange-500 to-amber-600';
      case 'android':
        return 'from-orange-500 to-red-600';
      default:
        return 'from-orange-500 to-amber-600';
    }
  };

  const getBackgroundGradient = () => {
    switch (deviceType) {
      case 'ios':
        return 'from-orange-50 via-amber-50 to-red-50';
      case 'android':
        return 'from-orange-50 via-red-50 to-amber-50';
      default:
        return 'from-orange-50 via-amber-50 to-red-50';
    }
  };

  const getMessage = () => {
    switch (deviceType) {
      case 'ios':
        return {
          title: 'Opening App Store',
          subtitle: 'Taking you to download our iOS app...',
          icon: <FaApple className="text-5xl text-white" />
        };
      case 'android':
        return {
          title: 'Opening Play Store',
          subtitle: 'Taking you to download our Android app...',
          icon: <FaGooglePlay className="text-5xl text-white" />
        };
      default:
        return {
          title: 'Redirecting to Web App',
          subtitle: 'Taking you to our desktop experience...',
          icon: <MdDesktopMac className="text-5xl text-white " />
        };
    }
  };

  const message = getMessage();

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${getBackgroundGradient()}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-200/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-200/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-red-200/10 to-transparent rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 text-center p-8 max-w-md mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Animated icon container */}
          <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${getGradientColors()} rounded-full flex items-center justify-center shadow-lg transform animate-bounce`}>
            {message.icon}
          </div>

          {/* Title with gradient text */}
          <h2 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${getGradientColors()} bg-clip-text text-transparent`}>
            {message.title}
          </h2>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {message.subtitle}
          </p>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getGradientColors()} rounded-full transition-all duration-300 ease-out`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Progress percentage */}
          <div className="text-sm text-gray-500 mb-6">
            {Math.round(progress)}% complete
          </div>

          {/* Fallback manual buttons */}
          <div className="space-y-3">
            {deviceType === 'ios' && (
              <a
                href={APP_STORE_LINK}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <FaApple className="text-xl" />
                <span>Open App Store</span>
              </a>
            )}
            
            {deviceType === 'android' && (
              <a
                href={PLAY_STORE_LINK}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <FaGooglePlay className="text-xl" />
                <span>Open Play Store</span>
              </a>
            )}
            
            {deviceType === 'desktop' && (
              <button
                onClick={() => router.push('/')}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <MdDesktopMac className="text-xl" />
                <span>Continue to Web App</span>
              </button>
            )}
          </div>

          {/* Small helper text */}
          <p className="text-xs text-gray-400 mt-4">
            If nothing happens, try clicking the button above
          </p>
        </div>
      </div>
    </div>
  );
};

export default OpenPage;