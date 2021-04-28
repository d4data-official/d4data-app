# How to setup dev environment

## Link local `d4data-archive-lib` package

1. Go to your local **d4data-archive-lib** project folder
2. Update the project
3. Run `yarn build`
4. Run `yarn link`
5. Go to your local **d4data-app** project folder
6. Run ` yarn link d4data-archive-lib`

Done! :tada:

⚠ When there are new changes to **d4data-archive-lib** think to update the project and run `yarn build` to update the lib in **d4data-app** project.
