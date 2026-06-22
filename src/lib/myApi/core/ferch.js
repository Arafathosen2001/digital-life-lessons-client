const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    
     return res.json();
}