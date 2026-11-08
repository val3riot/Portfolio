export const BRAND = {
    logo: "<VT/>",
    name: "Valerio Tolli",
    email: "info@tollivalerio.com",
    description: "Java Backend Developer",
    url: "https://tollivalerio.com",
    icons: {
        icon: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='black' rx='20'/><text y='50%' x='50%' fontWeight='bold' fontSize='45' fill='white' fontFamily='monospace' dy='.3em' text-anchor='middle'>%3CVT/%3E</text></svg>`,
    },
};

export const NAV_LINKS = [
    { name: "Home", link: "/" },
    { name: "Progetti", link: "/progetti" },
    { name: "Esperienze", link: "/lavoro" },
    { name: "Skills", link: "/about/skills" },
] as const;

export const SOCIAL_LINKS = {
    github: "https://github.com/val3riot",
    linkedin: "https://www.linkedin.com/in/valeriotolli",
};
