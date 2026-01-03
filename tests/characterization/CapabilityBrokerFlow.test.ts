import { describe, it, expect } from 'vitest';
import { RegisterCapability } from '../../src/lib/capability-broker/application/usecases/RegisterCapability';
import { FindAgents } from '../../src/lib/capability-broker/application/usecases/FindAgents';
import { ICapabilityRepository } from '../../src/lib/capability-broker/domain/ports/ICapabilityRepository';
import { ServiceListing } from '../../src/lib/capability-broker/domain/entities/ServiceListing';

describe('Capability Broker Characterization', () => {
    it('should allow registering and searching for agent capabilities', async () => {
        // 1. Setup Mocks
        const listings: ServiceListing[] = [];
        const mockRepo: ICapabilityRepository = {
            createListing: async (input) => {
                const listing = { id: 'l-' + Math.random(), ...input, createdAt: new Date() };
                listings.push(listing);
                return listing;
            },
            getAllListings: async () => listings,
            searchListings: async (query, tags) => {
                return listings.filter(l =>
                    (l.serviceName.includes(query) || l.description.includes(query)) &&
                    (!tags || tags.every(t => l.tags.includes(t)))
                );
            }
        };

        const register = new RegisterCapability(mockRepo);
        const find = new FindAgents(mockRepo);

        // 2. Register Agents
        await register.execute({
            agentId: 'a1',
            serviceName: 'PDF Summarizer',
            description: 'Summarizes long documents',
            endpointUrl: 'http://a1/api',
            tags: ['text', 'summary']
        });

        await register.execute({
            agentId: 'a2',
            serviceName: 'Image Generator',
            description: 'Creates images from text',
            endpointUrl: 'http://a2/api',
            tags: ['image', 'creative']
        });

        // 3. Search - Query Match
        const results1 = await find.execute('Summarize');
        expect(results1).toHaveLength(1);
        expect(results1[0].serviceName).toBe('PDF Summarizer');

        // 4. Search - Tag Match
        const results2 = await find.execute('', ['image']);
        expect(results2).toHaveLength(1);
        expect(results2[0].serviceName).toBe('Image Generator');

        // 5. Search - No Match
        const results3 = await find.execute('Video');
        expect(results3).toHaveLength(0);
    });
});
