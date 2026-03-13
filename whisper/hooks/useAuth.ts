import { useApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useAuthCallBack = () => {
    const api = useApi();

    return useMutation({
        mutationFn: async () => {
            const { data } = await api.post("api/v1/auth/callback")
            return data
        }
    })
}