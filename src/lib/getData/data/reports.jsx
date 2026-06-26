import { serverFetch } from "@/lib/myApi/core/ferch"

export const getReports = async () => {
    return serverFetch('/api/reports')
}