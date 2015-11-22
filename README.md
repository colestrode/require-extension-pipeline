# require-extension-pipeline
Use multiple require.extensions callbacks per filetype. Like a boss.


## Usage
Include this library at the root of your project:

```
require('require-extension-pipeline`)();
```


## Configuring
The require extension pipeline will automatically add pipelining for `.js`, `.json`, and `.node` extensions.
If you want to add other types of file extensions, pass an array of extensions when initializing: 

```
require('require-extension-pipeline`)(['es6`]);
```


## Notes
This is not suitable for libraries and should be included at the root of the project.
