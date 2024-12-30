import { Toaster } from 'validation-framework';

import 'validation-framework/dist/bundle.css';
import TestForm from './testform';
import BasicSchemaValidation from './basic-form';

function App() {
  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="container">
        <BasicSchemaValidation />
      </div>
      <Toaster />
    </main>
  );
}

export default App;
