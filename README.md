# require-extension-pipeline
Use multiple require.extensions callbacks per filetype. Like a boss.


## Usage
Include this library at the root of your project:

```
require('require-extension-pipeline')();
```


## Configuring
The require extension pipeline will automatically add pipelining for `.js`, `.node`, and `.json` files.
If you want to add other types of file extensions, pass an array of extensions when initializing: 

```
require('require-extension-pipeline')(['es6']);
```


## Examples
Check the `./examples` directory for examples of how to add multiple require.extensions transforms for `.js` and `.json` files. To run the examples, clone this repo, cd into the directory and type:

```
node example
```

## Notes
This is not suitable for libraries and should be included at the root of the project.
