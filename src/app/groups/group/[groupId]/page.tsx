"use client";
import { useParams } from 'next/navigation';
import { use } from "react";
import Link from 'next/link';

export default function GroupPage({ params }: { params: Promise<{ groupId: string }> }) {
  const resolvedParams = use(params);
  const groupId = resolvedParams.groupId;
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Group Dashboard</h1>
        <p className="text-gray-600 mb-4">Group ID: {groupId}</p>
        <Link href={`/group/${groupId}/study-hub`} className="text-blue-600 hover:underline">
          Go to Study Hub →
        </Link>
      </div>
    </div>
  );
}
