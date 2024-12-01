import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
import { SAMPLE_PRODUCTS } from '@/lib/constants';
import { ProductCard } from '@/components/product/product-card';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export function SavedProducts() {
  const { user } = useAuth();
  const [savedProducts, setSavedProducts] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const fetchSavedProducts = async () => {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const savedProductIds = userDoc.data().savedProducts || [];
          const savedProducts = SAMPLE_PRODUCTS.filter(product => savedProductIds.includes(product.id));
          setSavedProducts(savedProducts);
        }
      };
      fetchSavedProducts();
    }
  }, [user]);

  if (!user) {
    return <div>Please log in to view your saved products.</div>;
  }

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      <h1 className="text-2xl font-bold">Saved Products</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {savedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}