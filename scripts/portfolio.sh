# Start App
docker run -d \
  --name portfolio-app \
  -e REACT_APP_SERVER_URL=https://fairhursts.net \
  -e REACT_APP_SERVER_API=https://api.fairhursts.net/graphql \
  -e REACT_APP_SERVER_WS=wss://api.fairhursts.net/graphql \
  -p 80:80 \
  -p 443:443 \
  -v ~/portfolio/html:/usr/share/nginx/html \
  portfolio:latest
