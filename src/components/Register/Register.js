import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }
    onNameChange = (event) => {
        this.setState({ name: event.target.value });
    }
    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }
    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    onSubmitSignIn = () => {
        if(this.state.name.length < 4){
            return alert('nome é um campo obrigatório, com no mínimo 4 caracters');
        }
        if (this.state.email.indexOf('@') < 1 || this.state.email.indexOf('.com') < 3) {
            return alert('email é um campo obrigatório e está invalido');
        }
        if(this.state.password.length >= 4){
        fetch('https://young-brook-76506.herokuapp.com/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home');
                }
            })
        }else{
            return alert('senha é um campo obrigatório, com no mínimo 4 caracters');
        }
    }

    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Criar Conta</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="Name">Nome</label>
                                <input
                                    onChange={this.onNameChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="name"
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    onChange={this.onEmailChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Senha</label>
                                <input
                                    onChange={this.onPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Criar" />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;