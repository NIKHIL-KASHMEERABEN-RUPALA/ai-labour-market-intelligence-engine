import React from 'react';
import { AlertSeverity, AlertStatus } from '../../types/situational';
import { AlertCircle, AlertTriangle, Info, CheckCircle2, ShieldAlert } from 'lucide-react';

interface SeverityBadgeProps {
  severity: AlertSeverity;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  severity,
  size = 'md',
  showIcon = true,
  className = '',
}) => {
  const configs = {
    critical: {
      label: 'CRITICAL',
      icon: ShieldAlert,
      bg: 'bg-red-50 text-red-700 border-red-200',
      badgeDot: 'bg-red-500',
      glow: 'shadow-red-500/10',
    },
    high: {
      label: 'HIGH PRIORITY',
      icon: AlertTriangle,
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
      badgeDot: 'bg-amber-500',
      glow: 'shadow-amber-500/10',
    },
    medium: {
      label: 'MEDIUM',
      icon: AlertCircle,
      bg: 'bg-blue-50 text-blue-700 border-blue-200',
      badgeDot: 'bg-blue-500',
      glow: 'shadow-blue-500/10',
    },
    low: {
      label: 'LOW',
      icon: Info,
      bg: 'bg-slate-50 text-slate-700 border-slate-200',
      badgeDot: 'bg-slate-400',
      glow: '',
    },
  };

  const config = configs[severity] || configs.medium;
  const IconComp = config.icon;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 font-bold',
    md: 'text-xs px-2.5 py-1 font-bold',
    lg: 'text-sm px-3 py-1.5 font-bold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border uppercase tracking-wider font-mono shadow-xs ${sizeClasses[size]} ${config.bg} ${config.glow} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.badgeDot} ${severity === 'critical' ? 'animate-ping' : ''}`} />
      {showIcon && <IconComp className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />}
      <span>{config.label}</span>
    </span>
  );
};

interface StatusChipProps {
  status: AlertStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({
  status,
  size = 'md',
  className = '',
}) => {
  const configs: Record<AlertStatus, { label: string; bg: string; dot: string; icon?: React.ComponentType<{ className?: string }> }> = {
    unacknowledged: {
      label: 'Unacknowledged',
      bg: 'bg-red-50 text-red-700 border-red-300 font-bold',
      dot: 'bg-red-500 animate-pulse',
    },
    acknowledged: {
      label: 'Acknowledged',
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold',
      dot: 'bg-emerald-500',
      icon: CheckCircle2,
    },
    escalated: {
      label: 'Escalated',
      bg: 'bg-purple-50 text-purple-700 border-purple-300 font-semibold',
      dot: 'bg-purple-500',
    },
    resolved: {
      label: 'Resolved',
      bg: 'bg-slate-100 text-slate-700 border-slate-300 font-semibold',
      dot: 'bg-slate-400',
    },
  };

  const config = configs[status] || configs.unacknowledged;
  const Icon = config.icon;

  const sizeClass = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border shadow-2xs font-sans ${sizeClass} ${config.bg} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {Icon && <Icon className="h-3 w-3" />}
      <span>{config.label}</span>
    </span>
  );
};
