/**
 * OpenAPI JSON Endpoint for Agent Capability Broker
 * GET /api/openapi.json
 */

import { NextResponse } from 'next/server';

export async function GET() {
    const spec = {
        openapi: '3.0.3',
        info: {
            title: 'Agent Capability Broker API',
            version: '1.0.0',
            description: 'Dynamic agent discovery, service registration, and capability listing for the agent ecosystem.'
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Local development' }
        ],
        paths: {
            '/api/registry/register': {
                post: {
                    summary: 'Register an agent capability',
                    operationId: 'registerCapability',
                    tags: ['Registry'],
                    responses: { '200': { description: 'Registration confirmed' } }
                }
            },
            '/api/registry/search': {
                get: {
                    summary: 'Search for agent capabilities',
                    operationId: 'searchCapabilities',
                    tags: ['Registry'],
                    responses: { '200': { description: 'List of matching capabilities' } }
                }
            }
        }
    };

    return NextResponse.json(spec, {
        headers: { 'Content-Type': 'application/json' }
    });
}
