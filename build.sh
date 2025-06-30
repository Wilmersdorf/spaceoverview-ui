if [ -z "$BUILD" ]; then
    exit
fi

if [ ! "$(docker ps -a | grep $IMAGE_NAME)" ]; then
  docker stop -t 1 $IMAGE_NAME &>/dev/null
  docker rm $IMAGE_NAME &>/dev/null
  mkdir -p node_modules
  docker pull ubuntu:latest
  docker build -f Dockerfile -t $IMAGE_NAME .
  docker run --net=host --name $IMAGE_NAME \
      -v "$PWD/node_modules":/home/mathuser/dev/prettier/node_modules \
      -v "$PWD/public":/home/mathuser/dev/spaceoverview-ui/public \
      -v "$PWD/src":/home/mathuser/dev/spaceoverview-ui/src \
      -v "$PWD/prettier-package-lock.json":/home/mathuser/dev/prettier/package-lock.json \
      -v "$PWD/prettier-package.json":/home/mathuser/dev/prettier/package.json \
      -v "$PWD/eslint.config.js":/home/mathuser/dev/spaceoverview-ui/eslint.config.js \
      -v "$PWD/.gitignore":/home/mathuser/dev/spaceoverview-ui/.gitignore \
      -v "$PWD/.prettierrc":/home/mathuser/dev/spaceoverview-ui/.prettierrc \
      -v "$PWD/index.html":/home/mathuser/dev/spaceoverview-ui/index.html \
      -v "$PWD/package-lock.json":/home/mathuser/dev/spaceoverview-ui/package-lock.json \
      -v "$PWD/package.json":/home/mathuser/dev/spaceoverview-ui/package.json \
      -v "$PWD/vite.config.js":/home/mathuser/dev/spaceoverview-ui/vite.config.js \
    -d $IMAGE_NAME

  docker exec -u mathuser -it $IMAGE_NAME bash -c '
    . /home/mathuser/.nvm/nvm.sh
    cd /home/mathuser/dev/spaceoverview-ui
    npm install
  '
else
  docker start $IMAGE_NAME
fi

printf "export VITE_APP_DEVELOPMENT='$VITE_APP_DEVELOPMENT'" | docker exec -i $IMAGE_NAME bash -c "cat > /home/mathuser/dev/spaceoverview-ui/export.sh"

if [ $BUILD == "run_browser_dev" ]; then
  docker exec -u mathuser -w "/home/mathuser/dev/spaceoverview-ui" -it $IMAGE_NAME bash -c '
    . /home/mathuser/.nvm/nvm.sh
    . export.sh
    npm run dev
  '
elif [ $BUILD == "build_production" ]; then
  docker exec -u mathuser -w "/home/mathuser/dev/spaceoverview-ui" -it $IMAGE_NAME bash -c '
    . /home/mathuser/.nvm/nvm.sh
    . export.sh
    rm -rf /home/mathuser/dev/spaceoverview-ui/build
    npm run build
  '
  rm -rf build
  docker cp $IMAGE_NAME:/home/mathuser/dev/spaceoverview-ui/build .
  docker exec -u mathuser -w "/home/mathuser/dev/spaceoverview-ui" -it $IMAGE_NAME bash -c '
    rm -rf /home/mathuser/dev/spaceoverview-ui/build
  '
fi
