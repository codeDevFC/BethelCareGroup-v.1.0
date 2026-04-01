"use client";
import Link from 'next/link';
import { ArrowLeft, Home, BookOpen } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';

interface PageNavigationProps {
  backText?: string;
  backHref?: string;
  showHome?: boolean;
  showStudyHub?: boolean;
  customClass?: string;
}

export default function PageNavigation({ 
  backText = "Back",
  backHref,
  showHome = true,
  showStudyHub = true,
  customClass = ""
}: PageNavigationProps) {
  const params = useParams();
  const pathname = usePathname();
  const groupId = params?.groupId || "1";

  const getBackHref = () => {
    if (backHref) return backHref;
    if (pathname.includes('/study-hub/') && !pathname.match(/\/study-hub\/?$/)) {
      const segments = pathname.split('/');
      const sectionIndex = segments.indexOf('study-hub') + 1;
      const currentSection = segments[sectionIndex];
      if (currentSection && !segments[sectionIndex + 1]) {
        return `/group/${groupId}/study-hub/${currentSection}`;
      }
      return `/group/${groupId}/study-hub`;
    }
    return `/group/${groupId}`;
  };

  return (
    <div className={`flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100 ${customClass}`}>
      <Link href={getBackHref()} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-black uppercase tracking-widest text-[10px] transition-colors">
        <ArrowLeft size={14} /> {backText}
      </Link>
      <div className="flex items-center gap-3">
        {showStudyHub && (
          <Link href={`/group/${groupId}/study-hub`} className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-black uppercase tracking-widest text-[10px] transition-colors">
            <BookOpen size={14} /> Study Hub
          </Link>
        )}
        {showHome && (
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-black uppercase tracking-widest text-[10px] transition-colors">
            <Home size={14} /> Home
          </Link>
        )}
      </div>
    </div>
  );
}
