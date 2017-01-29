# Running in docker

Running outside of docker is still the best way for developing. The main reason is that it is 
quicker, however running in docker has it's advantages when you don't want/can't to install any 
of the dependencies.

#### Start the API
```bash
docker-compose up -d api
```

#### Stopping
```bash
docker-compose down
```

#### To run tests and coverage inside a container
```bash
docker-compose test
```
