export const BRAND = {
    logo: "<VT/>",
    name: "Valerio Tolli",
    email: "info@tollivalerio.com",
    description: "Full Stack Developer",
    url: "https://tollivalerio.com",
};
export const NAV_LINKS = [
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