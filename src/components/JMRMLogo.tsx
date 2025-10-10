import jmrmLogo from '../assets/JMRMLogo.png';

interface JMRMLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function JMRMLogo({ size = 'md', className = '' }: JMRMLogoProps) {
  const sizeClasses = {
    xs: 'h-5 w-auto',
    sm: 'h-8 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-20 w-auto'
  };

  return (
    <img
      src={jmrmLogo}
      alt="JMRM - José Ruz Data Engineer"
      className={`${sizeClasses[size]} ${className} transition-all duration-300 hover:scale-105`}
      style={size === 'xs' ? { height: '80px', width: 'auto' } : undefined}
      loading="eager"
      decoding="async"
    />
  );
}