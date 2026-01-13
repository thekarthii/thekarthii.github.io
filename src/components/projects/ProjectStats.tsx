import { Repository } from '@/types/portfolio';
import { cn } from '@/lib/utils';

interface ProjectStatsProps {
  repository: Repository;
  compact?: boolean;
  className?: string;
}

export function ProjectStats({ repository, compact = false, className }: ProjectStatsProps) {
  const stats = [
    {
      label: 'Stars',
      value: repository.stars,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
    },
    {
      label: 'Forks',
      value: repository.forks,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      ),
    },
    {
      label: 'Watchers',
      value: repository.watchers,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
  ];

  if (compact) {
    return (
      <div className={cn('flex items-center gap-4 text-sm text-slate-400', className)}>
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-1">
            <span className="text-emerald-500">{stat.icon}</span>
            <span>{formatNumber(stat.value)}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-3 gap-4', className)}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center p-3 bg-slate-800/50 rounded-lg border border-emerald-900/30"
        >
          <div className="text-emerald-500 mb-1">{stat.icon}</div>
          <span className="text-lg font-semibold text-slate-200">
            {formatNumber(stat.value)}
          </span>
          <span className="text-xs text-slate-500">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
