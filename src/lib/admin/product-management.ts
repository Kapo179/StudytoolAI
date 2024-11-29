export interface ProductStatus {
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: Date;
  notes?: string;
}

export interface AdminProduct {
  id: string;
  status: ProductStatus;
  featured: boolean;
  reportCount: number;
  lastModified: Date;
  createdAt: Date;
}

export class ProductManager {
  static async approveProduct(productId: string): Promise<void> {
    // Implementation will be added when database is set up
    console.log('Approving product:', productId);
  }

  static async toggleFeatured(productId: string): Promise<void> {
    // Implementation will be added when database is set up
    console.log('Toggling featured status for:', productId);
  }

  static async moderateProduct(
    productId: string,
    action: 'warn' | 'remove'
  ): Promise<void> {
    // Implementation will be added when database is set up
    console.log('Moderating product:', productId, 'action:', action);
  }
}