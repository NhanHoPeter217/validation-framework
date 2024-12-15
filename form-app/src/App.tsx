import { Toaster } from 'validation-framework';

import Form from './Form';
import 'validation-framework/dist/bundle.css';

function App() {
  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center">
      <div>
        <Form />
      </div>
      <Toaster />
    </main>
  );
}

export default App;
