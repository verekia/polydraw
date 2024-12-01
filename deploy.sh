docker buildx build --platform linux/arm64 --load -t verekia/polydraw .
docker save -o /tmp/polydraw.tar verekia/polydraw
scp /tmp/polydraw.tar midgar:/tmp/
ssh midgar docker load --input /tmp/polydraw.tar
ssh midgar docker compose up -d polydraw
