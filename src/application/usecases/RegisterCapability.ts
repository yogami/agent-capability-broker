import { ICapabilityRepository } from '../../domain/interfaces/ICapabilityRepository';
import { CreateListingInput, ServiceListing } from '../../domain/entities/ServiceListing';

export class RegisterCapability {
    constructor(private repository: ICapabilityRepository) { }

    async execute(input: CreateListingInput): Promise<ServiceListing> {
        if (!input.serviceName || !input.endpointUrl) {
            throw new Error('Service name and endpoint URL are required');
        }
        return this.repository.createListing(input);
    }
}
