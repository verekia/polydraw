docker buildx build --platform linux/arm64 --load -t verekia/polydraw .
docker save verekia/polydraw | gzip > /tmp/polydraw.tar.gz
scp /tmp/polydraw.tar.gz midgar:/tmp/
ssh midgar docker load --input /tmp/polydraw.tar.gz
ssh midgar docker compose up -d polydraw
