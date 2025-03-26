import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { FaTimes, FaCamera } from 'react-icons/fa';
import toast from 'react-hot-toast';
import LoadingSpinner from './LoadingSpinner';

function BarcodeScanner({ isOpen, onClose, onScan }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [error, setError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const scannerRef = useRef(null);
  const scannerInstanceRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    let initTimeout;

    const initializeScanner = async () => {
      if (!isOpen || !containerRef.current) return;

      try {
        setIsInitializing(true);
        
        // Simulate minimum loading time for better UX
        initTimeout = setTimeout(() => {
          if (mounted) setIsInitializing(false);
        }, 1500);

        // First check if we can access any cameras
        const devices = await Html5Qrcode.getCameras();
        if (!devices || devices.length === 0) {
          throw new Error('No cameras found on this device');
        }

        // Create a new div element for the scanner if it doesn't exist
        if (!scannerRef.current) {
          scannerRef.current = document.createElement('div');
          scannerRef.current.id = 'reader';
          containerRef.current.appendChild(scannerRef.current);
        }

        // Initialize scanner with the first available camera
        if (!scannerInstanceRef.current) {
          scannerInstanceRef.current = new Html5Qrcode('reader');
        }

        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          formatsToSupport: [
            Html5Qrcode.FORMATS.QR_CODE,
            Html5Qrcode.FORMATS.EAN_13,
            Html5Qrcode.FORMATS.CODE_128
          ]
        };

        await scannerInstanceRef.current.start(
          { facingMode: 'environment' },
          config,
          (decodedText) => {
            if (mounted) {
              onScan(decodedText);
              toast.success('Code scanned successfully!');
              onClose();
            }
          },
          (errorMessage) => {
            // Ignore continuous scanning errors
            console.debug('QR scan error:', errorMessage);
          }
        );

        if (mounted) {
          setHasPermission(true);
          setError(null);
        }
      } catch (err) {
        console.error('Scanner initialization error:', err);
        if (mounted) {
          setError(err.message || 'Failed to initialize camera');
          setHasPermission(false);
          toast.error('Failed to access camera. Please ensure camera permissions are granted.');
        }
      }
    };

    initializeScanner();

    return () => {
      mounted = false;
      clearTimeout(initTimeout);
      if (scannerInstanceRef.current) {
        scannerInstanceRef.current.stop().catch(console.error);
      }
      // Clean up the scanner element
      if (scannerRef.current && scannerRef.current.parentNode) {
        scannerRef.current.parentNode.removeChild(scannerRef.current);
        scannerRef.current = null;
      }
    };
  }, [isOpen, onClose, onScan]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Header */}
      <div className="relative p-4 text-white">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close scanner"
        >
          <FaTimes className="w-6 h-6" />
        </button>
        <h2 className="text-center text-xl font-medium">Scan Code</h2>
      </div>

      {/* Scanner View */}
      <div className="flex-1 relative">
        {hasPermission === false && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4 animate-fade-in">
            <div className="space-y-4">
              <FaCamera className="w-12 h-12 mx-auto opacity-50" />
              <p>Camera access is required to scan codes.</p>
              <p className="text-sm opacity-75">{error}</p>
              <div className="space-y-2">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-white text-black rounded-md w-full hover:bg-opacity-90 transition-colors"
                >
                  Retry Camera Access
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-white/20 text-white rounded-md w-full hover:bg-white/30 transition-colors"
                >
                  Close Scanner
                </button>
              </div>
            </div>
          </div>
        )}

        {hasPermission === true && (
          <div className="flex-1 flex items-center justify-center animate-fade-in">
            <div 
              ref={containerRef}
              className="w-full max-w-lg mx-auto relative"
            >
              {/* Scanner will be mounted here */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 border-2 border-white/30 rounded-lg" />
                <div className="absolute inset-[25%] border-2 border-primary rounded-lg" />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-8 text-center text-white text-sm">
              <p>Position the code within the frame to scan</p>
            </div>
          </div>
        )}

        {(hasPermission === null || isInitializing) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 animate-fade-in">
            <LoadingSpinner size="large" color="white" />
            <p className="text-white text-sm">Initializing camera...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BarcodeScanner;