import fs from 'fs';
import path from 'path';

function clearFile(directoryPath, fileName, content) {
  const filePath = path.join(directoryPath, fileName);

  try {
    fs.writeFileSync(filePath, content, 'utf8');
  } catch (e) {
    console.error(`❌ Error clearing file ${fileName}: ${e}\n`.red.bold);
  }
}

function clearProject(projectName) {
  const directoryPath = path.join(process.cwd(), projectName, 'src', 'app');

  try {
    if (!fs.existsSync(directoryPath)) {
      console.error(`Directory not found: ${directoryPath}`.red.bold);
      return false;
    }
    console.log('\nCleaning files... \n'.cyan.bold);

    clearFile(directoryPath, 'app.component.spec.ts', specContent());
    clearFile(directoryPath, 'app.component.html', htmlContent());
    clearFile(directoryPath, 'app.component.ts', componentContent());
    clearFile(directoryPath, 'app-routing.module.ts', routeContent());

    console.log('✅ All files has been successfully cleaned!'.green.bold);
    return true;
  } catch (e) {
    console.error(`Error accessing project directory: ${e}`.red.bold);
    return false;
  }
}

function componentContent() {
  return `import { Component } from '@angular/core';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false,
    styleUrl: './app.component.css'
  })
  export class AppComponent {}
`;
}

function htmlContent() {
  return `<h1>Hello, welcome to your new Project!</h1>`;
}

function routeContent() {
  return `import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { AppComponent } from './app.component';

  const routes: Routes = [
    {
      path: '',
      component: AppComponent,
    },
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
`;
}

function specContent() {
  return `import { TestBed } from '@angular/core/testing';
  import { RouterModule } from '@angular/router';
  import { AppComponent } from './app.component';

  describe('AppComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          RouterModule.forRoot([])
        ],
        declarations: [
          AppComponent
        ],
      }).compileComponents();
    });

    it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });
  });
`;
}

export { clearProject };
