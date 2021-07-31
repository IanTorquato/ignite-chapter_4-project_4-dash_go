/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
import faker from 'faker';
import { ActiveModelSerializer, createServer, Factory, Model, Response } from 'miragejs';

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },

    // eslint-disable-next-line @typescript-eslint/no-shadow
    seeds(server) {
      server.createList('user', 200);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users', (schema, request) => {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all('user').length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = schema.all('user').models.slice(pageStart, pageEnd);

        // console.log(users.models);

        return new Response(200, { 'x-total-count': String(total) }, { users });
      });

      this.get('/users/:id');

      this.post('/users');

      this.namespace = '';

      this.passthrough();
    },
  });

  return server;
}
