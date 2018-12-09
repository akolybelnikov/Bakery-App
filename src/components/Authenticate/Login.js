import React from 'react'

import {Form, Text} from 'informed'
import {
    Field,
    Label,
    Control,
    Button,
    Card,
    CardContent,
    Icon
} from 'bloomer'

const Login = props => {
    const {handleSignIn, onFormChange, onAttributeToggle, attribute, busy} = props
    return (
        <Form onChange={formState => onFormChange(formState.values)}>
            <Card>
                {!busy
                    ? <CardContent>
                            <Field>
                                <Label htmlFor="state-email">Адрес эл. почты</Label>
                                <Control>
                                    <Text field="email" id="state-email" placeholder='email' className="input"/>
                                </Control>
                            </Field>
                            <Field>
                                <Label htmlFor="state-password">Пароль</Label>
                                <Control className="has-icons-right">
                                    <Text
                                        type={attribute}
                                        field="password"
                                        id="state-password"
                                        placeholder='password'
                                        className="input"/>
                                    <span onClick={onAttributeToggle} className="icon has-text-primary is-right">
                                        <i
                                            className="fas fa-eye"
                                            style={{
                                            pointerEvents: 'all',
                                            cursor: 'pointer'
                                        }}></i>
                                    </span>
                                </Control>
                            </Field>
                            <Field>
                                <Button isColor="primary" isOutlined isFullWidth onClick={handleSignIn}>Войти</Button>
                            </Field>
                        </CardContent>
                    : <div><Icon className="fas fa-spinner fa-pulse" isSize="large"/></div>}
            </Card>
        </Form>
    )
}

export default Login