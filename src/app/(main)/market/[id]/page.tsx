'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowUpRight, Loader2, AlertCircle, Sprout, Fish, TreePine } from 'lucide-react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import TradeCard from '@/components/market/trade-card';
import ProductAnalytics from '@/components/market/product-analytics';
import ProductInformation from '@/components/market/product-information';
import { getCreditRatingColor } from '@/lib/constants/product-market';
import { fetchMarketItemById, MarketItem } from '@/lib/api';
import { TokenizedProduct } from '@/types/product-market';
import { useTokenP2P } from '@/hooks/useTokenP2P';

// Icon mapping based on category
const getCategoryIcon = (category: string | null | undefined) => {
    if (!category) return Sprout;
    switch (category.toLowerCase()) {
        case 'agriculture':
            return Sprout;
        case 'fisheries':
            return Fish;
        case 'forestry':
            return TreePine;
        default:
            return Sprout;
    }
};

// Convert API response to TokenizedProduct format
const mapApiToProduct = (item: MarketItem): TokenizedProduct => ({
    id: item.id,
    productName: item.name,
    symbol: item.symbol,
    categoryId: item.categoryId as 'Agriculture' | 'Fisheries' | 'Forestry',
    description: item.description,
    loanInterest: parseFloat(item.loanInterest),
    loanAmount: parseFloat(item.loanAmount),
    loanTenor: item.loanTenor,
    creditRate: item.creditRate as 'A' | 'B' | 'C',
    contractId: item.contractAddress,
    tokenP2PAddress: item.contractAddress as `0x${string}`,
    holderCount: parseInt(item.holderCount) || 0,
    status: item.status,
    icon: getCategoryIcon(item.categoryId),
});

interface LoanCalculation {
    monthlyPrincipal: number;
    monthlyInterest: number;
    monthlyPayment: number;
    totalRepayment: number;
}

export default function ProductDetailPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const productId = params.id as string;

    // Get the tab query parameter (default to 'buy' if not specified)
    const defaultTab = searchParams.get('tab') === 'sell' ? 'sell' : 'buy';

    const [product, setProduct] = useState<TokenizedProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [investmentAmount, setInvestmentAmount] = useState<string>('');
    const [calculation, setCalculation] = useState<LoanCalculation | null>(null);

    // Get supply data from contract
    const supplyData = useTokenP2P({ 
        tokenP2PAddress: product?.tokenP2PAddress as `0x${string}` ?? '0x0000000000000000000000000000000000000000' 
    });

    // Fetch product data on component mount
    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchMarketItemById(productId);
                const mappedProduct = mapApiToProduct(data);
                setProduct(mappedProduct);
            } catch (err) {
                console.error('Error loading product:', err);
                setError('Failed to load product details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [productId]);

    const calculateReturns = (amount: number) => {
        if (!product || amount <= 0) {
            setCalculation(null);
            return;
        }

        const principal = amount;
        const monthlyInterestRate = product.loanInterest / 100 / 12;
        const numberOfPayments = product.loanTenor;

        // Calculate monthly payment using amortization formula
        const monthlyPayment =
            (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

        const totalRepayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalRepayment - principal;
        const monthlyInterest = totalInterest / numberOfPayments;
        const monthlyPrincipal = principal / numberOfPayments;

        setCalculation({
            monthlyPrincipal,
            monthlyInterest,
            monthlyPayment,
            totalRepayment,
        });
    };

    const handleAmountChange = (value: string) => {
        setInvestmentAmount(value);
        const amount = parseFloat(value);
        if (!isNaN(amount)) {
            calculateReturns(amount);
        } else {
            setCalculation(null);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                    <p className="text-muted-foreground">Loading product details...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <AlertCircle className="h-8 w-8 mx-auto text-destructive" />
                    <p className="text-destructive font-medium">{error}</p>
                    <Button onClick={() => window.location.reload()} variant="outline">
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    // Product not found state
    if (!product) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <h3 className="mb-2 text-lg font-semibold">Product Not Found</h3>
                        <p className="mb-6 text-center text-sm text-muted-foreground">
                            The requested tokenized product could not be found
                        </p>
                        <Button onClick={() => router.push('/market')}>
                            Back to Market
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const ProductIcon = product.icon;

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <Button
                variant="ghost"
                onClick={() => router.push('/market')}
                className="mb-4 hover:scale-105 transition-transform cursor-pointer"
            >
                <ArrowLeft className="mr-2 h-4 w-4 " />
                Back to Market
            </Button>

            {/* Two Column Layout: Product Details (Left) + Trade Card (Right) */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Left Side: Product Details Card */}
                <Card className="border-2">
                    <CardHeader>
                        <div className="flex items-start justify-between flex-wrap gap-3">
                            <div className="flex items-start gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                                    <ProductIcon className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                                        <CardTitle className="text-2xl text-[#0A6A74]">{product.productName}</CardTitle>
                                        <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 font-mono font-bold text-lg px-3 py-1">
                                            ${product.symbol}
                                        </Badge>
                                    </div>
                                    <CardDescription className="text-base">{product.categoryId}</CardDescription>
                                </div>
                            </div>
                            <Badge className={getCreditRatingColor(product.creditRate)}>
                                Credit Rating: {product.creditRate}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Description</p>
                                    <p className="text-base font-medium">{product.description}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Loan Amount</p>
                                    <p className="text-2xl font-bold">${product.loanAmount.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Contract ID</p>
                                    <a
                                        href={`https://sepolia.mantlescan.xyz/address/${product.tokenP2PAddress}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors w-fit"
                                    >
                                        <p className="text-base font-medium font-mono">
                                            {product.tokenP2PAddress.slice(0, 5)}...{product.tokenP2PAddress.slice(-3)}
                                        </p>
                                        <ArrowUpRight className="h-4 w-4" />
                                    </a>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Status</p>
                                    <p className="text-base font-medium uppercase">{product.status}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Interest Rate</p>
                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                        {product.loanInterest.toFixed(2)}% p.a.
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Loan Tenor</p>
                                    <p className="text-base font-medium">{product.loanTenor} months</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Category</p>
                                    <p className="text-base font-medium">{product.categoryId}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Right Side: Trade Card */}
                <TradeCard
                    maxAmount={product.loanAmount}
                    onAmountChange={handleAmountChange}
                    symbol={product.symbol}
                    tokenP2PAddress={product.tokenP2PAddress}
                    defaultTab={defaultTab}
                />
            </div>

            {/* Product Analytics - with real supply data from contract */}
            <ProductAnalytics 
                product={product} 
                totalSupply={supplyData.totalSupply}
                maxSupply={supplyData.maxSupply}
                tokenPrice={supplyData.tokenPrice}
            />

            {/* Product Information */}
            <ProductInformation product={product} />
        </div>
    );
}
