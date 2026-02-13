"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBusinesses, deleteBusiness, type Business } from "@/actions/business";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { BusinessForm } from "./BusinessForm";

export function BusinessList() {
  const queryClient = useQueryClient();
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Fetch businesses
  const { data, isLoading, error } = useQuery({
    queryKey: ["businesses"],
    queryFn: async () => {
      const result = await getBusinesses();
      if (!result.success) {
        throw new Error(result.message || "Failed to fetch businesses");
      }
      return result.businesses || [];
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteBusiness,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
      setDeleteConfirmId(null);
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (business: Business) => {
    setEditingBusiness(business);
  };

  const handleCancelEdit = () => {
    setEditingBusiness(null);
  };

  const handleSaveSuccess = () => {
    setEditingBusiness(null);
    queryClient.invalidateQueries({ queryKey: ["businesses"] });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading businesses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-red-600">
          Error loading businesses: {error.message}
        </div>
      </div>
    );
  }

  if (editingBusiness) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Edit Business</h2>
          <Button
            onClick={handleCancelEdit}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </Button>
        </div>
        <BusinessForm
          business={editingBusiness}
          onSuccess={handleSaveSuccess}
        />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">No businesses found. Create your first business!</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {data.map((business) => (
          <div
            key={business.id}
            className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-red-600 transition-colors"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              {/* Business Info */}
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {business.businessName}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {business.businessType} • {business.services.charAt(0).toUpperCase() + business.services.slice(1)}
                    </p>
                  </div>
                </div>

                {business.businessDescription && (
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {business.businessDescription}
                  </p>
                )}

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {business.serviceHours && (
                    <div>
                      <span className="font-medium">Hours:</span> {business.serviceHours}
                    </div>
                  )}
                  {business.serviceAreas && (
                    <div>
                      <span className="font-medium">Areas:</span> {business.serviceAreas}
                    </div>
                  )}
                </div>

                {/* Images */}
                {business.images && business.images.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {business.images.slice(0, 3).map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`${business.businessName} ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
                      />
                    ))}
                    {business.images.length > 3 && (
                      <div className="w-20 h-20 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center text-xs text-gray-500">
                        +{business.images.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 lg:flex-col">
                <Button
                  onClick={() => handleEdit(business)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Edit
                </Button>
                {deleteConfirmId === business.id ? (
                  <div className="flex gap-2 lg:flex-col">
                    <Button
                      onClick={() => handleDelete(business.id)}
                      disabled={deleteMutation.isPending}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
                    >
                      {deleteMutation.isPending ? "Deleting..." : "Confirm"}
                    </Button>
                    <Button
                      onClick={() => setDeleteConfirmId(null)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setDeleteConfirmId(business.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

