import { NextResponse } from 'next/server';
import { FindAgents } from '@/application/usecases/FindAgents';
import { PostgresCapabilityRepository } from '@/infrastructure/repositories/PostgresCapabilityRepository';

const repo = new PostgresCapabilityRepository();
const useCase = new FindAgents(repo);

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const tags = searchParams.get('tags')?.split(',') || [];

    try {
        const results = await useCase.execute(q, tags);
        return NextResponse.json({ listings: results });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
