FROM node:18
WORKDIR /screen-recorder
COPY . .
RUN npm install -g pnpm
RUN pnpm install
ENV BODY_SIZE_LIMIT=100000000
RUN pnpm i @sveltejs/adapter-node
RUN sed -i 's/adapter-auto/adapter-node/g' svelte.config.js
RUN pnpm run build
EXPOSE 3000
CMD ["node", "build/index.js"]