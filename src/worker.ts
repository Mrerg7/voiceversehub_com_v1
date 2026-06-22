export default {
  async fetch(_request: Request): Promise<Response> {
    // Static assets from [assets] directory are served automatically.
    // This fallback only triggers for non-existent paths.
    return new Response('Not Found', { status: 404 });
  },
};
