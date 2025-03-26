import { AttributeUpdateInput, TenantAttributeInput } from "@/lib/data-type";
import {
  UPDATE_TENANT_ATTRIBUTES,
  ADD_TENANT_ATTRIBUTES,
} from "@/lib/gql/endpoint";
import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@apollo/client";
import { useState } from "react";

export const useTenantAttributes = () => {
  const { user } = useAuthStore((state) => state);
  const [loading, setLoading] = useState(false);
  const [loadingForCreate, setLoadingCreate] = useState(false);
  const [loadingForUpdate, setLoadingUpdate] = useState(false);

  const [updateTenantAttributes] = useMutation(UPDATE_TENANT_ATTRIBUTES, {
    onCompleted: (data) => {
      console.log(data);
      setLoadingUpdate(false);
      if (!loadingForCreate) {
        setLoading(false);
      }
    },
    onError: (err) => {
      console.log(err);
      setLoadingUpdate(false);

      if (!loadingForCreate) {
        setLoading(false);
      }
    },
  });

  const [createTenantAttributes] = useMutation(ADD_TENANT_ATTRIBUTES, {
    onCompleted: (data) => {
      console.log(data);
      setLoadingCreate(false);

      if (!loadingForUpdate) {
        setLoading(false);
      }
    },
    onError: (err) => {
      console.log(err);
      setLoadingCreate(false);

      if (!loadingForUpdate) {
        setLoading(false);
      }
    },
  });

  const updateTenantAttr = async (updates: AttributeUpdateInput[]) => {
    setLoading(true);
    setLoadingUpdate(true);
    await updateTenantAttributes({
      variables: { attibuteUpdateInput: updates },
    });
  };

  const createTenantAttr = async (attributes: TenantAttributeInput[]) => {
    if (user) {
      setLoading(true);
      setLoadingCreate(true);
      createTenantAttributes({
        variables: {
          tenantId: user.id,
          attributesInput: attributes,
        },
      });
    }
  };

  return { loading, updateTenantAttr, createTenantAttr };
};
