# Editing the API

Swagger Editor lets you edit Swagger API specifications in YAML inside your browser and to preview 
documentations in real time. Valid Swagger JSON descriptions can then be generated and used with the 
full Swagger tooling (code generation, documentation, etc).


## Running the Swagger Editor
 In a terminal from the root of the project

```bash
docker-compose up editor
```

Open http://localhost:8080/#/ in a browser to view the Swagger Editor.

Make your changes

Close the browser

Stop the editor server  by pressing ```ctrl + c```

The ```swagger.yaml``` file will be updated

Commit the swagger file when happy
