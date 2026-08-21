import { useEffect, useState } from 'react';

interface timeEnd {
  time?: string;
}

export default function SaleTimer(time: timeEnd) {
  const saleEnd = new Date('2026-06-30').getTime();

  const [timeLeft, setTimeLeft] = useState(saleEnd - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = saleEnd - Date.now();

      if (remaining <= 0) {
        clearInterval(timer);
        setTimeLeft(0);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [saleEnd]);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className='flex gap-2'>
      <span className='font-bold text-primary-500'>{hours}h</span>
      <span className='font-bold text-primary-500'>{minutes}m</span>
      <span className='font-bold text-primary-500'>{seconds}s</span>
    </div>
  );
}
