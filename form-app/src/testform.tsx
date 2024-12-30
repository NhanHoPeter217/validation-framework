import { useEffect } from 'react';
import { v, useForm } from 'validation-framework';

export default function TestForm() {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    alert('Submit successfully');
  };

  useEffect(() => {
    if (Object.keys(errors).length) alert('Form has errors' + JSON.stringify(errors));
  }, [errors]);

  return (
    <div>
      <h1 className="text-2xl mb-3">Thao tác thiết lập valid tự động thông qua khai báo ràng buộc dữ liệu</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="number" placeholder="Age" {...register('age', v.number().lte(10))} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
