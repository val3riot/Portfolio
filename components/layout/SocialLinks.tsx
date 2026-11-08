import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { SOCIAL_LINKS } from '@/constants/globals';

export default function SocialLinks({ className }: { className?: string }) {
    return (
        <>
            <Link href={SOCIAL_LINKS.github} className={className} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} />
            </Link>
            <Link href={SOCIAL_LINKS.linkedin} className={className} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
            </Link>
        </>
    );
}
