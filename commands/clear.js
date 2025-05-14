import fs from 'fs';
import path from 'path';

function clearFile(directoryPath, fileName) {
  const filePath = path.join(directoryPath, fileName);

  try {
    console.log('\nCleaning files... \n'.cyan.bold);
    fs.writeFileSync(filePath, htmlContent(), 'utf8');
    console.log('✅ All files has been successfully cleaned!'.green.bold);
  } catch (e) {
    console.error(`❌ Error clearing file ${fileName}: ${e}\n`.red.bold);
  }
}

function htmlContent() {
  return `<h1>Hello, welcome to your new Project!</h1>`;
}

function clearProject(projectName) {
  const directoryPath = path.join(process.cwd(), projectName, 'src', 'app');

  try {
    if (!fs.existsSync(directoryPath)) {
      console.error(`Directory not found: ${directoryPath}`.red.bold);
      return false;
    }

    clearFile(directoryPath, 'app.component.html');

    return true;
  } catch (e) {
    console.error(`Error accessing project directory: ${e}`.red.bold);
    return false;
  }
}

export { clearProject };
