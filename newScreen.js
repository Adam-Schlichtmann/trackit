const fs = require("fs");

if (process.argv.length !== 4) {
  console.log(
    "USAGE is node newScreen.js path/to/desired/location newFolderName"
  );
}

const newPath = `${process.argv[2]}/${process.argv[3]}`;
if (fs.existsSync(process.argv[2])) {
  fs.mkdir(newPath, () => {});
  fs.writeFile(
    `${newPath}/index.ts`,
    `export { default } from './${process.argv[3]}'`,
    () => {}
  );
  fs.writeFile(
    `${newPath}/${process.argv[3]}.tsx`,
    `import { Text, View } from 'react-native'


    const ${process.argv[3]} = () => {

      return (
        <View>
          <Text>${process.argv[3]}</Text>
        </View>
      )
    }
    
    export default ${process.argv[3]}`,
    () => {}
  );
}
