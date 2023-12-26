export const uniqueArray = <T = any>(array: T[]) : T[] => {
    return [...new Set<T>(array)]
}