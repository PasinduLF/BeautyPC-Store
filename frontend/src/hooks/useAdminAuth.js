import { useAdminAuth } from '../context/AdminAuthContext';

export default function useAdminAuthHook() {
  return useAdminAuth();
}

