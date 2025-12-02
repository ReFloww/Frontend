'use client';

import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface Token {
  id: string;
  ticker: string;
  name: string;
  sector: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}

interface TokenSelectorButtonProps {
  token: Token;
  onClick: () => void;
}

export default function TokenSelectorButton({ token, onClick }: TokenSelectorButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="flex items-center gap-2 h-12 px-4 shrink-0 ml-3 rounded-xl hover:bg-muted/50 transition-all"
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${token.color}20` }}
      >
        <token.icon className="h-4 w-4" style={{ color: token.color }} />
      </div>
      <span className="font-semibold">{token.ticker}</span>
      <ChevronDown className="h-4 w-4" />
    </Button>
  );
}
