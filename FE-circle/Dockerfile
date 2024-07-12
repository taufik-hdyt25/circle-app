FROM node:16-alpine
WORKDIR /app
COPY package*.json .
RUN npm i
COPY . .
CMD ["npm", "run", "dev"]


# =========================================
# how to run docker react
# buat file Dockerfile & .dockerignore
# isi pada Dockerfile sesuai yang di atas dan .dockerignore sesuai yang sudah di terapan
# buat images docker contoh:
# docker build -t react-docker/threads:1.0.0 .
#  untuk menjalankannya ==============================
# port 3002 menunjukan port custom dan 3000 port default app dan sebelahnya adalah nama images:dan tagnya
#  docker run -d -p 3002:3000 react-docker/threads:1.0.0