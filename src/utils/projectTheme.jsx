
export const getProjectTheme = (index) => {
    const themes = [
        {
            name: 'emerald',
            color: 'emerald',
            // Borders
            borderColor: 'border-emerald-500',
            dashedBorder: 'border-emerald-500/30',
            // Backgrounds
            blobColor: 'bg-emerald-500/10',
            badge: 'bg-emerald-500/20 text-emerald-300',
            // Button
            button: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950',
            // Text
            textAccent: 'text-emerald-400',
            groupHoverText: 'group-hover:text-emerald-400',
            // Misc
            particle: 'bg-emerald-500',
            hoverBorder: 'hover:border-emerald-500/50'
        },
        {
            name: 'purple',
            color: 'purple',
            borderColor: 'border-purple-500',
            dashedBorder: 'border-purple-500/30',
            blobColor: 'bg-purple-500/10',
            badge: 'bg-purple-500/20 text-purple-300',
            button: 'bg-purple-500 hover:bg-purple-400 text-slate-950',
            textAccent: 'text-purple-400',
            groupHoverText: 'group-hover:text-purple-400',
            particle: 'bg-purple-500',
            hoverBorder: 'hover:border-purple-500/50'
        },
        {
            name: 'blue',
            color: 'blue',
            borderColor: 'border-blue-500',
            dashedBorder: 'border-blue-500/30',
            blobColor: 'bg-blue-500/10',
            badge: 'bg-blue-500/20 text-blue-300',
            button: 'bg-blue-500 hover:bg-blue-400 text-slate-950',
            textAccent: 'text-blue-400',
            groupHoverText: 'group-hover:text-blue-400',
            particle: 'bg-blue-500',
            hoverBorder: 'hover:border-blue-500/50'
        },
        {
            name: 'rose',
            color: 'rose',
            borderColor: 'border-rose-500',
            dashedBorder: 'border-rose-500/30',
            blobColor: 'bg-rose-500/10',
            badge: 'bg-rose-500/20 text-rose-300',
            button: 'bg-rose-500 hover:bg-rose-400 text-slate-950',
            textAccent: 'text-rose-400',
            groupHoverText: 'group-hover:text-rose-400',
            particle: 'bg-rose-500',
            hoverBorder: 'hover:border-rose-500/50'
        },
        {
            name: 'amber',
            color: 'amber',
            borderColor: 'border-amber-500',
            dashedBorder: 'border-amber-500/30',
            blobColor: 'bg-amber-500/10',
            badge: 'bg-amber-500/20 text-amber-300',
            button: 'bg-amber-500 hover:bg-amber-400 text-slate-950',
            textAccent: 'text-amber-400',
            groupHoverText: 'group-hover:text-amber-400',
            particle: 'bg-amber-500',
            hoverBorder: 'hover:border-amber-500/50'
        }
    ];

    return themes[index % themes.length];
};
