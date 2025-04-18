import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import {
  UPDATE_LANDLORD_ATTRIBUTES,
  ADD_LANDLORD_ATTRIBUTES,
} from "@/lib/gql/endpoint";
import type { AttributeUpdateInput, UserAttributeInput } from "@/lib/data-type";

type OperationStatus = {
  loading: boolean;
  error?: Error;
};

export const useLandlordAttributes = () => {
  const { user } = useAuthStore((state) => state);
  const [updateStatus, setUpdateStatus] = useState<OperationStatus>({
    loading: false,
  });
  const [createStatus, setCreateStatus] = useState<OperationStatus>({
    loading: false,
  });

  const [updateMutation] = useMutation(UPDATE_LANDLORD_ATTRIBUTES);
  const [createMutation] = useMutation(ADD_LANDLORD_ATTRIBUTES);

  const updateLandlordAttr = async (updates: AttributeUpdateInput[]) => {
    setUpdateStatus({ loading: true });
    try {
      const { data } = await updateMutation({
        variables: { attributeUpdateInput: updates }, // Fixed typo
      });
      return data;
    } catch (error) {
      setUpdateStatus({ loading: false, error: error as Error });
      throw error; // Re-throw for component-level handling
    } finally {
      setUpdateStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const createLandlordAttr = async (attributes: UserAttributeInput[]) => {
    if (!user) throw new Error("User not authenticated");

    setCreateStatus({ loading: true });
    try {
      const { data } = await createMutation({
        variables: {
          landlordId: user.id, // Consistent casing
          attributesInput: attributes,
        },
      });
      return data;
    } catch (error) {
      setCreateStatus({ loading: false, error: error as Error });
      throw error;
    } finally {
      setCreateStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  return {
    updateLandlordAttr,
    createLandlordAttr,
    statusLandlordAttr: {
      update: updateStatus,
      create: createStatus,
      anyLoading: updateStatus.loading || createStatus.loading,
    },
  };
};
