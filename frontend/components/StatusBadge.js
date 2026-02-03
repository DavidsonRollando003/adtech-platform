export default function StatusBadge({ status }) {
    const styles = {
        active: 'bg-emerald-100 text-emerald-700 border-emerald-200 shadow-emerald-100',
        paused: 'bg-amber-100 text-amber-700 border-amber-200',
        finished: 'bg-gray-100 text-gray-700 border-gray-200',
    };

    const labels = {
        active: 'Actif',
        paused: 'En Pause',
        finished: 'Terminé',
    };

    const isLive = status === 'active';

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-sm transition-all duration-300 ${styles[status] || styles.finished}`}>
            {isLive && (
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
            )}
            {labels[status] || status}
        </span>
    );
}
