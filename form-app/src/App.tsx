import { Input, v } from 'validation-framework';

function App() {
  const schema = v.number().lte(10);
  // return <div>Hello wworld</div>;
  return <Input validator={schema} type="number" onChange={(value) => console.log(value)} />;
}

export default App;
