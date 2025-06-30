FROM ubuntu:latest

RUN apt-get update && apt-get upgrade -y

RUN apt-get update && apt-get install curl -y

RUN apt-get update && apt-get install vim -y

RUN userdel -r ubuntu

RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN useradd -m -s /bin/bash -u 1000 mathuser
USER mathuser

COPY --chown=mathuser nvm_v0.40.3_install.sh /home/mathuser
RUN chmod +x /home/mathuser/nvm_v0.40.3_install.sh
RUN /home/mathuser/nvm_v0.40.3_install.sh
RUN . /home/mathuser/.nvm/nvm.sh && nvm install --lts

RUN mkdir -p /home/mathuser/dev/prettier
RUN touch /home/mathuser/dev/prettier/package-lock.json
RUN touch /home/mathuser/dev/prettier/package.json

RUN mkdir -p /home/mathuser/dev/spaceoverview-ui
RUN touch /home/mathuser/dev/spaceoverview-ui/eslint.config.js
RUN touch /home/mathuser/dev/spaceoverview-ui/.gitignore
RUN touch /home/mathuser/dev/spaceoverview-ui/.prettierrc
RUN touch /home/mathuser/dev/spaceoverview-ui/index.html
RUN touch /home/mathuser/dev/spaceoverview-ui/package-lock.json
RUN touch /home/mathuser/dev/spaceoverview-ui/package.json
RUN touch /home/mathuser/dev/spaceoverview-ui/vite.config.js

CMD ["tail", "-f", "/dev/null"]
