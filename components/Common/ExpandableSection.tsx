'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function ExpandableSection({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Set a threshold of roughly 120-150px for the preview
      if (contentRef.current.scrollHeight > 150) {
        setShowButton(true);
      }
    }
  }, [children]);

  return (
    <div>
      <div 
        ref={contentRef}
        style={{
          maxHeight: isExpanded ? 'none' : '150px',
          overflow: 'hidden',
          position: 'relative',
          transition: 'max-height 0.3s ease-in-out'
        }}
      >
        {children}
        {!isExpanded && showButton && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: 'linear-gradient(transparent, var(--surface))',
            pointerEvents: 'none'
          }} />
        )}
      </div>
      {showButton && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            marginTop: '0.5rem',
            background: 'none',
            border: 'none',
            color: 'var(--primary)',
            fontWeight: 600,
            cursor: 'pointer',
            padding: 0,
            fontSize: '0.95rem'
          }}
        >
          {isExpanded ? 'Thu gọn' : 'Xem thêm'}
        </button>
      )}
    </div>
  );
}
