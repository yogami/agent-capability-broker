export interface ServiceListing {
    id: string;
    providerAgentId: string;
    serviceName: string;
    description: string;
    tags: string[];
    pricePerRequest: number;
    endpointUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateListingInput = Omit<ServiceListing, 'id' | 'createdAt' | 'updatedAt'>;
