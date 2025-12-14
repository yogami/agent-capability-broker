import { ICapabilityRepository } from '../../domain/interfaces/ICapabilityRepository';
import { ServiceListing } from '../../domain/entities/ServiceListing';

export class FindAgents {
    constructor(private repository: ICapabilityRepository) { }

    async execute(query: string, tags?: string[]): Promise<ServiceListing[]> {
        return this.repository.searchListings(query, tags);
    }
}
