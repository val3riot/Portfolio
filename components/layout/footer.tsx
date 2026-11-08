import { BRAND } from '@/constants/globals';
import SocialLinks from './SocialLinks';

export default function Footer() {
    return (
        <footer className="mt-20 pt-10 border-t border-dashed border-[var(--border)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="flex flex-col gap-1">
                    <span className="text-muted text-[10px] uppercase">Email</span>
                    <a href={`mailto:${BRAND.email}`} className="hover:underline font-mono">
                        {BRAND.email}
                    </a>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-muted text-[10px] uppercase">Social</span>
                    <div className="flex gap-4">
                        <SocialLinks />
                    </div>
                </div>
            </div>
        </footer>
    );
}
