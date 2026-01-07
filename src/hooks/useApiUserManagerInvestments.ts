import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import { fetchUserManagerInvestments, UserManagerInvestment } from '@/lib/api';

export function useApiUserManagerInvestments() {
    const { address: userAddress, isConnected } = useAccount();
    const [investments, setInvestments] = useState<UserManagerInvestment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadInvestments = async () => {
            if (!isConnected || !userAddress) {
                setInvestments([]);
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const data = await fetchUserManagerInvestments(userAddress);
                setInvestments(data.investments);
            } catch (err) {
                console.error('Error loading manager investments:', err);
                setInvestments([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadInvestments();
    }, [userAddress, isConnected]);

    const totalInvested = investments.reduce((sum, inv) => sum + inv.depositAmount, 0);

    return {
        investments,
        totalInvested,
        isLoading,
        isConnected,
    };
}
