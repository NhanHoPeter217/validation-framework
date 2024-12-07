// import { Input, v } from 'validation-framework';
// import './index.css';

// function App() {
//   const string = v.string().min(3).max(50).required();
//   const email = v.string().email().required();
//   const number = v.number().gt(0).lt(100).required();
//   const dob = v.date().max(new Date()).required();

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log('Form submitted');
//   };

//   return (
//     <form className="container" onSubmit={handleSubmit}>
//       <h2>User Information Form</h2>
//       <Input validator={string} label="Name" type="string" onChange={(value: any) => console.log(value)} />
//       <Input validator={email} label="Email" type="email" onChange={(value: any) => console.log(value)} />
//       <Input validator={number} label="Age" type="number" onChange={(value: any) => console.log(value)} />
//       <Input validator={dob} label="Date of Birth" type="date" onChange={(value: any) => console.log(value)} />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default App;

import React from 'react';
import { useForm } from 'validation-framework';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{ name: string; email: string; age: number }>({
    defaultValues: {
      name: '',
      email: '',
      age: null
    }
  });

  const onSubmit = (data: { name: string; email: string; age: number }) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register('name', { required: 'Name is required' })} />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label>Email</label>
        <input
          {...register('email', { required: 'Email is required', pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>Age</label>
        <input type="number" {...register('age', { min: 18, max: 99 })} />
        {errors.age && <span>{errors.age}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
