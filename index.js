async function handleRequest(request) {
  const { pathname, searchParams } = new URL(request.url)

  if (pathname === '/oembed') {
    return new Response(JSON.stringify({
      type: "photo",
      author_name: searchParams.get('author')
    }), {
      headers: {
        'content-type': 'application/json'
      },
    });
  }

  const title = searchParams.get('title');
  const author = searchParams.get('author');
  const color = searchParams.get('color');

  return new Response(
    `<!DOCTYPE html>
<html prefix="og: http://ogp.me/ns#">
<head>
  ${title ? `<meta property="og:title" content="${title}">` : ''}
  <meta property="theme-color" content="#${color}">
  <meta content="https://img.rauf.wtf/1x1_original_fdhufkgdyfgsdjfs.png" property="og:image">
  ${author ? `<link type="application/json+oembed" href="https://embed.almeidx.workers.dev/oembed?author=${author}">` : ''}
</head>
<body>
  <h1>Hello World</h1>
  <p>This worker was made by <a href="https://github.com/almeidx">Almeida</a>.</p>
</body>
</html>`, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  });
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event.request));
});
