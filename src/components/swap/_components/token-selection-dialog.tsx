'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Token {
  id: string;
  ticker: string;
  name: string;
  sector: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}

interface TokenSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  tokens: Token[];
  selectedToken: Token | null;
  disabledTokenId?: string;
  onSelect: (token: Token) => void;
  tokenBalances?: Record<string, number>; // Add token balances mapping
}

export default function TokenSelectionDialog({
  open,
  onOpenChange,
  title,
  description,
  tokens,
  selectedToken,
  disabledTokenId,
  onSelect,
  tokenBalances = {},
}: TokenSelectionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {tokens.map((token) => {
            const isDisabled = token.id === disabledTokenId;
            const balance = tokenBalances[token.id] ?? 0;

            return (
              <button
                key={token.id}
                onClick={() => !isDisabled && onSelect(token)}
                disabled={isDisabled}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors border ${isDisabled
                  ? 'opacity-40 cursor-not-allowed bg-muted/30'
                  : 'hover:bg-muted cursor-pointer'
                  }`}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${token.color}20` }}
                >
                  <token.icon className="h-6 w-6" style={{ color: token.color }} />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold">{token.ticker}</div>
                  <div className="text-sm text-muted-foreground">{token.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">
                    {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-muted-foreground">{token.ticker}</div>
                </div>
                {selectedToken?.id === token.id && (
                  <div className="w-2 h-2 rounded-full bg-[#225B3A]" />
                )}
                {isDisabled && (
                  <span className="text-xs text-muted-foreground">(Selected)</span>
                )}
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
