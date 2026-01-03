import { ServiceListing, CreateListingInput } from '../entities/ServiceListing';

export interface ICapabilityRepository {
    createListing(listing: CreateListingInput): Promise<ServiceListing>;
    searchListings(query: string, tags?: string[]): Promise<ServiceListing[]>;
    getAllListings(): Promise<ServiceListing[]>;
}
