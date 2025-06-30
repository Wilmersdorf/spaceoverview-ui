source config.sh
docker exec -u mathuser -it $IMAGE_NAME bash -c '
. /home/mathuser/.nvm/nvm.sh
cd /home/mathuser/dev/prettier
npm install
'
