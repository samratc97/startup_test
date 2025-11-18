interface LoadingProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

export default function Loading({ 
  className = '', 
  size = 'md', 
  text = 'Loading...' 
}: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  }

  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="text-center">
        <div 
          className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 mx-auto mb-4`}
        />
        <p className="text-gray-600">{text}</p>
      </div>
    </div>
  )
}

export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-200 rounded h-4 mb-2"></div>
      <div className="bg-gray-200 rounded h-4 mb-2 w-3/4"></div>
      <div className="bg-gray-200 rounded h-4 w-1/2"></div>
    </div>
  )
}