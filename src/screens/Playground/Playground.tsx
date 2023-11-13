import { useForm } from 'react-hook-form';

import CustomInput from '~components/CustomInput/CustomInput';

interface Form {
    test: string;
    test_two: number;
}

function Playground() {
    const {
        control,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<Form>();

    const onSubmit = (data: Form) => {
        alert(JSON.stringify(data));
    };

    return (
        <div>
            <form action="" noValidate onSubmit={handleSubmit(onSubmit)}>
                <CustomInput
                    control={control}
                    label="Text"
                    name="test"
                    required
                    defaultValue=""
                    type="text"
                    error={errors.test}
                />
                <CustomInput
                    control={control}
                    label="Number"
                    name="test_two"
                    required
                    defaultValue={0}
                    type="number"
                    error={errors.test_two}
                />
                <button type="submit">Submit</button>
            </form>

            <h2>Text output</h2>
            <p>
                {watch('test')} || {typeof watch('test')}
            </p>
            <br />
            <h3>Number output</h3>
            <p>
                {watch('test_two')} || {typeof watch('test_two')}
            </p>
        </div>
    );
}
export default Playground;
