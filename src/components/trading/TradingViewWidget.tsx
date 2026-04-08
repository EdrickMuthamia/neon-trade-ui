import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    TradingView: any;
  }
}

interface TradingViewWidgetProps {
  symbol?: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ symbol = 'BINANCE:BTCUSDT' }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_chart',
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      // Clean up if needed
    };
  }, [symbol]);

  return (
    <div className="flex flex-col h-full w-full bg-[#131722] rounded-xl overflow-hidden border border-gray-800">
      <div id="tradingview_chart" className="flex-grow h-full w-full" />
    </div>
  );
};

export default TradingViewWidget;