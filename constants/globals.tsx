export const BRAND = {
    logo: "<VT/>",
    name: "Valerio Tolli",
    email: "info@tollivalerio.com",
    description: "Full Stack Developer",
    url: "https://tollivalerio.com",
    icons: {
    icon: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='black' rx='20'/><text y='50%' x='50%' fontWeight='bold' fontSize='45' fill='white' fontFamily='monospace' dy='.3em' text-anchor='middle'>%3CVT/%3E</text></svg>`,
  },
};
export const NAV_LINKS = [
    {name: "Home", link: "/"},
    {name: "Progetti", link: "/progetti"},
    {name: "Esperienze", link: "/lavoro"},
    {name: "Skills", link: "/about/skills"},
] as const;

export const SOCIAL_LINKS = {
    github: "https://github.com/val3riot",
    linkedin: "https://www.linkedin.com/in/valeriotolli"
};

export const WORK_EXPERIENCE = [
    {
        azienda: 'Endow',
        ruolo: 'Backend Developer',
        periodo: 'Set 2021 - set 2024',
        descrizione: 'Sviluppo di interfacce scalabili e gestione del backend.',
        competenze: ['Spring Boot', 'Spring Framework', 'Angular', 'Oracle SQL'],
        linkAzienda: 'https://futurae.com',
        logo: '/logos/futurae.png',
        slug: 'endow',
        highlights: [
            "Ottimizzazione performance del 30%",
            "Migrazione da PHP a Next.js"
        ]
    },
]