import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import {
  UPDATE_TENANT_ATTRIBUTES,
  ADD_TENANT_ATTRIBUTES,
} from "@/lib/gql/endpoint";
import type {
  UserAttributeUpdateInput,
  UserAttributeInput,
} from "@/lib/data-type";

type OperationStatus = {
  loading: boolean;
  error?: Error;
};

export const useTenantAttributes = () => {
  const { user } = useAuthStore((state) => state);
  const [updateStatus, setUpdateStatus] = useState<OperationStatus>({
    loading: false,
  });
  const [createStatus, setCreateStatus] = useState<OperationStatus>({
    loading: false,
  });

  const [updateMutation] = useMutation(UPDATE_TENANT_ATTRIBUTES);
  const [createMutation] = useMutation(ADD_TENANT_ATTRIBUTES);

  const updateTenantAttr = async (updates: UserAttributeUpdateInput[]) => {
    setUpdateStatus({ loading: true });
    try {
      const { data } = await updateMutation({
        variables: { attributeUpdateInput: updates }, // Fixed typo from 'attibute' to 'attribute'
      });
      return data;
    } catch (error) {
      setUpdateStatus({ loading: false, error: error as Error });
      throw error;
    } finally {
      setUpdateStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const createTenantAttr = async (attributes: UserAttributeInput[]) => {
    if (!user) throw new Error("User not authenticated");

    setCreateStatus({ loading: true });
    try {
      const { data } = await createMutation({
        variables: {
          tenantId: user.id,
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
    updateTenantAttr,
    createTenantAttr,
    statusTenantAttr: {
      update: updateStatus,
      create: createStatus,
      anyLoading: updateStatus.loading || createStatus.loading,
    },
  };
};
