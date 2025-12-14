import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RegisterCapability } from '../../application/usecases/RegisterCapability';
import { ICapabilityRepository } from '../../domain/interfaces/ICapabilityRepository';

describe('RegisterCapability', () => {
    let useCase: RegisterCapability;
    let mockRepo: ICapabilityRepository;

    beforeEach(() => {
        mockRepo = {
            createListing: vi.fn(),
            searchListings: vi.fn(),
            getAllListings: vi.fn()
        };
        useCase = new RegisterCapability(mockRepo);
    });

    it('should register a valid capability', async () => {
        const input = {
            providerAgentId: 'agent-1',
            serviceName: 'Translation',
            description: 'Eng to Spa',
            tags: ['nlp'],
            pricePerRequest: 0.1,
            endpointUrl: 'http://api.com'
        };

        vi.mocked(mockRepo.createListing).mockResolvedValue({
            id: '1',
            ...input,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const result = await useCase.execute(input);
        expect(result.id).toBe('1');
        expect(mockRepo.createListing).toHaveBeenCalledWith(input);
    });

    it('should throw if missing required fields', async () => {
        await expect(useCase.execute({
            providerAgentId: 'agent-1',
            serviceName: '',
            description: 'desc',
            tags: [],
            pricePerRequest: 0,
            endpointUrl: ''
        })).rejects.toThrow('Service name and endpoint URL are required');
    });
});
