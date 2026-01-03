import { describe, it, expect, vi } from 'vitest';
import { FindAgents } from '../../application/usecases/FindAgents';
import { ICapabilityRepository } from '../../lib/capability-broker/domain/ports/ICapabilityRepository';

describe('FindAgents', () => {
    it('should return matching listings', async () => {
        const mockRepo: ICapabilityRepository = {
            createListing: vi.fn(),
            searchListings: vi.fn().mockResolvedValue([{
                id: '1',
                providerAgentId: 'a1',
                serviceName: 'NLP',
                description: 'text',
                tags: ['nlp'],
                pricePerRequest: 0,
                endpointUrl: 'url',
                createdAt: new Date(),
                updatedAt: new Date()
            }]),
            getAllListings: vi.fn()
        };

        const useCase = new FindAgents(mockRepo);
        const results = await useCase.execute('nlp', ['nlp']);

        expect(results).toHaveLength(1);
        expect(mockRepo.searchListings).toHaveBeenCalledWith('nlp', ['nlp']);
    });
});
