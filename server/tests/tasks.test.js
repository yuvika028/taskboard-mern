const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/app');

let mongod;
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
});
afterEach(async () => {
  await mongoose.connection.collection('tasks').deleteMany({});
});
afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('Tasks API', () => {
  it('creates and lists a task', async () => {
    const res = await request(app).post('/api/tasks').send({ title: 'Write tests' });
    expect(res.status).toBe(201);
    expect(res.body.status).toBe('todo');
    const list = await request(app).get('/api/tasks');
    expect(list.body).toHaveLength(1);
  });

  it('rejects a task without a title', async () => {
    const res = await request(app).post('/api/tasks').send({ description: 'x' });
    expect(res.status).toBe(400);
  });

  it('updates and deletes a task', async () => {
    const { body } = await request(app).post('/api/tasks').send({ title: 'Temp' });
    const upd = await request(app).put(`/api/tasks/${body._id}`).send({ status: 'done' });
    expect(upd.body.status).toBe('done');
    const del = await request(app).delete(`/api/tasks/${body._id}`);
    expect(del.status).toBe(204);
  });

  it('returns 400 for a malformed id', async () => {
    const res = await request(app).delete('/api/tasks/not-an-id');
    expect(res.status).toBe(400);
  });

  it('validates status and priority filters', async () => {
    const badStatus = await request(app).get('/api/tasks?status=blocked');
    const badPriority = await request(app).get('/api/tasks/priority=urgent');
    expect(badStatus.status).toBe(400);
    expect(badPriority.status).toBe(400);
  });

  it('returns 404 when updating or deleting a missing task', async () => {
    const id = new mongoose.Types.ObjectId().toString();
    const update = await request(app).put(`/api/tasks/${id}`).send({ status: 'done' });
    const remove = await request(app).delete(`/api/tasks/${id}`);
    expect(update.status).toBe(404);
    expect(remove.status).toBe(404);
  });

  it('filters by status, priority, and escaped title search', async () => {
    await request(app).post('/api/tasks').send({ title: 'Plan release', priority: 'high', status: 'todo' });
    await request(app).post('/api/tasks').send({ title: 'Plan review', priority: 'low', status: 'done' });
    const result = await request(app).get('/api/tasks?status=todo&priority=high&q=release');
    expect(result.status).toBe(200);
    expect(result.body).toHaveLength(1);
    expect(result.body[0].title).toBe('Plan release');
  });
});
