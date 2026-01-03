import { NextResponse } from 'next/server';
import { RegisterCapability } from '@/lib/capability-broker/application/usecases/RegisterCapability';
import { PostgresCapabilityRepository } from '@/infrastructure/repositories/PostgresCapabilityRepository';

const repo = new PostgresCapabilityRepository();
const useCase = new RegisterCapability(repo);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = await useCase.execute({
            providerAgentId: body.providerAgentId,
            serviceName: body.serviceName,
            description: body.description,
            tags: body.tags || [],
            pricePerRequest: Number(body.pricePerRequest),
            endpointUrl: body.endpointUrl
        });
        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
