import { notFound } from 'next/navigation';

import { parseIdParam } from '@/utils/parseIdParam';

import InviteClient from './_components/InviteClient';

type InvitePageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ code?: string }>;
};

async function InvitePage({ params, searchParams }: InvitePageProps) {
  const { id } = await params;
  const { code } = await searchParams;
  const tournamentId = parseIdParam(id);

  if (tournamentId === null) notFound();

  return <InviteClient tournamentId={tournamentId} inviteCode={code ?? ''} />;
}

export default InvitePage;
