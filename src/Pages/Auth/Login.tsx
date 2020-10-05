import React, { Component } from 'react'
import {
    Box,
    Stack,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Text,
    Button,
    FormControl,
    FormErrorMessage,
} from "@chakra-ui/core";
import {Formik, FormikHelpers} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {withRouter, RouteComponentProps} from "react-router-dom";
import Alert from "../../Components/Shared/Alert";


interface FormInterface { username: string; password: string; }

class Login extends Component<RouteComponentProps> {

    handleSubmit = (values: FormInterface, actions: FormikHelpers<FormInterface>) => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/login`, values)
            .then((resp) => {
                const { id, username, bio, token, } = resp.data;
                sessionStorage.setItem(
                    "chakranime",
                    btoa( JSON.stringify({ id, username,  bio, token,}))
                );
                this.props.history.push("/admin/home")
            })
            .catch((err) => {
                console.log(err, err.response);
                Alert("error", "Login gagal!", "Password atau username salah!");
                actions.setSubmitting(false)
            })
    }
    render() {
        const LoginSchema = Yup.object().shape({
            username: Yup.string().required("Username is required!"),
            password: Yup.string().required("Password is required!"),
            server: Yup.string()
        });
        return (
            <Box id="login-form" w={{ md: "30%", sm: "100%"}} bg="white" borderWidth="1px" rounded="lg" p={5} textAlign="center">
                <Text color="teal.500" mb={3} fontWeight="bold">If you forgot password, ask Admin</Text>
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={this.handleSubmit}
                >{({handleSubmit, errors, touched, status, isSubmitting, handleChange}) => (
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            <FormControl isInvalid={errors.username !== undefined && touched.username}>
                                <InputGroup>
                                    <InputLeftElement color="gray.300" fontSize="1.2em" children={<i className="fas fa-user"></i>} />
                                    <Input isDisabled={isSubmitting} type="phone" name="username" onChange={handleChange} placeholder="Insert username" />
                                </InputGroup>
                                <FormErrorMessage>{errors.username}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.password !== undefined && touched.username}>
                                <InputGroup>
                                    <InputLeftElement color="gray.300" fontSize="1.2em" children={<i className="fas fa-lock"></i>} />
                                    <Input isDisabled={isSubmitting} placeholder="Insert password" type="password" name="password" onChange={handleChange} />
                                </InputGroup>
                                <FormErrorMessage>{errors.password}</FormErrorMessage>
                            </FormControl>
                            <Button type="submit" isLoading={isSubmitting} variantColor="teal">Login</Button>
                        </Stack>
                    </form>
                )}
                </Formik>
            </Box>
        )
    }
}
export default withRouter(Login)