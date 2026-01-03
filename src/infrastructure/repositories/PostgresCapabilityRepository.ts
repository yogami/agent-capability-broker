import prisma from '../db';
import { ICapabilityRepository } from '../../lib/capability-broker/domain/ports/ICapabilityRepository';
import { CreateListingInput, ServiceListing } from '../../lib/capability-broker/domain/entities/ServiceListing';

export class PostgresCapabilityRepository implements ICapabilityRepository {
    async createListing(input: CreateListingInput): Promise<ServiceListing> {
        const listing = await prisma.serviceListing.create({
            data: {
                providerAgentId: input.providerAgentId,
                serviceName: input.serviceName,
                description: input.description,
                tags: input.tags,
                pricePerRequest: input.pricePerRequest,
                endpointUrl: input.endpointUrl
            }
        });
        return this.mapToEntity(listing);
    }

    async searchListings(query: string, tags?: string[]): Promise<ServiceListing[]> {
        const where: any = {};

        if (query) {
            where.OR = [
                { serviceName: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } }
            ];
        }

        if (tags && tags.length > 0) {
            where.tags = { hasSome: tags };
        }

        const listings = await prisma.serviceListing.findMany({ where });
        return listings.map(this.mapToEntity);
    }

    async getAllListings(): Promise<ServiceListing[]> {
        const listings = await prisma.serviceListing.findMany();
        return listings.map(this.mapToEntity);
    }

    private mapToEntity(dbItem: any): ServiceListing {
        return {
            id: dbItem.id,
            providerAgentId: dbItem.providerAgentId,
            serviceName: dbItem.serviceName,
            description: dbItem.description,
            tags: dbItem.tags,
            pricePerRequest: dbItem.pricePerRequest,
            endpointUrl: dbItem.endpointUrl,
            createdAt: dbItem.createdAt,
            updatedAt: dbItem.updatedAt
        };
    }
}
