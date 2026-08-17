export const BRAND = {
    logo: "<VT/>",
    name: "Valerio Tolli",
    email: "info@tollivalerio.com",
    description: "Java Backend Developer",
    url: "https://tollivalerio.com",
};

export const NAV_LINKS = [
    { name: "Progetti", link: "/progetti" },
    { name: "Esperienze", link: "/lavoro" },
    { name: "Skills", link: "/about/skills" },
] as const;

export const SOCIAL_LINKS = {
    github: "https://github.com/val3riot",
    linkedin: "https://www.linkedin.com/in/valeriotolli",
};
export const WORK_EXPERIENCE = [
    {
        azienda: "Endow",
        ruolo: "Software Developer",
        periodo: "Set 2021 - Set 2024",
        descrizione:
            "Sviluppo e manutenzione di applicazioni enterprise Java, servizi backend e interfacce web.",
        competenze: [
            "Java",
            "Java EE",
            "Spring Boot",
            "Spring Framework",
            "Angular",
            "Oracle SQL",
            "Docker",
            "Jenkins",
        ],
        slug: "endow",
        highlights: [
            "Sviluppo e manutenzione di applicazioni enterprise Java",
            "Integrazione di servizi REST e SOAP/WSDL",
            "Evoluzione di applicazioni Spring e Angular",
            "Utilizzo di Docker e Jenkins nei workflow di sviluppo e deployment",
        ],
    },
];