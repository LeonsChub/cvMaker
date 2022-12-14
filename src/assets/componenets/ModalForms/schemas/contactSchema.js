import * as yup from 'yup';

const contactSchema = yup.object().shape(
    {
        fName:
            yup.string()
            .required("Must provide your first name"),
        
        lName:
        yup.string()
        .required("Must provide your first name"),
        
        email:
            yup.string().email()
            .required('Must provide an email'),

        phoneNumber:
        yup.string()
        .matches(/^\d{10}$/).required('Please provide valid phone number')
    }
);


export default contactSchema;