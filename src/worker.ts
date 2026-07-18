const CANONICAL_HOST = 'voiceversehub.com';

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === `www.${CANONICAL_HOST}`) {
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.href, 301);
    }

    if (url.pathname !== '/' && !url.pathname.endsWith('/') && !url.pathname.includes('.')) {
      url.pathname = url.pathname + '/';
      return Response.redirect(url.href, 301);
    }

    return new Response('Not Found', { status: 404 });
  },
};
