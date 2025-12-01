import { useEffect, useState } from 'react';

export function useUserCredits() {
  const [credits, setCredits] = useState<number>(0);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCredits() {
      try {
        const res = await fetch('/api/user/credits');
        if (res.ok) {
          const data = await res.json();
          setCredits(data.credits);
          setIsPaid(data.isPaid);
        }
      } catch (error) {
        console.error('Error fetching credits:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCredits();
  }, []);

  return { credits, isPaid, loading };
}
