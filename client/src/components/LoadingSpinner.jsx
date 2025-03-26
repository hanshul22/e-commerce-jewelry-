import { useEffect } from 'react';
import gsap from 'gsap';

function LoadingSpinner({ size = 'default', color = 'white', className = '' }) {
  useEffect(() => {
    // Create smooth loading animation
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to('.loading-dot', {
      y: -10,
      duration: 0.5,
      stagger: 0.2,
      ease: 'power2.out'
    })
    .to('.loading-dot', {
      y: 0,
      duration: 0.5,
      stagger: 0.2,
      ease: 'power2.in'
    });

    return () => tl.kill();
  }, []);

  const sizeClasses = {
    small: 'w-8 h-8 gap-1',
    default: 'w-12 h-12 gap-2',
    large: 'w-16 h-16 gap-3'
  };

  const dotSizes = {
    small: 'w-1.5 h-1.5',
    default: 'w-2.5 h-2.5',
    large: 'w-3.5 h-3.5'
  };

  return (
    <div 
      className={`flex items-center justify-center ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div className={`loading-dot rounded-full ${dotSizes[size]} ${color === 'white' ? 'bg-white' : 'bg-primary'}`} />
      <div className={`loading-dot rounded-full ${dotSizes[size]} ${color === 'white' ? 'bg-white' : 'bg-primary'}`} />
      <div className={`loading-dot rounded-full ${dotSizes[size]} ${color === 'white' ? 'bg-white' : 'bg-primary'}`} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default LoadingSpinner;